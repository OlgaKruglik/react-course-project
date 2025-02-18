import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Registration from "./Pages/Registration";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Save from "./Pages/SaveForm"

const theme = createTheme();

function App() {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/save" element={<Save />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
