import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route } from "react-router";
import Home from "./Home";
import MoviesDisplay from "./MoviesDisplay";
import MoviePage from "./MoviePage";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={"/"} render={(props) => <Home />} />
          <Route exact path={"/home"} render={(props) => <Home />} />
          <Route exact path={"/search"} render={(props) => <MoviesDisplay />} />
          <Route exact path={"/movie"} render={(props) => <MoviePage />} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default Main;
