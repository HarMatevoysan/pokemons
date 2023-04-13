import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Service from './../../../api/Service';
import Funcs from "./../../../utils/functions";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Loader } from "../../index";
import style from "./pokemonPage.module.scss"
import { pokSpecsUrl, poksUrl } from "../../../constants";


const PokemonPage = () => {
   const params = useParams();
   const [pokemon, setPokemon] = useState({});
   const [loading, setLoading] = useState(true);
   const [desc, setDesc] = useState({});
   useEffect(() => {
      document.title = 'Pokemon ' + Funcs.nameFirstChild(params.name)
      async function fetch () {
         const response = await Service.getByName(poksUrl, params.name);
         setPokemon(response.data);
         const descriptions = await Service.getByName(pokSpecsUrl, params.name);
         setDesc(descriptions.data);
         setLoading(false);
      }
      fetch();
   }, []);

   return (
      <div>
         {loading ? (
            <Loader />
         ) : (
            <div className={style.page}>
               <div className={style.page__contenier} >
                  <div className={style.page__home}>
                     <Link to={"/"} className={style.page__home_link}>
                        ← More Pokemons
                     </Link>
                  </div>
                  <div className={style.page__title}>
                     {Funcs.nameFirstChild(pokemon.name)} {Funcs.addingZero(pokemon.id)}
                  </div>
                  <div className={style.page__body}>
                     <div className="column">
                        <div className={style.page__avatar}>
                           <img src={pokemon.sprites.other.home.front_default} alt="" />
                        </div>
                     </div>
                     <div className="column" >
                        <div className={style.page__description}>
                           {desc?.flavor_text_entries[1]?.flavor_text?.toString()}
                        </div>
                        <div className={style.page__info}>
                           <div className={style.page__info_item}>
                              <div className={style.page__info_item__title}>Height</div>
                              <div className={style.page__info_item__info}>{pokemon.height / 10}m</div>
                           </div>
                           <div className={style.page__info_item}>
                              <div className={style.page__info_item__title}>Weight</div>
                              <div className={style.page__info_item__info}>{pokemon.weight / 10}kg</div>
                           </div>
                           <div className={style.page__info_item}>
                              <div className={style.page__info_item__title}>Category</div>
                              <div className={style.page__info_item__info}></div>
                           </div>
                           <div className={style.page__info_item}>
                              <div className={style.page__info_item__title}>Types</div>
                              <div className={style.page__info_item__info}>
                                 {pokemon.types.map(type => {
                                    return type.type.name
                                 }).join(', ')}
                              </div>
                           </div>
                           <div className={style.page__info_item}>
                              <div className={style.page__info_item__title}>Abilities</div>
                              <div className={style.page__info_item__info}>
                                 {pokemon.abilities.map(ab => {
                                    return ab.ability.name
                                 }).join(', ')}
                              </div>
                           </div>
                           <div className={style.page__info_item}>
                              <div className={style.page__info_item__title}>Genders</div>
                              <div className={style.page__info_item__info}>
                                 {'male, \n female'}
                              </div>
                           </div>
                        </div>
                        <div className={style.page__stats}>
                           <div className={style.page__stats__title}>Stats</div>
                           <div className={style.page__stats__cols}>
                              <div className={style.page__stats__col}>
                                 <CircularProgressbar value={pokemon.stats[0].base_stat * 0.8} text='HP' />
                              </div>
                              <div className={style.page__stats__col}>
                                 <CircularProgressbar value={pokemon.stats[1].base_stat * 0.8} text={'Attack'} />
                              </div>
                              <div className={style.page__stats__col}>
                                 <CircularProgressbar value={pokemon.stats[2].base_stat * 0.8} text={'Defense'} />
                              </div>
                              <div className={style.page__stats__col}>
                                 <CircularProgressbar value={pokemon.stats[3].base_stat * 0.8} text={'Sp. Attack'} />
                              </div>
                              <div className={style.page__stats__col}>
                                 <CircularProgressbar value={pokemon.stats[4].base_stat * 0.8} text={'Sp. Defense'} />
                              </div>
                              <div className={style.page__stats__col}>
                                 <CircularProgressbar value={pokemon.stats[5].base_stat * 0.8} text={'Speed'} />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )
         }
      </div >
   );
}

export default PokemonPage;
