import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Service from "../../api/Service";
import Funcs from "../../utils/functions";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Loader } from "../index";
import "./pokemonPage.css"


function PokemonPage () {
   const params = useParams();
   const [pokemon, setPokemon] = React.useState({});
   const [loading, setLoading] = React.useState(true);
   const [desc, setDesc] = React.useState({});
   const url = "https://pokeapi.co/api/v2/pokemon";
   const url2 = "https://pokeapi.co/api/v2/pokemon-species";

   useEffect(() => {
      async function fetch () {
         let response = await Service.getByName(url, params.name);
         setPokemon(response.data);
         let descriptions = await Service.getByName(url2, params.name);
         setDesc(descriptions.data);
         // await loadingPock(response.data.results)
         setLoading(false);
      }
      fetch();
   }, []);
   console.log(pokemon);
   return (
      <div>
         {loading ? (
            <Loader />
         ) : (
            <div className="page page__contenier">
               <div className="page__home-link">
                  <Link to={"/"} className="home__link">
                     ← More Pokemons
                  </Link>
               </div>
               <div className="page__title">
                  {Funcs.nameFirstChild(pokemon.name)} {Funcs.addingZero(pokemon.id)}
               </div>
               <div className="page__body">
                  <div className="column">
                     <div className="page__avatar">
                        <img src={pokemon.sprites.other.home.front_default} alt="" />
                     </div>
                  </div>
                  <div className="column" style={{ marginLeft: 50 }}>
                     <div className="page__description">
                        {desc?.flavor_text_entries[1]?.flavor_text?.toString()}
                     </div>
                     <div className="page__info">
                        <div className="page__info-item">
                           <div className="page__info-item-title">Height</div>
                           <div className="page__info-item-info">{pokemon.height / 10}m</div>
                        </div>
                        <div className="page__info-item">
                           <div className="page__info-item-title">Weight</div>
                           <div className="page__info-item-info">{pokemon.weight / 10}kg</div>
                        </div>
                        <div className="page__info-item">
                           <div className="page__info-item-title">Category</div>
                           <div className="page__info-item-info"></div>
                        </div>
                        <div className="page__info-item">
                           <div className="page__info-item-title">Types</div>
                           <div className="page__info-item-info">

                              {pokemon.types.map(type => {
                                 return type.type.name
                              }).join(', ')}
                           </div>
                        </div>
                        <div className="page__info-item">
                           <div className="page__info-item-title">Abilities</div>
                           <div className="page__info-item-info">

                              {pokemon.abilities.map(ab => {
                                 return ab.ability.name
                              }).join(', ')}
                           </div>
                        </div>
                        <div className="page__info-item">
                           <div className="page__info-item-title">Genders</div>
                           <div className="page__info-item-info">
                              {'male, \n female'}
                           </div>
                        </div>
                     </div>
                     <div className="page__stats">
                        <div className="page__stats-title">Stats</div>
                        <div className="page__stats-cols">
                           <div className="page__stats-col">
                              <CircularProgressbar value={pokemon.stats[0].base_stat * 0.8} text='HP' />
                           </div>
                           <div className="page__stats-col">
                              <CircularProgressbar value={pokemon.stats[1].base_stat * 0.8} text={'Attack'} />
                           </div>
                           <div className="page__stats-col">
                              <CircularProgressbar value={pokemon.stats[2].base_stat * 0.8} text={'Defense'} />
                           </div>
                           <div className="page__stats-col">
                              <CircularProgressbar value={pokemon.stats[3].base_stat * 0.8} text={'Sp. Attack'} />
                           </div>
                           <div className="page__stats-col">
                              <CircularProgressbar value={pokemon.stats[4].base_stat * 0.8} text={'Sp. Defense'} />
                           </div>
                           <div className="page__stats-col">
                              <CircularProgressbar value={pokemon.stats[5].base_stat * 0.8} text={'Speed'} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default PokemonPage;
