import React from "react";
import "./App.css";
import { Button } from "@mui/material";
import CreateTreeForm from "./shared/components/CreateTreeForm/CreateTreeForm";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      default: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      default?: string;
    };
  }
}

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        dark: "#9EB23B",
        main: "#C7D36F",
        light: "#FCF9C6",
      },
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>Hello we are 4 vesla</h1>

        <div>
          <Button
            color={"primary"}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Open simple dialog
          </Button>
          <CreateTreeForm open={open} onClose={handleClose} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
