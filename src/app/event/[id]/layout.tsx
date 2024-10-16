import { Box, Container } from "@mui/material";
import Head from "next/head";

export default async function EventLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Event</title>
                <meta name="description" content="Event" />
            </Head>
            <Container fixed>
                <Box sx={{
                    margin: 'auto', padding: '10px'
                }} >
                    {children }
                </Box>
            </Container>
        </>
    )
}