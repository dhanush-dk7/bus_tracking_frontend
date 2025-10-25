import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingScreen from "./components/LandingScreen";
import BusDriverScreen from "./components/BusDriverScreen";
import UserScreen from "./components/UserScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/driver/:id" element={<BusDriverScreen />} /> 
        <Route path="/user" element={<UserScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
