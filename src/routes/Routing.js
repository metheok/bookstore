import React from "react";
import { Route, Routes } from "react-router-dom";
import routeConfig from "./routeConfigration";

export default function Routing() {
  return (
    <Routes>
      {routeConfig.map((route, index) => (
        <Route
          key={index + "route"}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  );
}
