import React from "react";
import { Loader, PokemonCard } from '../../index'
import style from './pokemonList.module.scss'

const PokemonList = ({ list, loading, reff }) => {
   console.log(reff);
   return (
      <div>
         {loading
            ? <Loader />
            : <div className={style.pokemons}>
               {list.map((cards, index) => {
                  return (
                     <div ref={index === list?.length - 1 ? reff : null}>
                        <PokemonCard key={cards.id} list={cards} />

                     </div>
                  )
               })}
            </div>
         }
      </div>
   )
}

export default PokemonList;