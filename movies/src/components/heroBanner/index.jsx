import { useRef } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getTrending } from "../../api/tmdb-api";

const TEAL = "30, 90, 90";

const HeroBanner = () => {
  const { data } = useQuery({
    queryKey: ["trending", { window: "week" }],
    queryFn: getTrending,
  });

  const picked = useRef(null);
  if (!picked.current && data) {
    const withBackdrop = data.results.filter((m) => m.backdrop_path);
    if (withBackdrop.length > 0) {
      picked.current = withBackdrop[Math.floor(Math.random() * withBackdrop.length)];
    }
  }
  const movie = picked.current;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: 220, md: 320 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        px: { xs: 3, md: 8 },
        py: 4,
        color: "#fff",
        backgroundColor: `rgb(${TEAL})`,
        backgroundImage: movie
          ? `linear-gradient(90deg, rgba(${TEAL}, 0.92) 0%, rgba(${TEAL}, 0.55) 60%, rgba(${TEAL}, 0.25) 100%),
             url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h2" component="h1" sx={{ fontWeight: 800, fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
        Welcome.
      </Typography>
      <Typography variant="h5" component="p" sx={{ fontWeight: 600, maxWidth: 800, fontSize: { xs: "1.1rem", md: "1.5rem" } }}>
        Thousands of movies and the people behind them, waiting to be discovered.
        Browse what's trending, follow an actor's career, and build your own playlists.
      </Typography>

      {movie && (
        <Typography
          variant="caption"
          sx={{ position: "absolute", right: 16, bottom: 8, opacity: 0.9 }}
        >
          Featured:{" "}
          <Link to={`/movies/${movie.id}`} style={{ color: "inherit", fontWeight: 700 }}>
            {movie.title}
          </Link>
        </Typography>
      )}
    </Box>
  );
};

export default HeroBanner;
