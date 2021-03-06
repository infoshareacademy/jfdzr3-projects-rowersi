import React, { useContext, useEffect, useState } from "react";
import UserSessionContext from "../context/userSession-context";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Box, Typography } from "@material-ui/core";

const RatingElement = (props) => {
  const [votesAverage, setVotesAverage] = useState(5);
  const [isVoted, setIsVoted] = useState(true);
  const [isCurrentVote, setIsCurrentVote] = useState(false);
  const ctx = useContext(UserSessionContext);
  useEffect(() => {
    if (!props.routeData.votesAverage) return;
    setVotesAverage(+props.routeData.votesAverage); // + represents changing of string to number
  }, [props.routeData.votesAverage]);

  useEffect(() => {
    if (isCurrentVote) return;
    if (props.routeData.isDataLoaded) setIsVoted(false);
    if (props.routeData.votes) {
      const isUserMatch = props.routeData.votes.find(
        (object) => object.user === ctx.userUid
      );
      if (isUserMatch) {
        setIsVoted(true);
      } else {
        setIsVoted(false);
      }
    }
  }, [
    props.routeData.votes,
    isVoted,
    ctx.userUid,
    isCurrentVote,
    props.routeData.isDataLoaded,
  ]);

  return (
    <Box
      component="fieldset"
      borderColor="transparent"
      style={{ padding: "2px" }}
    >
      <Typography variant="body2" component="legend">
        Rate this route
      </Typography>
      <Rating
        name="customized-empty"
        value={votesAverage}
        precision={0.1}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
        size="large"
        onChange={(event, newValue) => {
          setIsVoted(true);
          setIsCurrentVote(true);
          props.setRateValue(newValue);
        }}
        readOnly={isVoted}
      />
    </Box>
  );
};

export default RatingElement;
