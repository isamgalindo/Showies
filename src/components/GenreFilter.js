import React from 'react';
import '../CSS-files/GenreFilter.css';
import Form from 'react-bootstrap/Form';
import { FormattedMessage } from 'react-intl';

function GenreFilter({ selectedGenre, onGenreChange, genres, userLocale }) {
  const generos = [];

  genres.forEach((item) => {
    generos.push(item["name"+userLocale.toUpperCase()]); 
  });

  generos.sort();

  return (
    <div className="genre-filter-container" data-testid="genrefilter-container">
      <div style={{ whiteSpace: 'nowrap' }}><FormattedMessage id="GF-filter"/>:&nbsp;</div>
      <Form.Select
        className="form-control"
        value={selectedGenre}
        data-testid="genrefilter-select"
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <option value=""><FormattedMessage id="GF-default"/></option>
        {generos.map((genero, index) => (
          <option key={index} value={genero}>
            {genero}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default GenreFilter;