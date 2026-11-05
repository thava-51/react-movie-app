import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSearchParams } from "react-router";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PageTemplate from "../components/templateMovieListPage";
import { getTrending } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TrendingPage = () => {
  // The chosen time window lives in the URL (?window=week), so it survives
  // a refresh and can be shared. Anything other than "week" means "day".
  const [searchParams, setSearchParams] = useSearchParams();
  const timeWindow = searchParams.get("window") === "week" ? "week" : "day";

  // The window is part of the query key, so "day" and "week" are cached
  // separately. keepPreviousData keeps the old list on screen while the
  // new one loads, so the page doesn't flash the spinner when toggling.
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['trending', { window: timeWindow }],
    queryFn: getTrending,
    placeholderData: keepPreviousData,
  });

  // MUI sends null when the already-selected button is clicked again; ignore it.
  const handleWindowChange = (event, newWindow) => {
    if (newWindow !== null) {
      setSearchParams({ window: newWindow });
    }
  };

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "20px 20px 0" }}>
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={timeWindow}
          onChange={handleWindowChange}
          aria-label="trending time window"
        >
          <ToggleButton value="day">Today</ToggleButton>
          <ToggleButton value="week">This week</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <PageTemplate
        title='Trending Movies'
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
    </>
  );
};
export default TrendingPage;
