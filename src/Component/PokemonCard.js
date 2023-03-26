import React from "react";
import { useNavigate } from 'react-router-dom'
import Funcs from "./utils/functions";

function PokemonCard ({ list }) {
   const loc = useNavigate();

   // console.log(list.types.type);
   // function nameFirstChild (str) {
   //    return str.charAt(0).toUpperCase() + str.slice(1);
   // }
   // function addingZero (id) {
   //    if (id < 10) {
   //       return '#00' + id
   //    } else if (id < 100) {
   //       return '#0' + id
   //    } else {
   //       return '#' + id
   //    }
   // }

   return (
      <div className="pokemon-card card" onClick={() => loc(`/pokemons/${list.name}`)}>
         <div className="card__avatar">
            <img src={list.sprites.other.home.front_default} alt="" />
         </div>
         <div className="card__body">
            <p className="card__body-title">{Funcs.nameFirstChild(list.name)}</p>
            <p className="card__body-id">{Funcs.addingZero(list.id)}</p>
            <p className="card__body-type">
               {list.types.map(type => {
                  return type.type.name
               }).join(', ')}
            </p>
         </div>
      </div>
   );
}

export default PokemonCard;