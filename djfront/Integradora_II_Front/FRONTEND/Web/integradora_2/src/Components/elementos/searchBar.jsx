import React, { useState, useEffect } from 'react';

const SearchBar = ({ placeholder = 'Buscar', value = '', onChange, onSearch, debounceTime = 300 }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) onSearch(inputValue);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [inputValue, onSearch, debounceTime]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className="search-bar" >
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      <img src="busqueda.png" alt="Search" className="search-icon" onClick={() => onSearch && onSearch(inputValue)} />
    </div>
  );
};

export default SearchBar;