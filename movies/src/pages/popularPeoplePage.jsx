import { Link } from "react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import PaginationBar from "../components/paginationBar";
import usePageParam from "../hooks/usePageParam";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Spinner from "../components/spinner";
import { getPopularPeople } from "../api/tmdb-api";
import img from "../images/film-poster-placeholder.png";

const PopularPeoplePage = () => {
  const [page, setPage] = usePageParam();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popularPeople", { page }],
    queryFn: getPopularPeople,
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ p: 3, textAlign: "center" }}>
        Popular People
      </Typography>
      <Grid container>
        {data.results.map((person) => (
          <Grid
            key={person.id}
            size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
            sx={{ padding: "20px" }}
          >
            <Card>
              <CardActionArea component={Link} to={`/person/${person.id}`}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w342/${person.profile_path}`
                      : img
                  }
                  title={person.name}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="p">
                    {person.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" component="p">
                    {person.known_for_department}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <PaginationBar page={page} totalPages={data.total_pages} onChange={setPage} />
    </>
  );
};

export default PopularPeoplePage;
