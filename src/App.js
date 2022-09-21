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
import APIPresidenteMS from "./components/ms/ApiPresidenteMS";
import APIPresidenteMG from "./components/mg/ApiPresidenteMG"
import APIPresidente from "./components/pa/ApiPresidente";
import APIPresidentePB from "./components/pb/ApiPresidente";
import APIPresidentePR from "./components/pr/ApiPresidente";
import APIPresidentePE from "./components/pe/ApiPresidente";
import APIPresidentePI from "./components/pi/ApiPresidente";
import APIPresidenteRJ from "./components/rj/ApiPresidente";
import APIPresidenteRO from "./components/ro/ApiPresidente";
import APIPresidenteRN from "./components/rn/ApiPresidente";
import APIPresidenteRR from "./components/rr/ApiPresidente";
import APIPresidenteRS from "./components/rs/ApiPresidente";
import APIPresidenteSC from "./components/sc/ApiPresidente";
import APIPresidenteSE from "./components/se/ApiPresidente";
import APIPresidenteSP from "./components/sp/ApiPresidente";
import APIPresidenteTO from "./components/to/ApiPresidente";

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
          <Route path="/MS" element={<APIPresidenteMS/>}/>
          <Route path="/MG" element={<APIPresidenteMG/>}/> 
          <Route path="/PA" element={<APIPresidente/>}/> 
          <Route path="/PB" element={<APIPresidentePB/>}/> 
          <Route path="/PR" element={<APIPresidentePR />} />
          <Route path="/PE" element={<APIPresidentePE />} />
          <Route path="/PI" element={<APIPresidentePI />} />
          <Route path="/RJ" element={<APIPresidenteRJ />} />
          <Route path="/RO" element={<APIPresidenteRO />} />
          <Route path="/RN" element={<APIPresidenteRN />} />
          <Route path="/RR" element={<APIPresidenteRR/>}/>
          <Route path="/RS" element={<APIPresidenteRS/>}/> 
          <Route path="/SC" element={<APIPresidenteSC/>}/>
          <Route path="/SE" element={<APIPresidenteSE/>}/> 
          <Route path="/SP" element={<APIPresidenteSP/>}/> 
          <Route path="/TO" element={<APIPresidenteTO/>}/> 

        </Routes>
      </BrowserRouter>
    </div>
  );
}