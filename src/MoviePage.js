import React from "react";
import "./App.css";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import { Paper, InputBase, Divider, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TheatersIcon from "@material-ui/icons/Theaters";

import { makeStyles } from "@material-ui/core/styles";

const classes = (theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
});

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReady: false,
      searchBarValue: "",
      searchResult: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {}
  handleChange(event) {
    console.log(event.target.value);
    this.setState({ searchBarValue: event.target.value });
  }
  handleKeyDown(event) {
    if (event.key === "Enter") {
      console.log("search");
      window.location.href = "/search?" + this.state.searchBarValue;
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default MoviePage;
