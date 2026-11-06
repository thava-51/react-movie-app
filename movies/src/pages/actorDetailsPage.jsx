import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { getPerson } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import ActorFilmography from "../components/actorFilmography";
import img from "../images/film-poster-placeholder.png";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const { data: person, error, isPending, isError } = useQuery({
    queryKey: ["person", { id: id }],
    queryFn: getPerson,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Grid container spacing={4} sx={{ padding: "20px" }}>
      <Grid size={{ xs: 12, md: 4 }}>
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
              : img
          }
          alt={person.name}
          style={{ width: "100%", borderRadius: 4 }}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {person.name}
        </Typography>

        <Paper
          component="ul"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            padding: 1.5,
            margin: "0 0 20px",
            gap: 1,
          }}
        >
          {person.known_for_department && (
            <li><Chip label={`Known for: ${person.known_for_department}`} color="primary" /></li>
          )}
          {person.birthday && (
            <li><Chip label={`Born: ${person.birthday}`} /></li>
          )}
          {person.deathday && (
            <li><Chip label={`Died: ${person.deathday}`} /></li>
          )}
          {person.place_of_birth && (
            <li><Chip label={person.place_of_birth} /></li>
          )}
        </Paper>

        <Typography variant="h5" component="h2" gutterBottom>
          Biography
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {person.biography || "No biography is available for this person."}
        </Typography>

        <ActorFilmography person={person} />
      </Grid>
    </Grid>
  );
};

export default ActorDetailsPage;
