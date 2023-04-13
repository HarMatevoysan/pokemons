import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from 'react-router-dom';
import { PokemonList, Loader, Pagination, MySelect, SearchedNames } from "./../index"
import Service from "../../api/Service"
import Funcs from "./../../utils/functions";
import { poksUrl } from "../../constants";
import searchIcon from './../../assets/png/searchicon.png'

const Pokemons = () => {
   const [pokemonAll, setPokemonAll] = useState([])
   const [pokemonAlls, setPokemonAlls] = useState([])
   const [pokemonNames, setPokemonNames] = useState([])
   const [pokemonNamesFiltred, setPokemonNamesFiltred] = useState([])
   const [showBar, setShowBar] = useState(false)
   const [pokTypes, setPokTypes] = useState([])
   const [limit, setLimit] = useState(20)
   const [loading, setLoading] = useState(true)
   const [loading2, setLoading2] = useState(false)
   const [selectedSort, setSelectedSort] = useState('')
   const [selectedType, setSelectedType] = useState('')
   const [searchPok, setSarchPok] = useState('')
   const [currentPage, setCurrentPage] = useState(1);
   const [minPageLimit, setMinPageLimit] = useState(0);
   const [maxPageLimit, setMaxPageLimit] = useState(7);
   const lastPageIndex = currentPage * limit
   const firstPageIndex = lastPageIndex - limit
   const curr = pokemonAll.slice(firstPageIndex, lastPageIndex)
   const paginate = pageNum => setCurrentPage(pageNum)
   const pokemonName = []
   const lastElement = useRef()
   const observer = useRef()
   const fetchAllData = useMemo(() => {
      return async function () {
         const response = await Service.getAlls(poksUrl)
         await loadingPockAll(response.data.results)

      }
   }, [])

   const fetchTypes = useMemo(() => {
      return async function () {
         const response = await Service.getTypes()
         setPokTypes(response.data.results)

      }
   }, [])

   async function fetchTypesByName (name) {
      const response = await Service.getTypesByName(name)
      await loadingPockAllByType(response.data.pokemon)

   }
   useEffect(() => {
      fetchAllData();
      fetchTypes();
      setLoading(false)
   }, [])

   useEffect(() => {
      if (observer.current) observer.current.disconnect()
      let callback = (entries, observer) => {
         if (entries[0].isIntersecting) {
            setLimit(limit + 20)

         }

      }
      observer.current = new IntersectionObserver(callback)
      observer.current.observe(lastElement.current)
   }, [limit])

   async function loadingPockAll (data) {
      setLoading2(true)
      const _data = await Promise.all(
         data.map(async pok => {
            const record = await Service.getPoc(pok.url);
            return record
         })
      )
      setPokemonAll(_data)
      setPokemonAlls(_data)
      _data.map(name => pokemonName.push(name.name))
      setPokemonNames(pokemonName)
      setLoading2(false)
   }

   async function loadingPockAllByType (data) {
      if (!selectedType) return false
      setLoading2(true)
      const _data = await Promise.all(
         data.map(async pok => {
            const record = await Service.getPoc(pok.pokemon.url);
            return record
         })
      )
      setPokemonAll(_data)
      setPokemonAlls(_data)
      setCurrentPage(1)
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

   function searchPoks (e) {
      e.preventDefault()
      if (searchPok.length > 0) {
         setSarchPok(e.target.innerText)
         setShowBar(false)
         setLoading2(true)
         setPokemonAll([...pokemonAll].filter(pok => pok.name.toLocaleLowerCase().includes(searchPok.toLocaleLowerCase())))
         setCurrentPage(1)
         setLoading2(false)
      } else {
         setShowBar(false)
         setPokemonAll(pokemonAlls)
         setCurrentPage(1)

      }

   }

   function setLimitt (e) {
      setLimit(e)
      setCurrentPage(1)
      setMinPageLimit(0)
   }

   const setSarchPoks = (val) => {
      setSarchPok(val)
      if (val) {
         setShowBar(true)
         const filtredName = [...pokemonNames].filter(name => name.includes(val))
         setPokemonNamesFiltred(filtredName);
      } else setShowBar(false)
   }

   return (
      <div>
         {
            loading
               ? <Loader />
               : <div>
                  <div className="home">
                     <div className="home__container">
                        <div className="header">
                           <h1><Link className="header__title" to='/'>Pokemons</Link></h1>
                           <div className="header__filter">
                              <div className="header__filter__left">
                                 <form
                                    onSubmit={e => { searchPok(e) }}

                                    className="header__filter__left_form"
                                 >
                                    <input
                                       className="header__search"
                                       placeholder="Serach pokemon..."
                                       value={searchPok}
                                       onChange={e => setSarchPoks(e.target.value)}
                                    />

                                    <button className="header__search__all" onClick={searchPoks}>
                                       <img src={searchIcon} />

                                    </button>
                                    {showBar
                                       ? <SearchedNames setSarchPok={searchPoks} names={pokemonNamesFiltred} />
                                       : null
                                    }
                                 </form >

                                 <MySelect
                                    value={selectedType}
                                    onChange={e => setSelectedType(e)}
                                    defaultValue='All types'
                                    defaultValueVal="*"
                                    options={
                                       pokTypes.map(type => {
                                          return { value: type.name, name: Funcs.nameFirstChild(type.name) }
                                       })

                                    } />
                                 <MySelect
                                    value={selectedSort}
                                    onChange={e => setSelectedSort(e)}
                                    defaultValue='Sort by'
                                    defaultValueVal="*"
                                    options={[
                                       { value: 'name', name: "name A-Z" },
                                       { value: 'name-2', name: "name Z-A" },
                                    ]}
                                 />

                              </div>
                              <div className="header__filter__right">
                                 <p>Show pockemens on page</p>
                                 <MySelect
                                    otherClass={' quantity'}
                                    value={limit}
                                    onChange={e => setLimitt(e)}
                                    defaultValue='10'
                                    defaultValueVal="10"
                                    options={[
                                       { value: '20', name: "20" },
                                       { value: '30', name: "30" },
                                    ]}
                                 />

                              </div>
                           </div>

                        </div>
                        {loading2
                           ? <Loader />
                           : <div>
                              <PokemonList list={sortedPoks} loading={loading} />
                              <Pagination
                                 limit={limit}
                                 totalPages={pokemonAll.length}
                                 paginate={paginate}
                                 currentPage={currentPage}
                                 setPage={setCurrentPage}
                                 minPageLimit={minPageLimit}
                                 setMinPageLimit={setMinPageLimit}
                                 maxPageLimit={maxPageLimit}
                                 setMaxPageLimit={setMaxPageLimit}
                              />
                           </div>
                        }
                     </div >
                  </div >
               </div >
         }
         <div>
            <div ref={lastElement} className="lastelement"></div>
         </div>
      </div >
   );
}

export default Pokemons; 