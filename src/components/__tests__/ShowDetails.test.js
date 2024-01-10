/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, createIntl } from 'react-intl';
import localeEnMessages from "../../locales/en.json";
import ShowDetails from "../ShowDetails";
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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    showId: "ed597572-506e-4316-ad6a-7d406632714a",
  }),
}));
  
const watching = [
  {
      userId: "83a5bc1c-1e76-41d9-8bef-8c92d5b52185",
      showId: "ed597572-506e-4316-ad6a-7d406632714a",
      season: 2,
      episode: 17,
      lastSeen: "16/11/2023"
  }
];

test('1 - Increase season number', async() => {

  const setWatching = jest.fn();

  await act(async () => { 
    render(
      <BrowserRouter> 
        <IntlProvider locale="en" messages={localeEnMessages}>
          <ShowDetails watching={watching} setWatching={setWatching} shows={mockShows} genres={mockGenres} userLocale={"en"}/>
        </IntlProvider>
      </BrowserRouter>
    );
  });

  const seasonValueElement = screen.getByTestId("season-value");
  const seasonValue = seasonValueElement.textContent;
  const seasonNumber = parseInt(seasonValue, 10);
  const plusSeasonButton = screen.getByTestId("plus-season");
  fireEvent.click(plusSeasonButton);
  
  const updatedWatching = [
    {
      userId: "83a5bc1c-1e76-41d9-8bef-8c92d5b52185",
      showId: "ed597572-506e-4316-ad6a-7d406632714a",
      season: seasonNumber+1, //New value
      episode: 1, //New value
      lastSeen: new Date().toLocaleDateString()
    }
  ];

   expect(setWatching).toHaveBeenCalledWith(updatedWatching);
});

test('2 - Decrease season number', async() => {
  
  const setWatching = jest.fn();

  await act(async () => { 
    render(
      <BrowserRouter> 
        <IntlProvider locale="en" messages={localeEnMessages}>
          <ShowDetails  watching={watching} setWatching={setWatching} shows={mockShows} genres={mockGenres} userLocale={"en"}/>
        </IntlProvider>
      </BrowserRouter>
    );
  });
  
  const seasonValueElement = screen.getByTestId("season-value");
  const seasonValue = seasonValueElement.textContent;
  const seasonNumber = parseInt(seasonValue, 10);
    
  const minusSeasonButton = screen.getByTestId("minus-season");
  fireEvent.click(minusSeasonButton);
  
  const updatedWatching = [
    {
      userId: "83a5bc1c-1e76-41d9-8bef-8c92d5b52185",
      showId: "ed597572-506e-4316-ad6a-7d406632714a",
      season: seasonNumber-1, //New value
      episode: 1, //New value
      lastSeen: new Date().toLocaleDateString()
    }
  ];
  
  expect(setWatching).toHaveBeenCalledWith(updatedWatching);
});

// test('3 - Increase episode number', async() => {
  
//   const setWatching = jest.fn();
  
//   await act(async () => { 
//     render(
//       <BrowserRouter> 
//         <IntlProvider locale="en" messages={localeEnMessages}>
//           <ShowDetails watching={watching} setWatching={setWatching} shows={mockShows} genres={mockGenres} userLocale={"en"}/>
//         </IntlProvider>
//       </BrowserRouter>
//     );
//   });
  
//   const episodeValueElement = screen.getByTestId("episode-value");
//   const episodeValue = episodeValueElement.textContent;
//   const episodeNumber = parseInt(episodeValue, 10);
  
//   const plusEpisodeButton = screen.getByTestId("plus-episode");
//   fireEvent.click(plusEpisodeButton);
  
//   const updatedWatching = [
//     {
//       userId: "83a5bc1c-1e76-41d9-8bef-8c92d5b52185",
//       showId: "ed597572-506e-4316-ad6a-7d406632714a",
//       season: 2,
//       episode: episodeNumber+1, //New value
//       lastSeen: new Date().toLocaleDateString()
//     }
//   ];
  
//   expect(setWatching).toHaveBeenCalledWith(updatedWatching);
// });

// test('4 - Decrease episode number', async() => {
  
//   const setWatching = jest.fn();
  
//   await act(async () => { 
//     render(
//       <BrowserRouter> 
//         <IntlProvider locale="en" messages={localeEnMessages}>
//           <ShowDetails watching={watching} setWatching={setWatching} shows={mockShows} genres={mockGenres} userLocale={"en"}/>
//         </IntlProvider>
//       </BrowserRouter>
//     );
//   });
    
//   const episodeValueElement = screen.getByTestId("episode-value");
//   const episodeValue = episodeValueElement.textContent;
//   const episodeNumber = parseInt(episodeValue, 10);

//   const minusEpisodeButton = screen.getByTestId("minus-episode");
//   fireEvent.click(minusEpisodeButton);

//   const updatedWatching = [
//     {
//       userId: "83a5bc1c-1e76-41d9-8bef-8c92d5b52185",
//       showId: "ed597572-506e-4316-ad6a-7d406632714a",
//       season: 2,
//       episode: episodeNumber-1, //New value
//       lastSeen: new Date().toLocaleDateString()
//     }
//   ];
    
//   expect(setWatching).toHaveBeenCalledWith(updatedWatching);
// });

