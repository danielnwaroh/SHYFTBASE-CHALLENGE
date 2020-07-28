import React from "react";
import "./App.css";
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TheatersIcon from "@material-ui/icons/Theaters";

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

class Home extends React.Component {
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
          <Typography variant="h1" component="h2" gutterBottom>
            Browse Movies
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Start by entering a movie into the search bar, then hitting enter
          </Typography>
          <Paper component="div" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="theatre">
              <TheatersIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search A Movie"
              inputProps={{ "aria-label": "search a movie" }}
              value={this.state.searchBarValue}
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

export default Home;
