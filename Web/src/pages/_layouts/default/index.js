import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import usePersistedState from '../../../util/usePersistedState';


import light from '../../../styles/themes/light';
import dark from '../../../styles/themes/dark';

import Header from '../../../components/Header';

import { Wrapper } from './styles';

export default function DefaultLayout({ children }) {
  const [theme, setTheme] = usePersistedState('theme', dark);

  const toogleTheme = () => {
    setTheme(theme.title === 'dark' ? light : dark);
  }

  return (
    <ThemeProvider theme={theme}>
    <Wrapper>
      <Header toogleTheme={toogleTheme} />
      {children}
    </Wrapper>
    </ThemeProvider>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
