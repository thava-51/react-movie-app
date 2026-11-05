import { useQuery } from '@tanstack/react-query';
import PageTemplate from "../components/templateMovieListPage";
import { getNowPlaying } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const NowPlayingPage = () => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['now_playing'],
    queryFn: getNowPlaying,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title='Movies Now Playing'
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};
export default NowPlayingPage;
