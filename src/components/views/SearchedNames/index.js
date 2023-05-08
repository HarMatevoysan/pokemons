import React from "react";
import Funcs from '../../../utils/index';
import style from "./searchedNames.module.scss"

const SearchedNames = ({ names, setSarchPok }) => {
   return (
      <div className={style.bar}>
         {names.map(name =>
            <div key={name} onClick={e => setSarchPok(e, name)} className={style.bar__items}>{Funcs.nameFirstChild(name)}</div>
         )}
      </div>
   );
}

export default SearchedNames;