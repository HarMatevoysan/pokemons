import React from "react";
import { Loader, PokemonCard } from './../../index'
import style from './pokemonList.module.scss'

const PokemonList = ({ list, loading }) => {
   return (
      <div>
         {loading
            ? <Loader />
            : <div className={style.pokemons}>
               {list.map(a => {
                  return <PokemonCard key={a.id} list={a} />
               })}
            </div>
         }
      </div>
   )
}

export default PokemonList;