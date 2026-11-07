import { useContext, useState } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";

const AddToPlaylistIcon = ({ movie }) => {
  const { playlists, addToPlaylist, createPlaylist } = useContext(MoviesContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  const handleOpenMenu = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleSelect = (name) => {
    addToPlaylist(name, movie);
    setAnchorEl(null);
  };

  const handleCreate = () => {
    const name = newName.trim();
    if (!createPlaylist(name)) {
      setError(name ? "A playlist with that name already exists" : "Enter a name");
      return;
    }
    addToPlaylist(name, movie);
    setDialogOpen(false);
    setNewName("");
    setError("");
  };

  return (
    <>
      <IconButton aria-label="add to playlist" onClick={handleOpenMenu}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {Object.keys(playlists).map((name) => {
          const inList = playlists[name].includes(movie.id);
          return (
            <MenuItem key={name} onClick={() => handleSelect(name)} disabled={inList}>
              <ListItemIcon>{inList ? <CheckIcon fontSize="small" /> : null}</ListItemIcon>
              {name}
            </MenuItem>
          );
        })}
        <Divider />
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setDialogOpen(true);
          }}
        >
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          New playlist...
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>New playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Playlist name"
            value={newName}
            error={Boolean(error)}
            helperText={error}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>
            Create and add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToPlaylistIcon;
