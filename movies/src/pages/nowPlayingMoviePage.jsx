import { useQuery, keepPreviousData } from '@tanstack/react-query';
import PageTemplate from "../components/templateMovieListPage";
import PaginationBar from "../components/paginationBar";
import usePageParam from "../hooks/usePageParam";
import { getNowPlaying } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const NowPlayingPage = () => {
  const [page, setPage] = usePageParam();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['now_playing', { page }],
    queryFn: getNowPlaying,
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
        title='Movies Now Playing'
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
      <PaginationBar page={page} totalPages={data.total_pages} onChange={setPage} />
    </>
  );
};
export default NowPlayingPage;
