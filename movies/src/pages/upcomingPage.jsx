import { useQuery, keepPreviousData } from '@tanstack/react-query';
import PageTemplate from "../components/templateMovieListPage";
import PaginationBar from "../components/paginationBar";
import usePageParam from "../hooks/usePageParam";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';

const UpcomingPage = () => {
  const [page, setPage] = usePageParam();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['upcoming', { page }],
    queryFn: getUpcomingMovies,
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
        title='Upcoming Movies'
        movies={movies}
        action={(movie) => {
          return <AddToPlaylistIcon movie={movie} />;
        }}
      />
      <PaginationBar page={page} totalPages={data.total_pages} onChange={setPage} />
    </>
  );
};
export default UpcomingPage;
