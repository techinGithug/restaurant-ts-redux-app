import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Container,
  createMuiTheme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import Order from "./components/order";

const theme: any = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        {/* <div>{orders}</div> */}
        <Typography gutterBottom variant="h2" align="center">
          Restaurant App
        </Typography>
        <Order />
      </Container>
    </ThemeProvider>
  );
};

export default App;
