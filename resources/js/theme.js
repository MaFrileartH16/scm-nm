import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    neutral: [
      '#0a0a0a',
      '#1d1d1d',
      '#313131',
      '#454545',
      '#585858',
      '#6c6c6c',
      '#808080',
      '#939393',
      '#a7a7a7',
      '#bababa',
      '#cecece',
      '#e2e2e2',
      '#f5f5f5',
    ],
  },
  fontFamily: 'Lexend Deca, sans-serif',
  primaryColor: 'red',
  headings: {
    sizes: {
      h1: { fontSize: '44px' },
      h2: { fontSize: '34px' },
      h3: { fontSize: '26px' },
      h4: { fontSize: '20px' },
      h5: { fontSize: '16px' },
      h6: { fontSize: '14px' },
    },
  },
  white: '#f5f5f5',
  black: '#0a0a0a',
  // primaryShade: { light: 5, dark: 7 },
  autoContrast: true,
  radius: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
  },
  defaultRadius: 'md',
});
