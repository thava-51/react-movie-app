import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSearchParams } from "react-router";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import HeroBanner from "../components/heroBanner";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'


const MAX_PAGES = 500;

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = parseInt(searchParams.get("page"), 10);
  const page = Number.isInteger(requested) && requested >= 1 && requested <= MAX_PAGES ? requested : 1;

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover', { page }],
    queryFn: getMovies,
    placeholderData: keepPreviousData,
  })

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;
  const totalPages = Math.min(data.total_pages, MAX_PAGES);

  return (
    <>
      <HeroBanner />
      <PageTemplate
        title='Discover Movies'
        hideHeader
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie}/>
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          siblingCount={2}
        />
      </Box>
    </>
  );
};
export default HomePage;
