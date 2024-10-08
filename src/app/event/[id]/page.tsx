"use client"
import { eventQuery, eventRegisterQuery } from "@/atoms/selectors.event";
import { EventRegisterProps } from "@/const";
import { routes } from "@/lib/urls";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";

export default function Page({ params }: { params: { id: string } }) {
    const { data: session, status } = useSession();
    const eventLoadable = useRecoilValueLoadable(eventQuery(params.id));
    const registrationLoadable = useRecoilValueLoadable(eventRegisterQuery({ id: params.id }));
    const [registers, setRegisters] = useState<EventRegisterProps[]>([]);
    const [registersNoRejected, setRegistersNoRejected] = useState<EventRegisterProps[]>([]);
    useEffect(() => {
        if (status === "authenticated") {
            if (registrationLoadable.state === "hasValue") {
                setRegisters(registrationLoadable.contents.content);
                setRegistersNoRejected(registrationLoadable.contents.content.filter((register: EventRegisterProps) => register.status !== "rejected"));
            }
        }
    }, [status, registrationLoadable]);
    if (eventLoadable.state === "loading") {
        return <p>Loading...</p>;
    }
    if (eventLoadable.state === "hasError") {
        return <p>Error: {eventLoadable.contents}</p>;
    }
    const event = eventLoadable.contents.content;
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><h1>{event._id}</h1></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.title}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.description}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.date.toString()}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.location}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.location_map}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.image}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.document}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.document_type}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.link}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.link_text}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.public}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.quota}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.price}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.currency}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.finished}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.tags}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.organizers}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.additional_info}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.document_required}</p></Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}><p>{event.automatic}</p></Grid>
            {!session ? (
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    <Link href={routes.login}>
                        <Button variant="contained" color="primary">Iniciar Sesión</Button>
                    </Link>
                </Grid>
            ) : (
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    <Link href={routes.login}>
                        <Button  disabled={registersNoRejected.length > 0}
                        variant="contained" color="primary">
                            {registersNoRejected.length > 0 ? "Ya está registrado" : "Registrarse" }
                        </Button>
                    </Link>
                </Grid>
            )}
            <ul>
                {registers.map((register: EventRegisterProps) => (
                    <li key={register._id}>
                        <p>{register.event}</p>
                        <p>{register.user}</p>
                        <p>{register.date.toString()}</p>
                        <p>{register.seat}</p>
                        <p>{register.status}</p>
                        <p>{register.note}</p>
                        <p>{register.document_upload}</p>
                        <p>{register.additional_info}</p>
                    </li>
                ))}
            </ul>


        </Grid>
    );
}