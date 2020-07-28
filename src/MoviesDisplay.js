import React from "react";
import "./App.css";
import {
  CircularProgress,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Fab,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const classes = (theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: "#1a90ff",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

class MoviesDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReady: false,
      searchBarValue: "",
      listOfMovies: [],
    };
  }

  componentDidMount() {
    console.log(window.location.href);
    let currUrl = window.location.href;
    let paramQ = currUrl.split("search?")[1];
    fetch("https://imdb8.p.rapidapi.com/title/find?q=" + paramQ, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "a5bbbde1eemsh008b1bc05139f67p1da3f8jsn404465dbd05a",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        let movies = response.results;
        let tempFiltered = movies.filter(
          (movie) => movie.titleType === "movie"
        );
        console.log(tempFiltered);
        this.setState({ listOfMovies: tempFiltered });
      })
      .then((response) => {
        this.setState({ dataReady: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getMovieID(id) {
    let movieId = id.split("title/")[1];
    movieId = movieId.replace("/", "");
    return movieId;
  }

  render() {
    const { listOfMovies } = this.state;
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
            <div>
              <div style={{ float: "left" }}>
                <Fab color="primary" aria-label="Home" className={classes.fab}>
                  <Link to={"/"} className={"movieLink"}>
                    <HomeIcon />
                  </Link>
                </Fab>
              </div>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  {listOfMovies.map(
                    ({
                      title,
                      id,
                      image,
                      runningTimeInMinutes,
                      principals,
                    }) => (
                      <Grid item={true} xs={12} sm={4} key={id}>
                        <Card className={classes.root}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              style={{ height: "525px", cursor: "default" }}
                              component="img"
                              src={image.url}
                              title="Contemplative Reptile"
                            />
                            <CardContent style={{ cursor: "default" }}>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                Starring: {principals[0].name} as{" "}
                                {principals[0].characters.join("/")}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                Runtime: {runningTimeInMinutes} minutes
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary">
                              <Link
                                to={`/movie?` + this.getMovieID(id)}
                                className={"movieLink"}
                              >
                                Learn More
                              </Link>
                            </Button>

                            <Button size="small" color="primary">
                              Share
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    )
                  )}
                </Grid>
              </Grid>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default MoviesDisplay;
