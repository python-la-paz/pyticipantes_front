import { Container } from "@mui/material"
import Box from "@mui/material/Box"
import Head from "next/head"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Página de inicio de sesión" />
            </Head>
            <Box
                component="main"
                sx={{
                    width: '100%',
                    height: '100vh',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                }}
            >
                {children}
            </Box>
        </>
    )
}