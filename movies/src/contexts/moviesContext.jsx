import React, { useState, useEffect } from "react";

export const MoviesContext = React.createContext(null);

const usePersistentState = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch {
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
    }
  }, [key, value]);

  return [value, setValue];
};

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = usePersistentState("favorites", [])
  const [myReviews, setMyReviews] = useState( {} )
  const [playlists, setPlaylists] = usePersistentState("playlists", () => {
    try {
      const old = JSON.parse(localStorage.getItem("playlist"));
      if (Array.isArray(old)) return { "My Playlist": old };
    } catch {
    }
    return { "My Playlist": [] };
  })

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const createPlaylist = (name) => {
    const trimmed = name.trim();
    if (!trimmed || playlists[trimmed]) return false;
    setPlaylists({ ...playlists, [trimmed]: [] });
    return true;
  };

  const deletePlaylist = (name) => {
    const { [name]: removed, ...rest } = playlists;
    setPlaylists(rest);
  };

  const addToPlaylist = (name, movie) => {
    const ids = playlists[name] || [];
    if (ids.includes(movie.id)) return;
    setPlaylists({ ...playlists, [name]: [...ids, movie.id] });
  };

  const removeFromPlaylist = (name, movie) => {
    setPlaylists({
      ...playlists,
      [name]: (playlists[name] || []).filter((mId) => mId !== movie.id),
    });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        playlists,
        createPlaylist,
        deletePlaylist,
        addToPlaylist,
        removeFromPlaylist
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
