/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import { IntlProvider, createIntl } from 'react-intl';
import localeEnMessages from "../../locales/en.json";
import Login from "../Login";
import { BrowserRouter } from 'react-router-dom';

const createTestIntl = () => {
    const intl = createIntl({ locale: 'en', messages: localeEnMessages });
    return intl;
};
  
jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: createTestIntl,
}));

let loggedIn = false;
const setLoggedIn = (value) => {
    loggedIn = value;
  };


describe('Login', () => {
    it('renders the Login component', () => {
  
      render(
        <BrowserRouter> 
          <IntlProvider locale="en" messages={localeEnMessages}>
              <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </IntlProvider>
        </BrowserRouter> 
      );
  
      expect(screen.getByTestId('login-container')).toBeInTheDocument();
    });
});