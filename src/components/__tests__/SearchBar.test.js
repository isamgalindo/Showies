import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, createIntl } from 'react-intl';
import localeEnMessages from "../../locales/en.json";
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

test('Search' , () =>  {
    
  render(
    <BrowserRouter>
      <IntlProvider locale="en" messages={localeEnMessages}>
      <ShowList watching={watching} shows={mockShows} genres={mockGenres} userLocale={"en"}/>
      </IntlProvider>
    </BrowserRouter>   
  );
        
  const inputField = screen.getByTestId("search-input");
  fireEvent.change(inputField, { target: { value: "Jujutsu Kaisen" } });

  expect(screen.queryAllByTestId("show")).toHaveLength(1);
  expect(screen.getByTestId("show")).toHaveTextContent("Jujutsu Kaisen");
});