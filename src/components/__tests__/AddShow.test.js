/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, createIntl } from 'react-intl';
import localeEnMessages from "../../locales/en.json";
import Home from "../Home";
import { act } from "react-dom/test-utils";
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

jest.mock('react-select', () => ({ options, value, onChange }) => {
      
    function handleChange(event) {
        const selectedOption = options.find(
          (option) => option.value === event.currentTarget.value
        );
        onChange(selectedOption);
      }

    return (
        <select data-testid="show-name" value={value} onChange={handleChange}>
            {options.map(({ label, value }) => (
                <option key={value} value={value}> {label}</option>
            ))}
         </select>
    );
});

const watching = [];
const user = {
    id: "83a5bc1c-1e76-41d9-8bef-8c92d5b52185",
    name: "Laura Restrepo",
    email: "l.restrepop@uniandes.edu.co",
    password: "Tommy2013",
    watching: []
};
const onChangeMock = jest.fn();

test('Add show' , async() =>  {

    const setWatching = jest.fn();
    
    await act(async () => {  
        render(
        <BrowserRouter>
            <IntlProvider locale="en" messages={localeEnMessages}>
                <Home genres={mockGenres} watching = {watching} setWatching = {setWatching} loggedIn={true} 
                user={user} shows={mockShows} onChange={onChangeMock} userLocale={"en"}>
                </Home>
            </IntlProvider>
        </BrowserRouter>   
        );
    })
    const addShowHomeButton = screen.getByTestId("add-show-home");
    fireEvent.click(addShowHomeButton);

    const show = screen.getByTestId("show-name");
    fireEvent.change(show, { target: { value: "ed597572-506e-4316-ad6a-7d406632714a" } });

    const season = screen.getByTestId("show-season");
    fireEvent.change(season, { target: { value: 2 } });
    
    const episode = screen.getByTestId("show-episode");
    fireEvent.change(episode, { target: { value: 17 } });

    const addShowButton = screen.getByTestId("add-show");
    fireEvent.click(addShowButton);

    const updatedWatching = [
        {
            userId: user.id,
            showId: "ed597572-506e-4316-ad6a-7d406632714a",
            season: Number(season.value), 
            episode: Number(episode.value),
            lastSeen: new Date().toLocaleDateString()
        }, ...watching
    ];
    
    expect(setWatching).toHaveBeenCalledWith(updatedWatching);
});