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
import APIPresidenteBA from "./components/ba/ApiPresidenteBA"
import APIPresidenteCeara from "./components/ce/ApiPresidenteCE"
import APIPresidenteDistrito from "./components/df/ApiPresidenteDF"
import APIPresidenteESanto from "./components/es/ApiPresidenteES";
import APIPresidenteGoias from "./components/go/ApiPresidenteGO";
import APIPresidenteMA from "./components/ma/ApiPresidenteMA";
import APIPresidenteMT from "./components/mt/ApiPresidenteMT";
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
          <Route path="/BA" element={<APIPresidenteBA />} />
          <Route path="/CE" element={<APIPresidenteCeara />} />
          <Route path="/DF" element={<APIPresidenteDistrito />} />
          <Route path="/ES" element={<APIPresidenteESanto />} />
          <Route path="/GO" element={<APIPresidenteGoias />} />
          <Route path="/MA" element={<APIPresidenteMA/>}/>
          <Route path="/MT" element={<APIPresidenteMT/>}/>        
        </Routes>
      </BrowserRouter>
    </div>
  );
}