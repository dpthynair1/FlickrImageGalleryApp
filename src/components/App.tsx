import React, { FC } from "react";
import { createRoot } from "react-dom/client.js";
import Search from "./Search";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageGallery from "./ImageGallery";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/gallery" element={<ImageGallery />} />
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}