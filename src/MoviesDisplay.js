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
} from "@material-ui/core";

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
});

class MoviesDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReady: false,
      searchBarValue: "",
      listOfMovies: [],
    };
    this.handleLearnMoreClick = this.handleLearnMoreClick.bind(this);
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

  handleLearnMoreClick(id) {
    console.log(id);
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
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                {listOfMovies.map(
                  ({ title, id, image, runningTimeInMinutes, principals }) => (
                    <Grid item={true} xs={12} sm={4} key={id}>
                      <Card className={classes.root}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            style={{ height: "525px" }}
                            component="img"
                            src={image.url}
                            title="Contemplative Reptile"
                          />
                          <CardContent>
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
                              {principals[0].characters.join("/")} and{" "}
                              {principals[1].name} as{" "}
                              {principals[1].characters.join("/")}
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
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => this.handleLearnMoreClick(id)}
                          >
                            Learn More
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
          )}
        </header>
      </div>
    );
  }
}

export default MoviesDisplay;