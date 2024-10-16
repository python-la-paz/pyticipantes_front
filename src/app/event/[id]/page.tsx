"use client"
import FullScreenDialog from "@/app/components/dialog";
import EventRegisterItem from "@/app/components/event.register.item";
import { accessTokenState, userInfoSelector } from "@/atoms";
import { eventQuery, eventRegisterQuery } from "@/atoms/selectors.event";
import { EventRegisterProps } from "@/const";
import { registerEvent } from "@/lib/http/events";
import { routes } from "@/lib/urls";
import { PhotoCamera } from "@mui/icons-material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DescriptionIcon from '@mui/icons-material/Description';
import FaceIcon from '@mui/icons-material/Face';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import PublicIcon from '@mui/icons-material/Public';
import { Alert, Button, Chip, Container, Divider, List, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            setSelectedFile({ name: "" });
            return;
        }
        setSelectedFile(file);
    };
    const handleAdditionalInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const index = event.target.id;
        setAdditionalInfoResponses((prev) => {
            prev[parseInt(index)] = value;
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
                enqueueSnackbar(response.message, { variant: "error" });
                return;
            }
            enqueueSnackbar(response.message, { variant: "success" });
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
    const documentText = event.document_type ? event.document_type : "Documento";
    const linkText = event.link_text ? event.link_text : "Enlace";
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    <Typography variant="h4">{event.title}</Typography>
                    <Typography variant="caption">{event.finished ? "Finalizado" : "Activo"}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    <Typography variant="subtitle1">{event.description}</Typography>
                    <Typography variant="caption">{event.tags.join(", ")}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    <Stack direction="row" spacing={1}>
                        <Chip icon={<AccessTimeFilledIcon />} label={dayjs(event.date).format("DD/MM/YYYY")} variant="outlined" />
                        <Chip icon={<FaceIcon />} label={event.quota > 0 ? `Cupos: ${event.quota}` : `Cupos: Ilimitados`} color="primary" variant="outlined" />
                        <Chip icon={<PaidIcon />} label={event.price ? `${event.price} ${event.currency}` : "Gratuito"} color="secondary" variant="outlined" />
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    <Stack direction="row" spacing={1}>
                        {!event.location_map ? <Chip icon={<LocationOnIcon />} label={event.location} variant="outlined" />
                            : <Chip icon={<LocationOnIcon />} label={event.location} variant="filled" color="primary" onClick={() => window.open(event.location_map, '_blank')} />
                        }
                        {event.document && <Chip icon={<DescriptionIcon />} label={`${documentText.toUpperCase()}`} color="primary" variant="filled" onClick={() => window.open(event.document, '_blank')} />}
                        {event.link && <Chip icon={<PublicIcon />} label={linkText.toUpperCase()} variant="filled" color="primary" onClick={() => window.open(event.link, '_blank')} />}
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            icon={event.automatic ? <HourglassDisabledIcon /> : <HourglassTopIcon />}
                            label={event.automatic ? "Registro automático" : "Requiere confirmación"}
                            color={event.automatic ? "success" : "error"}
                            variant="outlined" />
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }} textAlign={"center"}>
                    {event.image ? <Image src={event.image?.url} alt={event.title} width={300} height={300} /> : null}
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    <Typography variant="subtitle1">{"Organizado por:"}</Typography>
                    <Typography variant="caption">{event.organizers.join(", ")}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    {
                        event.additional_info && event.additional_info.length > 0 && (
                            <Stack spacing={1}>
                                <Alert severity="info" variant="outlined" >Información adicional al registrarse</Alert>
                                {event.additional_info.map((info: string, index: number) => (
                                    <Typography key={info}>{index + 1}. {info}</Typography>
                                ))
                                }
                            </Stack>
                        )
                    }
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    {
                        event.document_required && (
                            <Alert severity="warning" variant="outlined">Se requiere subir un documento al momento de registrarse</Alert>
                        )
                    }
                </Grid>
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
                <Divider variant='inset' />
                {registersNoRejected.length > 0 && (
                    <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                        <Typography variant="h6">Registros realizados</Typography>
                    </Grid>
                )}
                <List sx={{ width: '100%' }}>
                    {registers.map((register: EventRegisterProps) => (
                        <>
                            <EventRegisterItem key={register._id} register={register} />
                            <Divider variant='inset' />
                        </>
                    ))}
                </List>
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