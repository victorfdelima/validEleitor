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
import APIPresidenteAlagoas from "./components/al/ApiPresidenteAL";
import APIPresidenteAmapa from "./components/ap/ApiPresidenteAP";
import APIPresidenteAmazonas from "./components/am/ApiPresidenteAM";
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
          <Route path="/AL" element={<APIPresidenteAlagoas />} />
          <Route path="/AP" element={<APIPresidenteAmapa />} />
          <Route path="/AM" element={<APIPresidenteAmazonas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}