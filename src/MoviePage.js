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
  Divider,
  Box,
} from "@material-ui/core";

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
                        Rating: {movieData.Rated}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        Runtime: {movieData.Runtime}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {movieData.Genre}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {movieData.Released}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {movieData.Plot}
                      </Typography>
                      <Divider />
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        Director: {movieData.Director}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        Writers: {movieData.Writer}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        Starring: {movieData.Actors}
                      </Typography>
                      <br />
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        Box Office: {movieData.BoxOffice}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        Awards: {movieData.Awards}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        Metascore:
                      </Typography>
                      <Box position="relative" display="inline-flex">
                        <CircularProgress
                          variant="static"
                          value={movieData.Metascore}
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="caption"
                            component="div"
                            color="textSecondary"
                          >{`${Math.round(movieData.Metascore)}%`}</Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        IMDb Rating:
                      </Typography>
                      <Box position="relative" display="inline-flex">
                        <CircularProgress
                          variant="static"
                          value={movieData.imdbRating * 10}
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="caption"
                            component="div"
                            color="textSecondary"
                          >{`${Math.round(
                            movieData.imdbRating * 10
                          )}%`}</Typography>
                        </Box>
                      </Box>
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
