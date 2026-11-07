import { useQuery } from '@tanstack/react-query';
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const HomePage = (props) => {
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover'],
    queryFn: () => getMovies(5),
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

return (
    <PageTemplate
      title='Discover Movies'
      hideHeader
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie}/>
      }}
    />
  );
};
export default HomePage;
