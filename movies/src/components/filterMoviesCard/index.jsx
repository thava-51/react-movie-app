import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";

import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'

import { getGenres } from "../../api/tmdb-api";

const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

const languages = [
  { code: "all", name: "All" },
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
  { code: "ta", name: "Tamil" },
];

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "popularity", label: "Popularity" },
  { value: "vote_average", label: "Rating" },
  { value: "release_date", label: "Release date" },
  { value: "title", label: "Title" },
];

export default function FilterMoviesCard(props) {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner inline />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleYearChange = (e) => {
    handleChange(e, "year", e.target.value);
  };

  const handleRatingChange = (e, value) => {
    handleChange(e, "rating", value);
  };

  const handleLanguageChange = (e) => {
    handleChange(e, "language", e.target.value);
  };

  const handleSortByChange = (e) => {
    handleChange(e, "sortBy", e.target.value);
  };

  const handleSortDirChange = (e) => {
    handleChange(e, "sortDir", e.target.value);
  };

  return (
    <Card 
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          sx={{...formControl}}
          id="year-filter"
          label="Release year"
          type="number"
          variant="filled"
          placeholder="e.g. 2024"
          value={props.yearFilter}
          onChange={handleYearChange}
        />
        <FormControl sx={{...formControl, padding: "8px 16px"}}>
          <Typography id="rating-label" gutterBottom>
            Minimum rating: {props.ratingFilter}
          </Typography>
          <Slider
            aria-labelledby="rating-label"
            value={props.ratingFilter}
            onChange={handleRatingChange}
            min={0}
            max={10}
            step={0.5}
            marks
            valueLabelDisplay="auto"
          />
        </FormControl>
        <FormControl sx={{...formControl}}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={props.languageFilter}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{...formControl}}>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            value={props.sortBy}
            onChange={handleSortByChange}
          >
            {sortOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{...formControl}}>
          <InputLabel id="sort-dir-label">Order</InputLabel>
          <Select
            labelId="sort-dir-label"
            id="sort-dir-select"
            value={props.sortDir}
            onChange={handleSortDirChange}
            disabled={props.sortBy === "default"}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
