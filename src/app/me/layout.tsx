import { getCurrentUser } from "@/lib/session"
import { Container } from "@mui/material"
import Box from "@mui/material/Box"
import Head from "next/head"
import { notFound } from "next/navigation"

export default async function MeLayout({ children }: { children: React.ReactNode }) {
    const session = await getCurrentUser()
    if (!session) {
        return notFound()
    }
    return (
        <>
            <Head>
                <title>Mi Perfil</title>
                <meta name="description" content="Perfil de Usuario" />
            </Head>
            <Container fixed>
                <Box sx={{
                    height: '100vh',
                    margin: 'auto', padding: '10px'
                }} >
                    {children}
                </Box>
            </Container>
        </>
    )
}