import React, { useEffect, useState, useMemo } from "react";
import Pagination from './pagination/Pagination';
import { Link } from 'react-router-dom';
import { PokemonList, Loader } from "./index"
import Service from "../api/Service"
import Funcs from "../utils/functions";

function Pokemons () {
   const [pokemonAll, setPokemonAll] = useState([])
   const [pokTypes, setPokTypes] = useState([])
   const [totalpages, setTotalPages] = useState('1')
   const [limit, setLimit] = useState(20)
   const [loading, setLoading] = React.useState(true)
   const [loading2, setLoading2] = React.useState(false)

   const [selectedSort, setSelectedSort] = React.useState('')
   const [selectedType, setSelectedType] = React.useState('')
   const [searchPok, setSarchPok] = React.useState('')
   const url = 'https://pokeapi.co/api/v2/pokemon'

   const [currentPage, setCurrentPage] = useState(1);
   const lastPageIndex = currentPage * limit
   const firstPageIndex = lastPageIndex - limit
   const curr = pokemonAll.slice(firstPageIndex, lastPageIndex)
   const paginate = pageNum => setCurrentPage(pageNum)

   const fetchAllData = useMemo(() => {
      return async function () {
         let response = await Service.getAlls(url)
         await loadingPockAll(response.data.results)
         setTotalPages(response.data.count)

      }
   }, [])

   const fetchTypes = useMemo(() => {
      return async function () {
         let response = await Service.getTypes()
         setPokTypes(response.data.results)

      }
   }, [])

   async function fetchTypesByName (name) {
      let response = await Service.getTypesByName(name)
      await loadingPockAllByType(response.data.pokemon)

   }

   useEffect(() => {

      fetchAllData();
      // typedPoks()
      fetchTypes();
      setLoading(false)
   }, [])

   async function loadingPockAll (data) {
      setLoading2(true)

      let _data = await Promise.all(
         data.map(async pok => {
            let record = await Service.getPoc(pok.url);
            return record
         })
      )
      setPokemonAll(_data)
      setLoading2(false)

   }

   async function loadingPockAllByType (data) {
      if (!selectedType) return false
      setLoading2(true)
      let _data = await Promise.all(
         data.map(async pok => {
            let record = await Service.getPoc(pok.pokemon.url);
            return record
         })
      )
      setPokemonAll(_data)
      setLoading2(false)

   }

   const typedPoks = useMemo(() => {
      if (selectedType === '*') {
         fetchAllData()
      } else {
         fetchTypesByName(selectedType)
      }
   }, [selectedType])


   const sortedPoks = useMemo(() => {
      if (selectedSort) {
         if (selectedSort === '*') {
            return curr
         } else if (selectedSort === 'name') {
            const sortName = [...pokemonAll].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
            return sortName.slice(firstPageIndex, lastPageIndex)
         }
         else if (selectedSort === 'name-2') {
            const sortName2 = [...pokemonAll].sort((a, b) => b['name'].localeCompare(a['name']))
            return sortName2.slice(firstPageIndex, lastPageIndex)

         }
         return curr
      }

      return curr

   }, [selectedSort, pokemonAll, firstPageIndex, lastPageIndex])

   function searchPoks () {
      if (searchPok === "") return pokemonAll
      setLoading2(true)
      const searchh = [...pokemonAll].filter(pok => pok.name.toLocaleLowerCase().includes(searchPok.toLocaleLowerCase()))
      setPokemonAll(searchh)
      setLoading2(false)

   }


   return (
      <div>
         {
            loading
               ? <Loader />
               : <div>
                  <div className="home home-conteneir">
                     <div className="bar">
                        <h1 className="home-title" ><Link className="home-title" to='/'>Pokemons</Link></h1>
                        <div className="home-filter">
                           <div className="home-filter__left">
                              <input
                                 className="home-search"
                                 placeholder="Serach pokemon..."
                                 value={searchPok}
                                 onChange={e => setSarchPok(e.target.value)}
                              />
                              <button className="search-all" onClick={searchPoks}>Search All</button>
                              <select className="home-select types"
                                 onChange={e => setSelectedType(e.target.value)} value={selectedType}
                              >
                                 <option defaultValue value='*'  >All types</option>
                                 {pokTypes.map(type => {
                                    return <option value={type.name}>{Funcs.nameFirstChild(type.name)}</option>
                                 })}
                              </select>
                              <select className="home-select sort" onChange={e => setSelectedSort(e.target.value)} value={selectedSort}>
                                 <option defaultChecked value={'*'} >Sort by</option>
                                 <option value={'name'} >Name A-Z</option>
                                 <option value={'name-2'} >Name Z-A</option>
                              </select>
                           </div>
                           <div className="home-filter__right">
                              <p>Show pockemens on page</p>
                              <select className="home-select quantity" value={limit} onChange={e => setLimit(e.target.value)}>
                                 <option value='10'>10</option>
                                 <option value='20' >20</option>
                                 <option value='50'>50</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     {loading2

                        ? <Loader />
                        : <div>
                           <PokemonList list={sortedPoks} loading={loading} />
                           <Pagination limit={limit} totalPages={pokemonAll.length} paginate={paginate} currentPage={currentPage} />
                        </div>
                     }

                  </div >
               </div >
         }
      </div >
   );
}

export default Pokemons; 