import React from 'react'
import { useState, useEffect } from 'react';


const Choosers = () => {
    //usestates
  const [deals, setDeals] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    let url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1';

    // filter
    if (filter === 'under5') {
        url += '&upperPrice=5';
        } else if (filter === 'under10') {
        url += '&upperPrice=10';
    } else if (filter === 'under20') {
        url += '&upperPrice=20';
    } 

    //sorting
    if (sort === 'hightolow') {
      url += '&sortBy=Price';
    } else if (sort === 'lowtohigh') {
      url += '&sortBy=Price&desc=1';
    }

    //fetch
    fetch(url)
      .then(response => response.json())
      .then(data => setDeals(data));
  }, [filter, sort]);

  return (
    <div className='box'>
        <nav  className='filters'>
        <h2>Filter</h2>
        <select value={filter} onChange={event => setFilter(event.target.value)}>
            <option value="">None</option>
            <option value="under5">Under €5</option>
            <option value="under10">Under €10</option>
            <option value="under20">Under €20</option>        
        </select>    
  
      <h2>Sort</h2>
      <select value={sort} onChange={event => setSort(event.target.value)}>
        <option value="">None</option>
        <option value="lowtohigh">High to Low</option>
        <option value="hightolow">Low to High</option>
      </select>
      </nav>
      
      {deals.map(deal => (

        <div className='deals' key={deal.dealID}>
          <h2>{deal.title}</h2>

          <img src={deal.thumb} alt={deal.title} />
            <h3>sale Price</h3>

          <p>{deal.salePrice}</p>

            <h3>Normal Price</h3>
        <p>{deal.normalPrice}</p>

        </div>
      ))}     
    </div>

  );
}


export default Choosers
