import Movie from "../movieCard/";
import Box from "@mui/material/Box";

const MovieList = (props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: props.compact ? "repeat(6, 1fr)" : "repeat(8, 1fr)",
        },
        gap: 2,
        padding: 2,
        width: "100%",
      }}
    >
      {props.movies.map((m) => (
        <Movie key={m.id} movie={m} action={props.action} />
      ))}
    </Box>
  );
};

export default MovieList;
