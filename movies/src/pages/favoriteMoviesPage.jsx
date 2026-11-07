import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import PaginationBar from "../components/paginationBar";
import usePageParam from "../hooks/usePageParam";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie, PAGE_SIZE } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const {favorites: allMovieIds } = useContext(MoviesContext);

  const [requestedPage, setPage] = usePageParam();
  const totalPages = Math.max(1, Math.ceil(allMovieIds.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const movieIds = allMovieIds.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });
  
  const isPending = favoriteMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={movies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavorites movie={movie} />
              <WriteReview movie={movie} />
            </>
          );
        }}
      />
      <PaginationBar page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
};

export default FavoriteMoviesPage;
