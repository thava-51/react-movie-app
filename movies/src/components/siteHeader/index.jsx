import { useState, useEffect, useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "../../contexts/colorModeContext";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../../images/Project Logo.png";
import useDebounce from "../../hooks/useDebounce";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { useNavigate, useLocation, Link } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const movieCategories = [
  { label: "Discover", path: "/" },
  { label: "Now Playing", path: "/movies/now_playing" },
  { label: "Top Rated", path: "/movies/top_rated" },
  { label: "Upcoming", path: "/movies/upcoming" },
  { label: "Trending", path: "/movies/trending" },
];

const mainLinks = [
  { label: "People", path: "/people" },
  { label: "Favourites", path: "/movies/favorites" },
  { label: "Playlist", path: "/movies/playlist" },
];

const navButtonSx = { textTransform: "none", fontWeight: 700, fontSize: "1rem" };

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [moviesAnchor, setMoviesAnchor] = useState(null);

  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const location = useLocation();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedText = useDebounce(searchText, 500);

  useEffect(() => {
    const q = debouncedText.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`, {
      replace: location.pathname === "/search",
    });
  }, [debouncedText]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchText.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchText("");
  };

  const go = (path) => {
    setAnchorEl(null);
    setMoviesAnchor(null);
    navigate(path);
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/" aria-label="Go to home page" style={{ display: "inline-block" }}>
              <Box
                component="img"
                src={logo}
                alt="Project logo"
                sx={{ height: 44, display: "block", ml: 3 }}
              />
            </Link>
          </Box>
          {searchOpen ? (
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 1,
                pl: 1,
                mr: 1,
              }}
            >
              <SearchIcon />
              <InputBase
                autoFocus
                placeholder="Search movies & people…"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                inputProps={{ "aria-label": "search" }}
                sx={{ color: "inherit", ml: 1, width: { xs: 140, md: 240 } }}
              />
              <IconButton aria-label="close search" color="inherit" size="small" onClick={closeSearch}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <IconButton aria-label="open search" color="inherit" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </IconButton>
          )}

          <IconButton
            aria-label={mode === "dark" ? "switch to light mode" : "switch to dark mode"}
            color="inherit"
            onClick={toggleColorMode}
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                {movieCategories.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => go(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
                <Divider />
                {mainLinks.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => go(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                aria-controls="movies-menu"
                aria-haspopup="true"
                sx={navButtonSx}
                endIcon={<ArrowDropDownIcon />}
                onClick={(e) => setMoviesAnchor(e.currentTarget)}
              >
                Movies
              </Button>
              <Menu
                id="movies-menu"
                anchorEl={moviesAnchor}
                open={Boolean(moviesAnchor)}
                onClose={() => setMoviesAnchor(null)}
              >
                {movieCategories.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => go(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
              {mainLinks.map((opt) => (
                <Button key={opt.label} color="inherit" sx={navButtonSx} onClick={() => go(opt.path)}>
                  {opt.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
