import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Landing from "./components/Landing.jsx";
import Home from "./components/Home.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <StrictMode>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </StrictMode>
  </Router>
);
