/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, createIntl } from 'react-intl';
import localeEnMessages from "../../locales/en.json";
import OrderBy from "../OrderBy";
import ShowList from "../ShowList";
import mockShows from '../../mock-back/shows.json';
import mockGenres from '../../mock-back/genres.json';

const createTestIntl = () => {
    const intl = createIntl({ locale: 'en', messages: localeEnMessages });
    return intl;
};
  
jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: createTestIntl,
}));

const watching = [
  {
      userId: "83a5bc1c-1e76-41d9-8bef-8c92d5b52185",
      showId: "ed597572-506e-4316-ad6a-7d406632714a",
      season: 2,
      episode: 17,
      lastSeen: "16/11/2023"
  },
  {
      userId: "83a5bc1c-1e76-41d9-8bef-8c92d5b52185",
      showId: "63830d72-6189-4653-9a87-deb775469726",
      season: 4,
      episode: 30,
      lastSeen: "15/11/2023"
  }
];

let selectedOrder = '';
const handleOrderChange = (value) => {
  selectedOrder = value;
};

function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
     if (arr[i] < arr[i - 1]) {
       return false;
     }
    }
   return true;
  };

describe('OrderBy', () => {
  it('renders the OrderBy component', () => {

    render(
        <IntlProvider locale="en" messages={localeEnMessages}>
              <OrderBy selectedOrder={selectedOrder} onOrderChange={handleOrderChange} watching={watching}/> 
        </IntlProvider>
    );

    expect(screen.getByTestId('orderBy-container')).toBeInTheDocument();
    expect(screen.getByTestId('orderBy-select').value).toBe('');
  });

  it('handles order selection', () => {

    render(
        <IntlProvider locale="en" messages={localeEnMessages}>
            <OrderBy selectedOrder={selectedOrder} onOrderChange={handleOrderChange} watching={watching}/>
        </IntlProvider>
    );

    fireEvent.change(screen.getByTestId('orderBy-select'), { target: { value: 'Name' } });

    expect(selectedOrder).toBe('Name');
  });

  it('orders by name', () => {
    render(
        <BrowserRouter> 
          <IntlProvider locale="en" messages={localeEnMessages}>
            <ShowList watching={watching} shows={mockShows} genres={mockGenres} userLocale={"en"}/>
          </IntlProvider>
        </BrowserRouter>
      );
    
    fireEvent.change(screen.getByTestId('orderBy-select'), { target: { value: 'Name' } });
    
    const showElements = screen.getAllByTestId('show');
    const showNames = showElements.map((element) => element.querySelector('.SL-name').textContent);
    expect(isSorted(showNames)).toBe(true);
    });

  it('orders by date', () => {
      render(
          <BrowserRouter> 
            <IntlProvider locale="en" messages={localeEnMessages}>
              <ShowList watching={watching} shows={mockShows} genres={mockGenres} userLocale={"en"}/>
            </IntlProvider>
          </BrowserRouter>
      );

      fireEvent.change(screen.getByTestId('orderBy-select'), { target: { value: 'Date' } });

      const sortedShows = watching.slice().sort((a, b) => new Date(a.lastSeen) - new Date(b.lastSeen));
      const sortedShowNames = sortedShows.map((show) => (mockShows.find((s) => s.id === show.showId).name));
      
      const showElements = screen.getAllByTestId('show');
      const renderedShowNames = showElements.map((element) => element.querySelector('.SL-name').textContent);
      expect(renderedShowNames).toEqual(sortedShowNames);
      });
        
});