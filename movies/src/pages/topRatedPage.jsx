import { useQuery } from '@tanstack/react-query';
import PageTemplate from "../components/templateMovieListPage";
import { getTopRated } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TopRatedPage = () => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['top_rated'],
    queryFn: getTopRated,
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
      title='Top Rated Movies'
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};
export default TopRatedPage;
