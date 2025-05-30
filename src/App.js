import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BrewPage from "./pages/BrewPage";
import BeanPage from "./pages/BeanPage"

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#333", color: "#fff" }}>
        <Link to="/" style={{ marginRight: "1rem", color: "#fff" }}>抽出方法</Link>
        <Link to="/beans" style={{ color: "#fff" }}>豆の種類</Link> 
      </nav>

      <Routes>
        <Route path="/" element={<BrewPage />} />
        <Route path="/beans" element={<BeanPage />} />
      </Routes>
    </Router>
  );
}

export default App;