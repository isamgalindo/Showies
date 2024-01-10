import React, { useState } from 'react';
import '../CSS-files/SearchBar.css';
import { useIntl } from "react-intl";
import { FaMagnifyingGlass } from 'react-icons/fa6';

function SearchBar({ handleNameChange }) {
  const [inputValue, setInputValue] = useState('');

  const onNameChange = (event) => {
    setInputValue(event.target.value);
    handleNameChange(event.target.value);
  };

  const intl = useIntl();
  const placeholder = intl.formatMessage({ id: "SB-search-bar-placeholder" })

  return (
    <div className="search-container">
      <input
        data-testid="search-input"
        className="SB-input"
        onChange={(event) => onNameChange(event)}
        type="text"
        placeholder={placeholder}
        value={inputValue} 
        style={{width:"35vmin", height:"5.5vmin"}}
      />
      <div className='SB-magnifying'><FaMagnifyingGlass/></div>
    </div>
  );
}

export default SearchBar;
