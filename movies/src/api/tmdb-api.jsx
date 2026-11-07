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

export const PAGE_SIZE = 24;
const TMDB_PAGE_SIZE = 20;
const TMDB_MAX_PAGES = 500; // TMDB rejects any page above this

const getPagedList = (path, params, page) => {
  const start = (page - 1) * PAGE_SIZE;
  const firstTmdbPage = Math.floor(start / TMDB_PAGE_SIZE) + 1;
  const lastTmdbPage = Math.min(Math.ceil((start + PAGE_SIZE) / TMDB_PAGE_SIZE), TMDB_MAX_PAGES);

  const requests = [];
  for (let p = firstTmdbPage; p <= lastTmdbPage; p++) {
    requests.push(tmdbFetch(path, { ...params, page: p }));
  }

  return Promise.all(requests).then((responses) => {
    const offset = start - (firstTmdbPage - 1) * TMDB_PAGE_SIZE;
    const results = responses.flatMap((r) => r.results).slice(offset, offset + PAGE_SIZE);
    const unique = [...new Map(results.map((m) => [m.id, m])).values()];
    const totalResults = Math.min(responses[0].total_results, TMDB_MAX_PAGES * TMDB_PAGE_SIZE);
    return {
      results: unique,
      total_pages: Math.ceil(totalResults / PAGE_SIZE),
    };
  });
};

export const getMovies = ({ queryKey }) => {
  const [, { page }] = queryKey;
  return getPagedList(
    "discover/movie",
    { language: "en-US", include_adult: false, include_video: false },
    page
  );
};

export const getUpcomingMovies = ({ queryKey }) => {
  const [, { page }] = queryKey;
  return getPagedList("movie/upcoming", { language: "en-US" }, page);
};

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

export const getMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbFetch(`movie/${id}/credits`, { language: "en-US" });
};

// Additional filters apart from lab
export const getNowPlaying = ({ queryKey }) => {
  const [, { page }] = queryKey;
  return getPagedList("movie/now_playing", { language: "en-US" }, page);
};

export const getTopRated = ({ queryKey }) => {
  const [, { page }] = queryKey;
  return getPagedList("movie/top_rated", { language: "en-US" }, page);
};

export const getTrending = ({ queryKey }) => {
  const [, { window, page = 1 }] = queryKey;
  return getPagedList(`trending/movie/${window}`, { language: "en-US" }, page);
};

export const getPerson = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbFetch(`person/${id}`, { language: "en-US" });
};

export const getMoviefromPerson = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbFetch(`person/${id}/movie_credits`, { language: "en-US" });
};

export const getRecommendations = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbFetch(`movie/${id}/recommendations`, { language: "en-US" });
};

export const getMovieVideos = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbFetch(`movie/${id}/videos`, { language: "en-US" });
};

export const getPopularPeople = ({ queryKey }) => {
  const [, { page }] = queryKey;
  return tmdbFetch("person/popular", { language: "en-US", page });
};

export const searchMulti = ({ queryKey }) => {
  const [, { query, page }] = queryKey;
  return tmdbFetch("search/multi", {
    language: "en-US",
    include_adult: false,
    query,
    page,
  });
};

export const getSimilar =({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbFetch(`movie/${id}/similar`, { language: "en-US" });
};