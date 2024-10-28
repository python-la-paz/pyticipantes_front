'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        rose: Palette['primary'];
    }
    interface PaletteOptions {
        rose?: PaletteOptions['primary'];
    }
}

const theme = createTheme({
    // typography: {
    //     // fontFamily: 'var(--font-roboto)',
    // },
    palette: {
        primary: {
            main: '#608939',
            light: '#FF9C8D',
        },
        secondary: {
            main: '#C65D60',
            light: '#A6CD66',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#ffffff',
        },
        rose: {
            main: '#FF9C8D',
        },
    },
    typography: {
        fontFamily: "'Montserrat Alternates', sans-serif", // Fuente sans serif personalizada
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