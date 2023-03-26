import React from "react";
import PokemonCard from "./PokemonCard";
import Loader from './Loader';

function PokemonList ({ list, loading }) {
   return (
      <div>
         {loading
            ? <Loader />
            : <div className="pokemon-cards">

               {list.map(a => {
                  return <PokemonCard key={a.id} list={a} />
               })}
            </div>}
      </div>
   );
}

export default PokemonList;