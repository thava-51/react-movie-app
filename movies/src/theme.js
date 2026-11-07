import { createTheme } from "@mui/material/styles";

const getTheme = (mode) => {
  const dark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? "#52ADAD" : "#1E5A5A" },
      secondary: { main: "#F28F00" },
      warning: { main: "#F5C524" },
      background: dark
        ? { default: "#0F1A22", paper: "#17252F" }
        : { default: "#FFFFFF", paper: "#FFFFFF" },
    },
    typography: {
      fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
      h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
      h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
      h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
      h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
      h5: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
      h6: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
      button: { fontFamily: '"Poppins", sans-serif' },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: dark ? "#13202B" : "#1E5A5A",
            color: "#fff",
          },
        },
      },
    },
  });
};

export default getTheme;
