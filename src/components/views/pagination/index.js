import { React, useState } from 'react';
import style from './pagination.module.scss'

const Pagination = ({ limit, totalPages, paginate, currentPage, setPage, minPageLimit, setMinPageLimit, maxPageLimit, setMaxPageLimit }) => {
   const [pageLimit, setPageLimit] = useState(7);

   const pageNumbers = []
   for (let i = 1; i <= Math.ceil(totalPages / limit); i++) {
      pageNumbers.push(i)
   }
   const onPrev = () => {
      if (currentPage === 1) return false
      setPage(currentPage - 1)
      if ((currentPage - 1) % pageLimit == 0) {
         setMaxPageLimit(maxPageLimit - pageLimit)
         setMinPageLimit(minPageLimit - pageLimit)
      }
   }
   const onNext = () => {
      if (currentPage === pageNumbers.length) return false
      setPage(currentPage + 1)

      if (currentPage + 1 > maxPageLimit) {
         setMaxPageLimit(maxPageLimit + pageLimit)
         setMinPageLimit(minPageLimit + pageLimit)
      }

   }

   const showedPages = pageNumbers.map(num => {

      if (num < maxPageLimit + 1 && num > minPageLimit) {
         return <li className={style.pagination__item} key={num}>
            <span
               className={currentPage === num ? `${style.pagination__link_active}` : `${style.pagination__link}`}
               onClick={() => paginate(num)}
            >
               {num}
            </span>
         </li>
      } else {
         return null
      }



   })
   return (

      <div>
         {/* <button onClick={showedPages} >pushh</button> */}
         <ul className={style.pagination}>
            <li
               className={style.pagination__item}
               onClick={onPrev}
               style={{ padding: '0 5px' }}
            >&larr;</li>
            {showedPages}
            <li
               className={style.pagination__item}
               onClick={onNext}
               style={{ padding: '0 5px' }}
            >&rarr;</li>
         </ul>
      </div >
   );
}

export default Pagination;
