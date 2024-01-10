/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import LanguageSelector from '../LanguageSelector';

describe('LanguageSelector Component', () => {

  let userLocale = 'en';

  const setUserLocale = (newLocale) => {
    userLocale = newLocale;
  };

  it('should render the component with all elements', async () => {
    await act(async () => { 
      render(
        <LanguageSelector userLocale={userLocale} setUserLocale={setUserLocale} />
      );
    });
    
    const dropdownToggle = screen.getByText('English');
    expect(dropdownToggle).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('English'));
    });

    expect(screen.getAllByText('English')[0]).toBeInTheDocument();
    expect(screen.getByText('Français')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();

    const dropdownItems = screen.getAllByRole('button');
    expect(dropdownItems.length).toBe(4);
  });

  it('should change the language when a different option is selected', async () => {
    await act(async () => { 
      render(
        <LanguageSelector userLocale={userLocale} setUserLocale={setUserLocale} />
      );
    });
    
    await act(async () => {
      fireEvent.click(screen.getByText('English'));
    });
    const dropdownItems = screen.getAllByRole('button');

    await act(async () => {
      fireEvent.click(dropdownItems[2]);
    });
    expect(userLocale).toEqual('fr');
  });
});
