import React from "react";
import "./App.css";
import logo from "./logo.svg";

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  CircularProgress,
  CardActionArea,
  CardActions,
  Button,
} from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const classes = (theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },

  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReady: false,
      movieData: {},
    };
  }

  componentDidMount() {
    console.log(window.location.href);
    let currUrl = window.location.href;
    let paramQ = currUrl.split("movie?")[1];
    fetch(
      "http://www.omdbapi.com/?i=" + paramQ + "&plot=full&apikey=bda8f98d",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({ movieData: response });
      })
      .then((response) => {
        this.setState({ dataReady: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { movieData } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {this.state.dataReady === false ? (
            <div className={classes.root}>
              <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                  circle: classes.circle,
                }}
                size={80}
                thickness={4}
              />
            </div>
          ) : (
            <Card className={classes.root} style={{ width: "100%" }}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  <CardMedia
                    className={classes.cover}
                    component="img"
                    src={movieData.Poster}
                    title={movieData.Title}
                    style={{ width: "25%" }}
                  />
                  <div className={classes.details} style={{ width: "75%" }}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        {movieData.Title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {movieData.Year}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {movieData.Plot} minutes
                      </Typography>
                    </CardContent>
                  </div>
                </Grid>
              </Grid>
            </Card>
          )}
        </header>
      </div>
    );
  }
}

export default MoviePage;
