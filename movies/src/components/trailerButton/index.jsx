import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import { getMovieVideos } from "../../api/tmdb-api";

const pickTrailer = (videos) => {
  const youtube = videos.filter((v) => v.site === "YouTube");
  return (
    youtube.find((v) => v.type === "Trailer" && v.official) ||
    youtube.find((v) => v.type === "Trailer") ||
    youtube.find((v) => v.type === "Teaser") ||
    null
  );
};

const TrailerButton = ({ movie }) => {
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["videos", { id: movie.id }],
    queryFn: getMovieVideos,
  });

  const trailer = data ? pickTrailer(data.results) : null;

  // No trailer (or still loading): show nothing rather than a dead button.
  if (!trailer) {
    return null;
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<PlayArrowIcon />}
        onClick={() => setOpen(true)}
        sx={{ textTransform: "none", fontWeight: 700, my: 2 }}
      >
        Watch trailer
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pr: 7 }}>
          {movie.title}: {trailer.name}
          <IconButton
            aria-label="close trailer"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {/* 16:9 box. The iframe only exists while the dialog is open, so closing it stops the video. */}
          <Box sx={{ position: "relative", paddingTop: "56.25%", backgroundColor: "#000" }}>
            <Box
              component="iframe"
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0`}
              title={trailer.name}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrailerButton;
