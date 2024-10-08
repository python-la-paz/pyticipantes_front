import { getCurrentUser } from "@/lib/session";
import { Box, Container } from "@mui/material";
import Head from "next/head";

export default async function EventLayout({ children }: { children: React.ReactNode }) {
    const session = await getCurrentUser()
    return (
        <>
            <Head>
                <title>Event</title>
                <meta name="description" content="Event" />
            </Head>
            <Container fixed>
                <Box sx={{
                    height: '100vh',
                    margin: 'auto', padding: '10px'
                }} >
                    {children }
                </Box>
            </Container>
        </>
    )
}