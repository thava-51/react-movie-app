import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function MovieListPageTemplate({
  movies,
  title,
  action,
  hideHeader = false,
  showFilters = true,
}) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [sortDir, setSortDir] = useState("desc");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return yearFilter ? (m.release_date || "").startsWith(yearFilter) : true;
    })
    .filter((m) => {
      return m.vote_average >= ratingFilter;
    })
    .filter((m) => {
      return languageFilter === "all" ? true : m.original_language === languageFilter;
    });

  if (sortBy !== "default") {
    const direction = sortDir === "asc" ? 1 : -1;
    displayedMovies.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title) * direction;
      if (sortBy === "release_date") {
        return (a.release_date || "").localeCompare(b.release_date || "") * direction;
      }
      return ((a[sortBy] || 0) - (b[sortBy] || 0)) * direction; // popularity, vote_average
    });
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "language") setLanguageFilter(value);
    else if (type === "sortBy") setSortBy(value);
    else if (type === "sortDir") setSortDir(value);
  };

  return (
    <Grid container>
      {!hideHeader && (
        <Grid size={12}>
          <Header title={title} />
        </Grid>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {showFilters && (
          <Box
            sx={{
              width: { xs: "100%", md: 280 },
              flexShrink: 0,
              padding: 2,
              position: { md: "sticky" },
              top: { md: 16 },
            }}
          >
            <FilterCard
              onUserInput={handleChange}
              titleFilter={nameFilter}
              genreFilter={genreFilter}
              yearFilter={yearFilter}
              ratingFilter={ratingFilter}
              languageFilter={languageFilter}
              sortBy={sortBy}
              sortDir={sortDir}
            />
          </Box>
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <MovieList
            action={action}
            movies={displayedMovies}
            compact={showFilters}
          ></MovieList>
        </Box>
      </Box>
    </Grid>
  );
}
export default MovieListPageTemplate;
