import React from "react";
import { Route, Routes } from "react-router-dom";
import Pokemons from "./Pokemons";
import PokemeonPage from './PokemonPage';

function AppRouter () {
   return (
      <Routes>
         <Route path="/" element={<Pokemons />}></Route>
         <Route path="/pokemons/:name" element={<PokemeonPage />}></Route>
      </Routes>
   );
}

export default AppRouter;