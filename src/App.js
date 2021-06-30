import React from "react";
import MapRouting from "./components/MapRouting/MapRouting";

import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "./user-profile/profile.jsx";
import CreateRouteForm from "./components/Route/CreateRouteForm";

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
          <main>
            <CreateRouteForm />
          </main>
        </div>
        <MapRouting isInteractive={true} isInput={true} />
      </Router>
    </React.Fragment>
  );
}

export default App;
