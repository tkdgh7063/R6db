import * as React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header.js";
import Main from "./components/Main.js";
import { Oper, OperDetail } from "./components/Operator.js";
import OperatorAdd from "./components/OperatorAdd.js";
import OperatorUpdate from "./components/OperatorUpdate.js";
import { Map, MapDetail } from "./components/Map.js";
import MapAdd from "./components/MapAdd.js";
import MapUpdate from "./components/MapUpdate.js";
import { Weapon, WeaponDetail } from "./components/Weapon.js";
import WeaponAdd from "./components/WeaponAdd.js";
import WeaponUpdate from "./components/WeaponUpdate.js";
// import Login from "./components/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/operator" element={<Oper />} />
          <Route path="/operator/insert" element={<OperatorAdd />} />
          <Route path="/operator/:id" element={<OperDetail />} />
          <Route path="/operator/:id/update" element={<OperatorUpdate />} />
          <Route path="/map" element={<Map />} />
          <Route path="/map/insert" element={<MapAdd />} />
          <Route path="/map/:id" element={<MapDetail />} />
          <Route path="/map/:id/update" element={<MapUpdate />} />
          <Route path="/weapon" element={<Weapon />} />
          <Route path="/weapon/insert" element={<WeaponAdd />} />
          <Route path="/weapon/:id" element={<WeaponDetail />} />
          <Route path="/weapon/:id/update" element={<WeaponUpdate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
