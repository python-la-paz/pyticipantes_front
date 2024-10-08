"use client"
import { Container } from '@mui/material';
import { useRecoilValueLoadable } from 'recoil';
import { eventsQuery } from '@/atoms/selectors.event';
import { EventProps } from '@/const';
import styles from "@/app/page.module.css";
import EventItem from './components/event.item';
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
            <EventList />
        </Container>
    )

}