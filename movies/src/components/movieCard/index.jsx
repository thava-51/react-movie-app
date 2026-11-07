import { Link } from "react-router";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

import img from '../../images/film-poster-placeholder.png'

export default function MovieCard({movie, action}) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3 }}>
      <CardHeader
        sx={{ padding: 1 }}
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red', width: 28, height: 28 }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontSize: "0.9rem",
              fontWeight: 600,
              lineHeight: 1.3,
              minHeight: "2.34rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        sx={{ aspectRatio: "2 / 3", width: "100%" }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={{ flexGrow: 1, padding: 1, "&:last-child": { paddingBottom: 1 } }}>
        <Typography variant="caption" component="p" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <CalendarIcon sx={{ fontSize: 14 }} />
          {movie.release_date}
        </Typography>
        <Typography variant="caption" component="p" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <StarRateIcon sx={{ fontSize: 16 }} />
          {movie.vote_average?.toFixed(1)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: 1, paddingTop: 0, flexWrap: "wrap" }}>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="small" color="primary" sx={{ fontSize: "0.7rem", textTransform: "none" }}>
            More info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
