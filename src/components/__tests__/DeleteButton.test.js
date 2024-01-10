/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen } from '@testing-library/react';
//import { fireEvent } from '@testing-library/react';
import DeleteButton from '../DeleteButton';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, createIntl } from 'react-intl';
import localeEnMessages from "../../locales/en.json";
//import { act } from "react-dom/test-utils";

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
    showId: 1,
  }),
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

test('should render the component with all elements', () => {
  
  const setWatching = jest.fn();

  render(
      <BrowserRouter> 
        <IntlProvider locale="en" messages={localeEnMessages}>
          <DeleteButton watching={watching} setWatching={setWatching} id={"ed597572-506e-4316-ad6a-7d406632714a"}/>
        </IntlProvider>
      </BrowserRouter>
    );

  const deleteText = screen.getByText("Delete");

  expect(deleteText).toBeInTheDocument();
  expect(screen.getByTestId("trash-icon")).toBeInTheDocument();

});

// test('should delete show when clicked on text delete', async () => {

//   const setWatching = jest.fn();
    
//   await act(async () => {    
//     render(
//       <BrowserRouter> 
//         <IntlProvider locale="en" messages={localeEnMessages}>
//           <DeleteButton watching={watching} setWatching={setWatching} id={"ed597572-506e-4316-ad6a-7d406632714a"}/>
//         </IntlProvider>
//       </BrowserRouter>
//     );
//   })

//   const deleteText = screen.getByText("Delete");
//   fireEvent.click(deleteText);
//   fireEvent.click(screen.getByText("Yes"));
//   expect(setWatching).toHaveBeenCalledTimes(1);

// });

// test('should delete show when clicked on trash icon', async () => {

//   const setWatching = jest.fn();

//   await act(async () => {    
//     render(
//       <BrowserRouter> 
//         <IntlProvider locale="en" messages={localeEnMessages}>
//           <DeleteButton watching={watching} setWatching={setWatching} id={"ed597572-506e-4316-ad6a-7d406632714a"}/>
//         </IntlProvider>
//       </BrowserRouter>
//     );
//   })

//   fireEvent.click(screen.getByTestId("trash-icon"));
//   fireEvent.click(screen.getByText("Yes"));
//   expect(setWatching).toHaveBeenCalledTimes(1);

// });