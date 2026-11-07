import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

const PlaylistMoviesPage = () => {
  const {playlist: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const playlistMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = playlistMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = playlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  return (
    <PageTemplate
      title="Playlist"
      movies={movies}
      action={(movie) => {
        return (
          <>
          <RemoveFromPlaylistIcon movie={movie}/>
          </>
        );
      }}
    />
  );
};

export default PlaylistMoviesPage;
