import { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import PaginationBar from "../components/paginationBar";
import usePageParam from "../hooks/usePageParam";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie, PAGE_SIZE } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const PlaylistMoviesPage = () => {
  const { playlists, createPlaylist, deletePlaylist } = useContext(MoviesContext);
  const names = Object.keys(playlists);
  const [selected, setSelected] = useState(names[0] ?? null);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  const current = playlists[selected] ? selected : names[0] ?? null;
  const allMovieIds = current ? playlists[current] : [];

  // Playlists are stored locally, so paginate in the browser: only the ids on
  // the current page are fetched. Clamp the page in case items were removed.
  const [requestedPage, setPage] = usePageParam();
  const totalPages = Math.max(1, Math.ceil(allMovieIds.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const movieIds = allMovieIds.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const playlistMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });

  const handleCreate = () => {
    if (!createPlaylist(newName)) {
      setError(newName.trim() ? "That name is already used" : "Enter a name");
      return;
    }
    setSelected(newName.trim());
    setNewName("");
    setError("");
  };

  const controls = (
    <Box sx={{ p: 2 }}>
      {current && (
        <Tabs
          value={current}
          onChange={(e, v) => { setSelected(v); setPage(1); }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {names.map((n) => (
            <Tab key={n} label={`${n} (${playlists[n].length})`} value={n} />
          ))}
        </Tabs>
      )}
      <Box sx={{ display: "flex", gap: 1, mt: 2, alignItems: "flex-start" }}>
        <TextField
          size="small"
          label="New playlist name"
          value={newName}
          error={Boolean(error)}
          helperText={error}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <Button variant="contained" onClick={handleCreate}>Create</Button>
        {current && (
          <Button color="error" onClick={() => deletePlaylist(current)}>
            Delete "{current}"
          </Button>
        )}
      </Box>
    </Box>
  );

  if (!current) {
    return (
      <>
        {controls}
        <Typography sx={{ p: 2 }}>No playlists yet. Create one above.</Typography>
      </>
    );
  }

  const isPending = playlistMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <>{controls}<Spinner /></>;
  }

  const movies = playlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  return (
    <>
      {controls}
      <PageTemplate
        title={current}
        movies={movies}
        action={(movie) => <RemoveFromPlaylistIcon movie={movie} playlistName={current} />}
      />
      <PaginationBar page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
};

export default PlaylistMoviesPage;
