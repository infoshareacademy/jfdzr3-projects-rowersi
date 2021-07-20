import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { Avatar, Paper, Typography, Box } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { useParams } from "react-router-dom";

import classes from "./RouteData.module.css";
import style from "./directions-styles";

const RouteData = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(19.52);
  const [lat, setLat] = useState(50.1);
  const [zoom, setZoom] = useState(11);
  const [routeData, setRouteData] = useState({});
  const { routeId } = useParams();

  const directions = new Directions({
    accessToken: mapboxgl.accessToken,
    profile: "mapbox/cycling",
    unit: "metric",
    styles: style,
    interactive: false,
    alternatives: false,
    language: "pl",
    congestion: true,
    steps: true,
    controls: {
      inputs: false,
      instructions: false,
      profileSwitcher: true,
    },
    zoom: 10,
  });

  const nav = new mapboxgl.NavigationControl();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-left");
    map.current.addControl(nav, "bottom-left");
    map.current.addControl(directions, "top-left");
    map.current.once("idle", () => {
      firebase
        .firestore()
        .collection("routes")
        .doc(`${routeId}`)
        .get()
        .then((response) => {
          const routeData = response.data();
          const seconds = routeData.duration;
          const time = new Date(seconds * 1000).toISOString().substr(11, 8);
          const distanceInKm = (routeData.distance / 1000).toFixed(3);
          setRouteData((previousState)=>{
            return {
              ...previousState,
              ...routeData,
              duration: time,
              distance: distanceInKm,
            };
          });
          directions.setOrigin(routeData.origin);
          directions.setDestination(routeData.destination);
           const bbox = [routeData.origin, routeData.destination];
           map.current.fitBounds(bbox, {
             padding: 100,
           });
        })
    });
  });

  console.log(routeData)

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexchild1}>
        <header className={classes.header}>
          <div>
            <Avatar
              alt="Remy Sharp"
              src="https://picsum.photos/150/150"
              style={{ height: "100px", width: "100px" }}
            />
            <div>
              <h2>Stefek Stafański</h2>
            </div>
          </div>
          <div className={classes.routeData}>
            <div>
              <h1>{routeData.routeTitle}</h1>
            </div>
            <div className={classes.routeNumberDataContainer}>
              <Paper>
                <Typography variant="h6" style={{ padding: "20px" }}>
                  Distance: {routeData.distance}KM
                </Typography>
              </Paper>
              <Paper>
                <Typography variant="h6" style={{ padding: "20px" }}>
                  Time: {routeData.duration}
                </Typography>
              </Paper>
              <Paper>
                <Typography variant="h6" style={{ padding: "20px" }}>
                  Dest. elevation: {routeData.destinationElevation}m
                </Typography>
              </Paper>
            </div>
          </div>
        </header>
        <div className={classes.routeDescriptionContainer}>
          <Paper>
            <Typography variant="body1" style={{ padding: "20px" }}>
              Route description: {routeData.routeDescription}
            </Typography>
          </Paper>
        </div>
        <div className={classes.rateRouteContainer}>
          <div>
            <Typography variant="h3" style={{ padding: "20px" }}>
              4.6
            </Typography>
          </div>
          <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Custom empty icon</Typography>
              <Rating
                name="customized-empty"
                defaultValue={2}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                size="large"
              />
            </Box>
          </div>
        </div>
      </div>
      <div className={classes.flexchild2}>
        <div ref={mapContainer} className={classes.mapContainer} />
      </div>
    </div>
  );
};

export default RouteData;
