import React from "react";
import "./App.css";
import Main from "./Main";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact component={Main} />
      </BrowserRouter>
    );
  }
}

export default App;
