import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Добавлено
import CssBaseline from "@mui/material/CssBaseline"; // Улучшает стилизацию
import Registration from "./Pages/Registration";
import Home from "./Pages/Home";
import Login from "./Pages/Login"

const theme = createTheme(); // Создание темы

function App() {
  return (
    <ThemeProvider theme={theme}> {/* Оборачиваем в ThemeProvider */}
      <CssBaseline /> {/* Для стилистической консистентности */}
      <Router basename="/react-course-project">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
