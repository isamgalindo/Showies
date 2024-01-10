import React from 'react';
import '../CSS-files/ShowList.css';
import GenreFilter from './GenreFilter';
import SearchBar from './SearchBar';
import { useState, Suspense, useRef } from 'react';
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import OrderBy from './OrderBy';
import { FormattedMessage, useIntl } from 'react-intl';

const ShowList = (props) => {
  const { genres, shows, watching, userLocale } = props;

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedOrderFx, setSelectedOrderFx] = useState(()=>(a, b) => parseDate(a.lastSeen) < parseDate(b.lastSeen) ? 1 : -1);
  const [selectedName, setSelectedName] = useState("");

  function parseDate(dateString) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; 
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null; 
  }
  
  const intl = useIntl();
  const SL_poster_alt = intl.formatMessage({ id: "SL-poster-alt" });
  const SL_season_letter = intl.formatMessage({ id: "SL-season-letter" });
  const SL_episode_letter = intl.formatMessage({ id: "SL-episode-letter" });

  const handleOrderChange = (order) => {
    setSelectedOrder(order);
    
    if(order===intl.formatMessage({ id: "OB-name" })) {
      setSelectedOrderFx(()=>(a, b) => shows.find((s) => s.id === a.showId).name.toLowerCase() > shows.find((s) => s.id === b.showId).name.toLowerCase() ? 1 : -1);
    }
    else if (order==="" || order===intl.formatMessage({ id: "OB-date" })){
      setSelectedOrderFx(()=>(a, b) => parseDate(a.lastSeen) < parseDate(b.lastSeen) ? 1 : -1);
    }
  }
  
  const scrollableContainerRef = useRef(null);

  const scroll = (howMuch) => {
    const container = scrollableContainerRef.current;
    if (container) {
      container.scrollBy({
        left: howMuch, 
        behavior: 'smooth', 
      });
    }
  };

  const handleNameChange = (name) => {
    setSelectedName(name);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const filterWatching = () => {
    if(selectedName !== "" || selectedGenre !== ""){
      return watching.filter((w) => {
        let show = shows.find((s) => s.id === w.showId);
        let nameMatch = true;
        let genreMatch = true;
        if (selectedName !== "") {
          nameMatch = show.name.toLowerCase().includes(selectedName.toLowerCase());
        }
        if (selectedGenre !== ""){
          genreMatch = show.genres.some(genre => genre['name'+userLocale.toUpperCase()] === selectedGenre);
        }
        return nameMatch && genreMatch;
      }).sort(selectedOrderFx);
    }
    else{
      return watching.sort(selectedOrderFx);
    }
    
  }
  
  const filteredWatching = filterWatching();

  return (
    <div className="SL-container">
      <h2 className="SL-your-shows"><FormattedMessage id="SL-your-shows"/></h2>
      <div className="SL-sort-filter-search">
        <div className="SL-filter-sort">
          <div className="SL-filter"><GenreFilter selectedGenre={selectedGenre} onGenreChange={handleGenreChange} genres={genres} watching={watching} userLocale={userLocale}/></div>
          <div><OrderBy selectedOrder={selectedOrder} onOrderChange={handleOrderChange} watching={watching}/></div>
        </div>
        <div className="SL-search-bar"> <SearchBar handleNameChange={handleNameChange}/> </div>
      </div>

      <div className="SL-shows" ref={scrollableContainerRef}>
        <div className="SL-arrows" onClick={()=>scroll(-500)}><TfiArrowCircleLeft className="SL-left-arrow"/></div> 
        <div className="SL-show-cards">
          <Suspense fallback={<div className="SL-lazy"> <FormattedMessage id="SL-lazy"/></div>}>
            {filteredWatching.map((watching) => (
              <Link data-testid="show" key={watching.showId} className="SL-item" to={`/show/${watching.showId}`} onClick={() => {handleOrderChange("");}}>
                <img src={shows.find((s) => s.id === watching.showId).poster} className="SL-poster" alt={SL_poster_alt} />
                <div className="SL-name">{shows.find((s) => s.id === watching.showId).name}</div>
                <div className="SL-progress">{`${SL_season_letter}${watching.season}${SL_episode_letter}${watching.episode}`}</div>
              </Link>
            ))}
            </Suspense>
        </div>
        <div className="SL-arrows" onClick={()=>scroll(500)}><TfiArrowCircleRight className="SL-right-arrow"/></div>
      </div>
    </div>
  );
}

export default ShowList;