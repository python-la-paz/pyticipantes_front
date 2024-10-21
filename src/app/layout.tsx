import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from "next";
import theme from '../theme';
import "./globals.css";
import { Providers } from './providers';
import RecoidContextProvider from "./recoilContextProvider";
import ClientLayout from "./clientLayout";

export const metadata: Metadata = {
    title: "Users - Python La Paz",
    description: "Bienvenidos a la comunidad de Pythonistas de La Paz, Bolivia",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body>
                <Providers>
                    <RecoidContextProvider>
                        <AppRouterCacheProvider>
                            <ThemeProvider theme={theme}>
                                <ClientLayout>{children}</ClientLayout>
                            </ThemeProvider>
                        </AppRouterCacheProvider>
                    </RecoidContextProvider>
                </Providers>
            </body>
        </html>
    );
}