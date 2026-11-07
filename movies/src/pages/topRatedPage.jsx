import { useQuery, keepPreviousData } from '@tanstack/react-query';
import PageTemplate from "../components/templateMovieListPage";
import PaginationBar from "../components/paginationBar";
import usePageParam from "../hooks/usePageParam";
import { getTopRated } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TopRatedPage = () => {
  const [page, setPage] = usePageParam();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['top_rated', { page }],
    queryFn: getTopRated,
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <>
      <PageTemplate
        title='Top Rated Movies'
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
      <PaginationBar page={page} totalPages={data.total_pages} onChange={setPage} />
    </>
  );
};
export default TopRatedPage;
