import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from "next";
// import { Roboto } from 'next/font/google';
import theme from '../theme';
import FooterBar from './components/footer';
import MenuAppBar from './components/nav';
import "./globals.css";
import { Providers } from './providers';
import RecoidContextProvider from "./recoilContextProvider";

export const metadata: Metadata = {
    title: "Users - Python La Paz",
    description: "Bienvenidos a la comunidad de Pythonistas de La Paz, Bolivia",
};

// const roboto = Roboto({
//     weight: ['300', '400', '500', '700'],
//     subsets: ['latin'],
//     display: 'swap',
//     variable: '--font-roboto',
// });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body >
                <Providers>
                    <RecoidContextProvider>
                        <AppRouterCacheProvider>
                            <ThemeProvider theme={theme}>
                                <MenuAppBar>
                                    {children}
                                </MenuAppBar>
                                <FooterBar />
                            </ThemeProvider>
                        </AppRouterCacheProvider>
                    </RecoidContextProvider>
                </Providers>
            </body>
        </html>
    );
}