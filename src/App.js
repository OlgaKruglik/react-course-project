import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Registration from "./Pages/Registration";
import NewForm from "./Components/NewForm"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MyForms from "./Pages/MyForm"
import Answer from "./Pages/Answer"

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
          <Route path="/form/:formId" element={<NewForm />} />
          <Route path="/myforms" element={<MyForms />} />
          <Route path="/answers" element={<Answer />} />
          <Route path="/answer/:formId" element={<Answer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
