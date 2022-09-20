import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import APIPresidenteAll from "./components/ApiPresidente";
import BoxDate from "./components/BoxDate";
import Header from "./components/Header";

export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <BoxDate />
        <Routes>
          <Route path="/" element={<APIPresidenteAll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}