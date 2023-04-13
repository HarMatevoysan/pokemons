import React from "react";
import style from "./searchedNames.module.scss"
import Funcs from './../../../utils/functions';

const SearchedNames = ({ names, setSarchPok }) => {
   console.log(names);

   return (

      <div className={style.bar}>
         {names.map(name =>
            <div key={name} onClick={e => setSarchPok(e, name)} className={style.bar__items}>{Funcs.nameFirstChild(name)}</div>
         )}
      </div>
   );
}

export default SearchedNames;