"use client"
import { Container } from '@mui/material';
import { useRecoilValueLoadable } from 'recoil';
import { eventsQuery } from '@/atoms/selectors.event';
import { EventProps } from '@/const';
import styles from "@/app/page.module.css";
import EventItem from './components/event.item';
import { Box, Grid2 } from '@mui/material';
import { useEffect, useState } from 'react';
function EventList() {
    const events = useRecoilValueLoadable(eventsQuery);
    if (events.state === 'loading') {
        return <p>Loading...</p>; // No renderizar la lista hasta que los datos estén cargados
    }
    if (events.state === 'hasError') {
        return <p>Error: {events.contents}</p>; // Mostrar un mensaje de error si algo salió mal
    }
    const data = events.contents.content;
    return (
        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {data.map((event: EventProps) => (
                <Grid2 size={{ xs: 4, sm: 4, md: 4 }} key={event._id}>
                    <Box sx={{ alignItems: "center", alignContent: "center" }} >
                        <EventItem key={event._id} {...event} />
                    </Box>
                </Grid2>
            ))}
        </Grid2>
    );
}
export default function Page() {
    const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        const handleResize = () => {
        setScreenWidth(window.innerWidth);
        };

        if (typeof window !== 'undefined') {
            setScreenWidth(window.innerWidth); // Establecer el ancho inicial
            window.addEventListener('resize', handleResize);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    });
    if (screenWidth === undefined) {
        return null; // O puedes mostrar un cargando
    }
    return (
        <Container sx={{ padding: "1rem" }}>
            <img
                src="/img/fondo_recortado.png"
                alt="Descripción del ícono"
                className={styles.backgroundImage}
                style={{
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top center',
                    backgroundSize: 'contain',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: "auto",
                    boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)',
                    zIndex: "-1"
                }}
            />
            <Box
                sx={{
                    backgroundSize: 'contain',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    {screenWidth >= 800 ? ( 
                        <img
                            src="/icons/logo_blanco.svg"
                            alt="Descripción del ícono"
                            style={{ width: '8vw', height: '8vw', paddingTop:"2rem"}}
                        />
                    ):(<></>)
                    }
                    <Box
                        sx={{
                            fontFamily: "'Montserrat Alternates', sans-serif",
                            fontSize: {
                                xs: "18px",
                                md: "22px"
                            },
                            color: "white",
                            paddingTop: {
                                xs: "5px",
                                md: "60px"
                            },
                            fontWeight: "lighter"
                        }}
                    >
                        Comunidad Python La Paz
                    </Box>
                    <Box
                        sx={{
                            fontFamily: "'Montserrat Alternates', sans-serif",
                            fontSize: {
                                xs: '24px',
                                md: '48px'
                            },
                            color: "white",
                            paddingTop: {
                                xs: "5px",
                                md: "20px"
                            },
                            paddingBottom: "60px",
                            alignItems: "center",
                            textAlign: "center"
                        }}
                    >
                        ¡Bienvenido Pythonista!
                    </Box>
                </Box>
            </Box>
            <EventList />
        </Container>
    )

}