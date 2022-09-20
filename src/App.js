import React from "react";
import "./App.css";
import APIPresidenteAll from "./components/ApiPresidente";
import BoxDate from "./components/BoxDate";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <BoxDate />
      <APIPresidenteAll />
    </div>
  );
}