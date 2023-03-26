import React, { useEffect, useState, useMemo } from "react";
import Service from "../Api/Service";
import PokemonList from "./PokemenList";
import Pagination from './pagination/Pagination';
import Loader from "./Loader";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

function Pokemons () {
   const [pokemons, setPokemons] = useState([])
   const [pokemonAll, setPokemonAll] = useState([])
   const [totalpages, setTotalPages] = useState('3')
   const [limit, setLimit] = useState(20)
   const [loading, setLoading] = React.useState(true)
   const [loading2, setLoading2] = React.useState(false)

   const [offset, setOffset] = useState(0)
   // const [page, setPage] = useState(1)
   const [selectedSort, setSelectedSort] = React.useState('')
   const [selectedType, setSelectedType] = React.useState('')
   const [searchPok, setSarchPok] = React.useState('')
   const [nextUrl, setNextUrl] = React.useState('')
   const [prevUrl, setPrevUrl] = React.useState('')
   const url = 'https://pokeapi.co/api/v2/pokemon'

   // let PageSize = totalpages;

   const [currentPage, setCurrentPage] = useState(1);

   // const currentTableData = useMemo(() => {
   //    const firstPageIndex = (currentPage - 1) * PageSize;
   //    const lastPageIndex = firstPageIndex + PageSize;
   //    return pokemonAll.slice(firstPageIndex, lastPageIndex);
   // }, [currentPage]);
   const fetchAllData = useMemo(() => {
      return async function () {
         let response = await Service.getAlls(url)
         await loadingPockAll(response.data.results)
         setTotalPages(response.data.count)

      }
   }, [])
   useEffect(() => {
      async function fetch () {
         let response = await Service.getAll(url, limit, offset)
         setNextUrl(response.data.next)
         setPrevUrl(response.data.previous)
         await loadingPock(response.data.results)

      }
      fetch()

      // async function fetchAll () {
      //    let response = await Service.getAlls(url)
      //    await loadingPockAll(response.data.results)
      //    setTotalPages(response.data.count)

      // }
      // fetchAll()
      fetchAllData();
      setLoading(false)

   }, [limit, offset, searchPok])



   async function nextPage () {
      setLoading2(true)
      let data = await Service.getAll(nextUrl)
      await loadingPock(data.data.results)
      setNextUrl(data.data.next)
      setPrevUrl(data.data.previous)
      setLoading2(false)

   }


   async function prevPage () {
      setLoading2(true)

      if (!prevUrl) return
      let data = await Service.getAll(prevUrl)
      await loadingPock(data.data.results)
      setNextUrl(data.data.next)
      setPrevUrl(data.data.previous)
      setLoading2(false)

   }

   async function loadingPock (data) {
      let _data = await Promise.all(
         data.map(async pok => {
            let record = await Service.getPoc(pok.url);
            return record
         })
      )
      setPokemons(_data)
   }
   async function loadingPockAll (data) {
      let _data = await Promise.all(
         data.map(async pok => {
            let record = await Service.getPoc(pok.url);
            return record
         })
      )
      setPokemonAll(_data)
   }

   function typePoks (type) {
      setSelectedType(type)
      setPokemons([...pokemons].filter(ty => {
         return ty.types?.type?.name.includes(selectedSort)
      }
      ))
      // setPokemons([...pokemonAll].filter(pok => pok.types.filter(ty => ty.type.name.includes(selectedSort))))
   }


   const sortedPoks = useMemo(() => {
      if (selectedSort) {
         if (selectedSort === '*') {
            return pokemons
         } else if (selectedSort === 'name') {
            return [...pokemonAll].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
         }
         else if (selectedSort === 'name-2') {
            return [...pokemonAll].sort((a, b) => b['name'].localeCompare(a['name']))
         }
         return pokemons
      }
      return pokemons


   }, [selectedSort, pokemonAll])

   const selectedAndSearchedPoks = useMemo(() => {
      return sortedPoks.filter(pok => pok.name.toLocaleLowerCase().includes(searchPok.toLocaleLowerCase()))

   }, [searchPok, sortedPoks])

   function searchPoks () {
      setPokemons([...pokemonAll].filter(pok => pok.name.toLocaleLowerCase().includes(searchPok.toLocaleLowerCase())))

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
                                 onChange={e => typePoks(e.target.value)} value={selectedType}
                              >
                                 <option >All types</option>
                                 <option value={'normal'}  >Normal</option>
                                 <option value={'rock'} >Rock</option>
                                 <option value={'bug'} >Bug</option>
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
                        : <PokemonList list={selectedAndSearchedPoks} loading={loading} />

                     }
                     <div className="home__buttons">
                        <div className="home__button" onClick={prevPage}>Prev.</div>
                        <div className="home__button" onClick={nextPage}>Next.</div>
                     </div>
                     {searchPok
                        ? <div></div>
                        : <Pagination
                           className="pagination-bar"
                           currentPage={currentPage}
                           totalCount={totalpages}
                           pageSize={limit}
                           onPageChange={page => setCurrentPage(page)}
                           next={nextPage}
                           prev={prevPage}
                           offset={setOffset}
                           limit={limit}
                        />
                     }


                  </div >
               </div >
         }
      </div>
   );
}

export default Pokemons;