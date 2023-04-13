import React from "react";
import style from "./MySellect.module.scss"

function MySelect ({ options, defaultValue, defaultValueVal, value, onChange, otherClass = '' }) {
   return (
      <select className={style.mySelect + otherClass}
         value={value}
         onChange={e => onChange(e.target.value)}

      >
         <option value={defaultValueVal}>{defaultValue}</option>
         {options.map((option) =>
            <option key={option.value} value={option.value} >
               {option.name}
            </option>
         )}
      </select>
   );


}

export default MySelect;