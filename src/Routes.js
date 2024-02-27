import React from "react";

import Home from "./containers/Home";
import { Route, Routes } from "react-router-dom";

export default function MyRoutes(props) {
  const { tableRows, setLoading, pokemonTypesOptions } = props;

  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index path="/" element={<Home tableRows={tableRows} setLoading={setLoading} pokemonTypesOptions={pokemonTypesOptions}/>} />
          <Route index path="*" element={<Home tableRows={tableRows} />} />
        </Route>
      </Routes>
    </div>
  );
}
