import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Spinner from "../spinner";
import img from "../../images/film-poster-placeholder.png";

const MAX_MOVIES = 20;

const MovieRow = ({ title, queryName, queryFn, movieId }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: [queryName, { id: movieId }],
    queryFn: queryFn,
  });

  if (isPending) {
    return <Spinner inline />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results.slice(0, MAX_MOVIES);

  if (movies.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ margin: "20px 0 10px" }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", paddingBottom: 2 }}>
        {movies.map((movie) => (
          <Card key={movie.id} sx={{ minWidth: 140, maxWidth: 140, flexShrink: 0 }}>
            <CardActionArea component={Link} to={`/movies/${movie.id}`}>
              <CardMedia
                sx={{ height: 210 }}
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
                    : img
                }
                title={movie.title}
              />
              <CardContent sx={{ padding: 1 }}>
                <Typography variant="subtitle2" component="p">
                  {movie.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" component="p">
                  {movie.release_date ? movie.release_date.slice(0, 4) : "TBA"}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default MovieRow;
