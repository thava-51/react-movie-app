import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../images/Project Logo.png";
import useDebounce from "../../hooks/useDebounce";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate, useLocation } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();
  const location = useLocation();

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

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Now Playing", path: "/movies/now_playing" },
    { label: "Top Rated", path: "/movies/top_rated" },
    { label: "Trending", path: "/movies/trending" },
    { label: "Playlist", path: "/movies/playlist" }
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="Project logo - back to home"
              onClick={() => navigate("/")}
              sx={{ height: 44, display: "block", cursor: "pointer" }}
            />
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }}>
            All you ever wanted to know about Movies!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
              px: 1,
              mr: 2,
            }}
          >
            <SearchIcon />
            <InputBase
              placeholder="Search movies & people…"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "inherit", ml: 1, width: { xs: 120, md: 220 } }}
            />
          </Box>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
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
