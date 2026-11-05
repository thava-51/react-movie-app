const BASE_URL = "https://api.themoviedb.org/3";

// Shared request helper used by every TMDB call.
const tmdbFetch = (path, params = {}) => {
  const query = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_KEY,
    ...params,
  });
  return fetch(`${BASE_URL}/${path}?${query}`).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

export const getMovies = () => {
  return tmdbFetch("discover/movie", {
    language: "en-US",
    include_adult: false,
    include_video: false,
    page: 1,
  });
};

export const getUpcomingMovies = () => {
  return tmdbFetch("movie/upcoming", { language: "en-US", page: 1 });
};

// The functions below receive react-query's context object.
export const getMovie = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbFetch(`movie/${id}`);
};

export const getGenres = () => {
  return tmdbFetch("genre/movie/list", { language: "en-US" });
};

export const getMovieImages = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbFetch(`movie/${id}/images`);
};

export const getMovieReviews = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbFetch(`movie/${id}/reviews`);
};

// Additional filters apart from lab
export const getNowPlaying = () => {
  return tmdbFetch("movie/now_playing", { language: "en-US", page: 1 });
};

export const getTopRated = () => {
  return tmdbFetch("movie/top_rated", { language: "en-US", page: 1 });
};

// Trending movies for a time window ("day" or "week").
// The window is the second element of the queryKey, e.g. ["trending", { window: "week" }].
export const getTrending = ({ queryKey }) => {
  const [, { window }] = queryKey;
  return tmdbFetch(`trending/movie/${window}`, { language: "en-US", page: 1 });
};