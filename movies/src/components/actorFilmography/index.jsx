import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getMoviefromPerson } from "../../api/tmdb-api";
import Spinner from "../spinner";
import img from "../../images/film-poster-placeholder.png";

const MAX_FILMS = 30;

const ActorFilmography = ({ person }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["personCredits", { id: person.id }],
    queryFn: getMoviefromPerson,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const films = [...data.cast]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, MAX_FILMS);

  if (films.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" component="h2" sx={{ margin: "30px 0 10px" }}>
        Filmography
      </Typography>
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", paddingBottom: 2 }}>
        {films.map((film) => (
          <Card key={film.credit_id} sx={{ minWidth: 140, maxWidth: 140, flexShrink: 0 }}>
            <CardActionArea component={Link} to={`/movies/${film.id}`}>
              <CardMedia
                sx={{ height: 210 }}
                image={
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w185/${film.poster_path}`
                    : img
                }
                title={film.title}
              />
              <CardContent sx={{ padding: 1 }}>
                <Typography variant="subtitle2" component="p">
                  {film.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" component="p">
                  {film.release_date ? film.release_date.slice(0, 4) : "TBA"}
                  {film.character ? ` · ${film.character}` : ""}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default ActorFilmography;
