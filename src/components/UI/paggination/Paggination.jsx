import React, { useEffect } from 'react';
import { getPagesArray } from '../../utils/pages';
import cl from './Paggination.module.css'

const Paggination = ({pagesArray, page, changePage}) => {
    if (!pagesArray) return;
    return (
        <div className= {cl.page__wrapper}>
        {pagesArray.map( p => 
          <span 
            onClick = {() => changePage(p)}
            key={p} 
            className={page === p ? [cl.page,cl.page__current].join(' ') : cl.page}
          >
            {p}
          </span>
        )}
      </div>
    );
};

export default Paggination;