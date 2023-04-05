import React from "react";
import { Route, Routes } from "react-router-dom";
import Pokemons from "../Pokemons";
import { PokemonPage } from '../index';


function AppRouter () {
   return (
      <Routes>
         <Route path="/" element={<Pokemons />}></Route>
         <Route path="/pokemons/:name" element={<PokemonPage />}></Route>
      </Routes>
   );
}

export default AppRouter;