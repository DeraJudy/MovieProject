import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
      <div>
        <img src="search.png" alt="Search" />
        <input 
            type="text"
            placeholder='Search through thousands of movie' 
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  )
}

export default Search
