import { React } from 'react';
import "./styles.css"
function Pagination ({ limit, totalPages, paginate, currentPage }) {
   const pageNumbers = []

   for (let i = 1; i < Math.ceil(totalPages / limit); i++) {
      pageNumbers.push(i)

   }

   return (
      <div>
         <ul className='pagination'>
            {
               pageNumbers.map(num => {
                  return <li className='page-item' key={num}>
                     <span
                        className={currentPage === num ? 'page-link active' : 'page-link'}
                        onClick={() => paginate(num)}
                     >
                        {num}
                     </span>
                  </li>
               })
            }
         </ul>
      </div >
   );
}

export default Pagination;
