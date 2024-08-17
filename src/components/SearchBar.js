// src/components/SearchBar.js
import React from 'react';
import { InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ position: 'relative', marginRight: '16px' }}>
      
          <Search style={{ position: 'absolute', top: '50%', left: '8px', transform: 'translateY(-50%)'}} />
          
          <InputBase
          placeholder="Search…"
          style={{
            
            paddingLeft: '32px',
            width: '200px',
            backgroundColor: 'white',
            borderRadius: '4px',
            height: '36px',
            border: '1px solid #ccc' // Add this line for the border
          }}
          value={searchQuery}
        onChange={handleSearchChange}
        />
        </div>
  );
};

export default SearchBar;