import { createTheme } from "@mui/material/styles";

// Deep moss + warm clay palette — reads as "sustainability" without
// leaning on the generic bright-green eco-cliché.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2F5233", // deep moss green
      light: "#4C7A52",
      dark: "#1D3620",
    },
    secondary: {
      main: "#C97B4A", // warm clay accent
    },
    background: {
      default: "#F6F5F1",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E241E",
      secondary: "#5B6B5D",
    },
    success: { main: "#3C8558" },
    warning: { main: "#C97B4A" },
    error: { main: "#B3452C" },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
  },
});

export default theme;
