import { useQuery, keepPreviousData } from '@tanstack/react-query';
import HeroBanner from "../components/heroBanner";
import PageTemplate from "../components/templateMovieListPage";
import PaginationBar from "../components/paginationBar";
import usePageParam from "../hooks/usePageParam";
import { getMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const HomePage = () => {
  const [page, setPage] = usePageParam();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover', { page }],
    queryFn: getMovies,
    placeholderData: keepPreviousData,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;

  return (
    <>
      <HeroBanner />
      <PageTemplate
        title='Discover Movies'
        hideHeader
        showFilters={false}
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie}/>
        }}
      />
      <PaginationBar page={page} totalPages={data.total_pages} onChange={setPage} />
    </>
  );
};
export default HomePage;
