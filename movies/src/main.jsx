import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import HomePage from "./pages/homePage";
import UpcomingPage from "./pages/upcomingPage";
import NowPlayingPage from "./pages/nowPlayingMoviePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SiteHeader/>
          <MoviesContextProvider>
            <Routes>
              <Route path="/movies/favorites" element={<FavoriteMoviesPage/>}/>
              <Route path="/movies/upcoming" element={<UpcomingPage/>}/>
              <Route path="/movies/now_playing" element={<NowPlayingPage/>}/>
              <Route path="/movies/:id" element={<MoviePage/>}/>
              <Route path="/reviews/:id" element={ <MovieReviewPage /> }/>
              <Route path="/" element={<HomePage/>}/>
              <Route path="*" element={<Navigate to="/"/>}/>
              <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
