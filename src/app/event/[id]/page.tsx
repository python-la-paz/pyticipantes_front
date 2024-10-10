"use client"
import FullScreenDialog from "@/app/components/dialog";
import { accessTokenState, userInfoSelector } from "@/atoms";
import { eventQuery, eventRegisterQuery } from "@/atoms/selectors.event";
import { EventRegisterProps } from "@/const";
import { registerEvent } from "@/lib/http/events";
import { routes } from "@/lib/urls";
import { PhotoCamera } from "@mui/icons-material";
import { Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";

export default function Page({ params }: { params: { id: string } }) {
    const [token] = useRecoilState(accessTokenState);
    const { enqueueSnackbar } = useSnackbar();
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState({ name: "" });
    const [additionalInfoResponses, setAdditionalInfoResponses] = useState<string[]>([]);
    const eventLoadable = useRecoilValueLoadable(eventQuery(params.id));
    const registrationLoadable = useRecoilValueLoadable(eventRegisterQuery({ id: params.id }));
    const refreshUserInfo = useSetRecoilState(userInfoSelector);
    const [registers, setRegisters] = useState<EventRegisterProps[]>([]);
    const [registersNoRejected, setRegistersNoRejected] = useState<EventRegisterProps[]>([]);
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (!file) {
            setSelectedFile({ name: "" });
            return;
        }
        setSelectedFile(file);
    };
    const handleAdditionalInfoChange = (event: any) => {
        const value = event.target.value;
        const index = event.target.id;
        setAdditionalInfoResponses((prev) => {
            prev[index] = value;
            return prev;
        });
    }
    const handleSave = () => {
        if (event.document_required && !selectedFile) {
            enqueueSnackbar("Se requiere subir un documento", { variant: "error" });
            return;
        }
        if (event.additional_info && event.additional_info.length > 0) {
            if (additionalInfoResponses.length !== event.additional_info.length) {
                enqueueSnackbar("Se requiere completar la información adicional", { variant: "error" });
                return;
            }
        }
        // save
        registerEvent(params.id, token, selectedFile, additionalInfoResponses).then((response) => {
            if (response.error) {
                enqueueSnackbar("Error al registrar", { variant: "error" });
                return;
            }
            enqueueSnackbar("Registrado", { variant: "success" });
            setOpen(false);
            refreshUserInfo((oldValue) => oldValue + 1);
            // reload data from server

        }).catch((error) => {
            enqueueSnackbar(`Error al registrar ${error}`, { variant: "error" });
        });
    }

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
        <>
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
                        <Button disabled={registersNoRejected.length > 0}
                            variant="contained" color="primary" onClick={() => setOpen(true)}>
                            {registersNoRejected.length > 0 ? "Ya está registrado" : "Registrarse"}
                        </Button>
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
                            <p>{register.document_upload?.url}</p>
                            <p>{register.additional_info}</p>
                        </li>
                    ))}
                </ul>
            </Grid>
            <FullScreenDialog props={{
                title: "Registro",
                open: open,
                closeFunction: () => setOpen(false),
                saveFunction: () => handleSave(),
                saveText: "Guardar"
            }}>
                <Container>
                    <Typography variant="h4">Registro</Typography>
                    <Grid container spacing={2} >
                        {event.document_required &&
                            (<Grid size={12}>
                                <Typography variant="h5">Subir documento requerido</Typography>
                                <Button color='secondary' variant='outlined' component="label" endIcon={<PhotoCamera />}>
                                    Seleccionar
                                    <input hidden accept="image/avif,image/gif,image/jpeg,image/png,image/web,image/svg,image/svg+xml,application/pdf,application/msword"
                                        type="file" onChange={handleFileChange} />
                                </Button>
                                <Typography>
                                    {selectedFile ? selectedFile.name : "No se ha seleccionado ninguna imagen"}
                                </Typography>
                            </Grid>)}
                        {event.additional_info && event.additional_info.length > 0 && (
                            <Grid size={12}>
                                <Typography variant="h5">Información adicional</Typography>
                            </Grid>
                        )}
                        {event.additional_info.map((info: string, index: number) => (
                            <Grid size={12} key={info}>
                                <Typography>{info}</Typography>
                                <TextField variant="outlined" fullWidth onChange={handleAdditionalInfoChange} id={index.toString()} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </FullScreenDialog>
        </>
    );
}