import { Link, useSearchParams } from "react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { searchMulti } from "../api/tmdb-api";
import img from "../images/film-poster-placeholder.png";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["search", { query }],
    queryFn: searchMulti,
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });

  if (!query) {
    return (
      <Typography sx={{ p: 3 }}>
        Type in the search box above to find movies and people.
      </Typography>
    );
  }

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results.filter((r) => r.media_type === "movie");
  const people = data.results.filter((r) => r.media_type === "person");

  return (
    <>
      {movies.length > 0 ? (
        <PageTemplate
          title={`Movies matching "${query}"`}
          movies={movies}
          action={(movie) => <AddToFavoritesIcon movie={movie} />}
        />
      ) : (
        <Typography variant="h5" sx={{ p: 3 }}>
          No movies found for "{query}"
        </Typography>
      )}

      {people.length > 0 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            People matching "{query}"
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {people.map((person) => (
              <Card key={person.id} sx={{ width: 140 }}>
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
                      {person.known_for_department}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default SearchPage;
