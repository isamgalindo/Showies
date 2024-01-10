import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GenreFilter from '../GenreFilter';
import { IntlProvider, createIntl } from 'react-intl';
import localeEnMessages from "../../locales/en.json";
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

let selectedGenre = '';
const onGenreChange = (value) => {
  selectedGenre = value;
};

describe('GenreFilter', () => {
  it('renders the GenreFilter component', () => {

    render(
        <IntlProvider locale="en" messages={localeEnMessages}>
            <GenreFilter watching={watching} selectedGenre={selectedGenre} onGenreChange={onGenreChange} genres={mockGenres} userLocale={"en"}/>
        </IntlProvider>
    );

    expect(screen.getByTestId('genrefilter-container')).toBeInTheDocument();
    expect(screen.getByTestId('genrefilter-select').value).toBe('');
    mockGenres.forEach((item) => {
      expect(screen.getByText(item.nameEN)).toBeInTheDocument();
    });
  });

  it('handles genre selection', () => {

    render(
        <IntlProvider locale="en" messages={localeEnMessages}>
            <GenreFilter watching={watching} selectedGenre={selectedGenre} onGenreChange={onGenreChange} genres={mockGenres} userLocale={"en"}/>
        </IntlProvider>
    );

    fireEvent.change(screen.getByTestId('genrefilter-select'), { target: { value: 'Drama' } });

    expect(selectedGenre).toBe('Drama');
  });
});
