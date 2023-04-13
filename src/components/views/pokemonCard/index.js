import React from "react";
import { useNavigate } from 'react-router-dom'
import Funcs from './../../../utils/functions';
import style from "./pokemonCard.module.scss"

const PokemonCard = ({ list }) => {
   const loc = useNavigate();
   return (
      <div className={style.card} onClick={() => loc(`/pokemons/${list.name}`)}>
         <div className={style.card__avatar}>
            <img src={list.sprites.other.home.front_default} alt="" />
         </div>
         <div className={style.card__body}>
            <p className={style.card__body_title}>{Funcs.nameFirstChild(list.name)}</p>
            <p className={style.card__body_id}>{Funcs.addingZero(list.id)}</p>
            <p className={style.card__body_type}>
               {list.types.map(type => {
                  return type.type.name
               }).join(', ')}
            </p>
         </div>
      </div >
   );
}

export default PokemonCard;