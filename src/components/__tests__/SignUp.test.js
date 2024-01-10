/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';

import { IntlProvider, createIntl } from 'react-intl';
import localeEnMessages from "../../locales/en.json";
import SignUp from "../SignUp";

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

describe('SignUp', () => {
    it('renders the Signup component', () => {
  
      render(
        <BrowserRouter> 
          <IntlProvider locale="en" messages={localeEnMessages}>
              <SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </IntlProvider>
        </BrowserRouter> 
      );
  
      expect(screen.getByTestId('signUp-container')).toBeInTheDocument();
    });
});