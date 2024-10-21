'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    // typography: {
    //     // fontFamily: 'var(--font-roboto)',
    // },
    palette: {
        primary: {
            main: '#608939',
        },
        secondary: {
            main: '#C65D60',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#ffffff',
        },

    },
    typography: {
        fontFamily: '"Poppins", sans-serif', // Fuente sans serif personalizada
        h1: {
          fontSize: '90px',
          fontWeight: 700,
          color: '#363030',
        },
        h2: {
          fontSize: '60px',
          fontWeight: 600,
          color: '#363030',
        },
        h3: {
            fontSize: '48px',
            fontWeight: 600,
            color: '#363030',
          },
        h4: {
            fontSize: '34px',
            fontWeight: 600,
            color: '#363030',
          },
        h5: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#363030',
          },
        h6: {
            fontSize: '20px',
            fontWeight: 600,
            color: '#363030',
          },
        body1: {
          fontSize: '16px',
          color: '#363030',
        },
        body2: {
          fontSize: '14px',
          color: '#363030',
        }
      },
});

export default theme;