import React, { useState } from 'react';
import Switch from 'react';

const themeLight = createTheme({
  palette: {
    background: {
      default: '#FFFFFF',
    },
    primary: { main: '#ff4400' },
    secondary: {
      background: '#0ffc03',
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
  },
});

const themeDark = createTheme({
  palette: {
    background: {
      default: '#000000',
    },
    primary: { main: '#180830' },
    secondary: {
      background: '#09050f',
      light: '#0066ff',
      main: '#05102e',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    typography: {
      allVariants: {
        color: 'pink'
      },
    },
  },
});

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState < boolean > (true);

  return (
    <Switch
      className='dark-mode-toggle'
      checked={isDark}
      onChange={({target}) => setIsDark(target.checked)}
      icons={{checked: '🌙', unchecked: '🔆'}}
      aria-label='Dark mode toggle'
    />

  );
};

export default ThemeSwitcher;