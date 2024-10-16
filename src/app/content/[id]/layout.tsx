import { Container } from "@mui/material"
import Box from "@mui/material/Box"
import Head from "next/head"

export default async function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Content</title>
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