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
import FilterData from "./components/FilterData";
import APIPresidenteAcre from "./components/ac/ApiPresidenteAC";
export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <FilterData />
        <BoxDate />
        <Routes>
          <Route path="/" element={<APIPresidenteAll />} />
          <Route path="/AC" element={<APIPresidenteAcre />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}