import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import img from "../../images/film-poster-placeholder.png";

const MAX_CAST = 20;

const MovieCast = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast.slice(0, MAX_CAST);

  if (cast.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ margin: "20px 0 10px" }}>
        Cast
      </Typography>
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", paddingBottom: 2 }}>
        {cast.map((person) => (
          <Card key={person.id} sx={{ minWidth: 140, maxWidth: 140, flexShrink: 0 }}>
            <CardActionArea component={Link} to={`/person/${person.id}`}>
              <CardMedia
                sx={{ height: 210 }}
                image={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
                    : img
                }
                title={person.name}
              />
              <CardContent sx={{ padding: 1 }}>
                <Typography variant="subtitle2" component="p">
                  {person.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" component="p">
                  {person.character}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default MovieCast;
