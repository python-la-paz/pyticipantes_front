'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    // typography: {
    //     // fontFamily: 'var(--font-roboto)',
    // },
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#ffffff',
        },
    },
});

export default theme;