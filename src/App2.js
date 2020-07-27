import React from "react";
import logo from "./logo.svg";
import "./App.css";
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

class App extends React.Component {
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
  }
  handleKeyDown(event) {
    if (event.key === "Enter") {
      console.log("search");
      window.location.href = "/path";
      // fetch("https://imdb8.p.rapidapi.com/title/find?q=avengers", {
      //   method: "GET",
      //   headers: {
      //     "x-rapidapi-host": "imdb8.p.rapidapi.com",
      //     "x-rapidapi-key":
      //       "a5bbbde1eemsh008b1bc05139f67p1da3f8jsn404465dbd05a",
      //   },
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}

          <Paper component="div" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="theatre">
              <TheatersIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search Google Maps"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
          </Paper>
        </header>
      </div>
    );
  }
}

export default App;
