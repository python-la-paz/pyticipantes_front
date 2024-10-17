"use client"
import { Container } from '@mui/material';
import { useRecoilValueLoadable } from 'recoil';
import { eventsQuery } from '@/atoms/selectors.event';
import { EventProps } from '@/const';
import styles from "@/app/page.module.css";
import EventItem from './components/event.item';
import { Box, Typography } from '@mui/material';
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
        <div className={styles.itemList}>
            {data.map((event: EventProps) => (
                <EventItem key={event._id} {...event} />
            ))}
        </div>
    );
}
export default function Page() {
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
                    paddingTop: {
                        xs: "20px",
                        md: "60px"
                    }
                }}>
                    <img
                        src="/icons/logo_blanco.svg"
                        alt="Descripción del ícono"
                        style={{ width: '8vw', height: '8vw' }}
                    />
                    <Box
                        sx={{
                            fontSize: {
                                xs: "16px",
                                md: "24px"
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
                            fontSize: {
                                xs: '20px',
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