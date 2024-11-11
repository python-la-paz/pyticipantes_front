"use client"
import FullScreenDialog from "@/app/components/dialog";
import EventRegisterItem from "@/app/components/event.register.item";
import { accessTokenState, userInfoSelector } from "@/atoms";
import { socialNetworkQuery } from "@/atoms/selectors";
import { activitiesQuery, activityRegisterQuery } from "@/atoms/selectors.activity";
import { eventQuery, eventRegisterQuery } from "@/atoms/selectors.event";
import { ActivityProps, ActivityRegisterProps, EventRegisterProps, SocialNetworkProps } from "@/const";
import { deleteRegisterActivity, registerActivity } from "@/lib/http/activities";
import { registerEvent } from "@/lib/http/events";
import { routes } from "@/lib/urls";
import { PhotoCamera } from "@mui/icons-material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BlockIcon from '@mui/icons-material/Block';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FaceIcon from '@mui/icons-material/Face';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import PublicIcon from '@mui/icons-material/Public';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Accordion, Alert, Box, Button, Chip, Container, Divider, FormControl, IconButton, InputLabel, List, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";

function ActivityList({ params, registersNoRejected, registersActivity, registersActivityNoRejected }: { params: { id: string }, registersNoRejected: EventRegisterProps[], registersActivity: ActivityRegisterProps[], registersActivityNoRejected: ActivityRegisterProps[] }) {
    const { enqueueSnackbar } = useSnackbar();
    const [token] = useRecoilState(accessTokenState);
    const { data: session, status } = useSession();
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
    const refreshUserInfo = useSetRecoilState(userInfoSelector);
    const handleExpandClick = (id: string, event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
        setExpandedAccordion((prev) => (prev === id ? null : id));
    };

    const handleButtonDirect = (activity: ActivityProps, is_delete: boolean = false) => {
        if (is_delete) {
            deleteRegisterActivity(activity._id, token).then((response) => {
                if (response.error) {
                    enqueueSnackbar(response.message, { variant: "error" });
                    return;
                }
                enqueueSnackbar(response.message, { variant: "success" });
                refreshUserInfo((oldValue) => oldValue + 1);
                // reload data from server

            }).catch((error) => {
                enqueueSnackbar(`Error al registrar ${error}`, { variant: "error" });
            });
            return;
        }
        registerActivity(activity._id, token, null, []).then((response) => {
            if (response.error) {
                enqueueSnackbar(response.message, { variant: "error" });
                return;
            }
            enqueueSnackbar(response.message, { variant: "success" });
            refreshUserInfo((oldValue) => oldValue + 1);
            // reload data from server

        }).catch((error) => {
            enqueueSnackbar(`Error al registrar ${error}`, { variant: "error" });
        });
    }
    const activities = useRecoilValueLoadable(activitiesQuery({ id: params.id }));
    if (activities.state === 'loading') {
        return <p>Loading...</p>; // No renderizar la lista hasta que los datos estén cargados
    }
    if (activities.state === 'hasError') {
        return <p>Error: {activities.contents}</p>; // Mostrar un mensaje de error si algo salió mal
    }
    const data = activities.contents.content;

    return (
        <>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{"Elige las actividades que te interesan"}</Typography>
            {
                data.map((activity: ActivityProps) => (
                    <Accordion
                        key={activity._id}
                        expanded={expandedAccordion === activity._id}
                        disableGutters
                        elevation={0}
                        sx={{
                            borderBottom: 'none',
                            '&:not(:last-child)': {
                                borderBottom: '1px solid green',
                            },
                        }}>
                        <AccordionSummary
                            aria-controls={`${activity._id}-content`}
                            id={`${activity._id}-header`}
                            expandIcon={
                                <ExpandMoreIcon
                                    sx={{
                                        borderRadius: '40px',
                                        border: '1px solid',
                                        pointerEvents: "auto"
                                    }}
                                    onClick={(event) => handleExpandClick(activity._id, event)}
                                />
                            }
                            sx={{
                                padding: '0px',
                                margin: '0px',
                                pointerEvents: "none"
                            }}>
                            <Stack direction="column">
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                    {activity.title}&nbsp;<Chip size="small" icon={<FaceIcon />} label={activity.quota > 0 ? `${activity.quota}` : `Ilimitados`} variant="outlined" />

                                </Typography>
                                <Typography variant="caption">
                                    {dayjs(activity.date).format("DD/MM/YYYY")}

                                </Typography>
                            </Stack>
                            {session && registersNoRejected.length > 0 &&
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: 'auto' }}>
                                    <IconButton onClick={() => handleButtonDirect(activity,
                                        (registersActivityNoRejected.length > 0 &&
                                            registersActivityNoRejected.find((register: ActivityRegisterProps) => register.activity === activity._id) !== undefined
                                        )
                                    )} sx={{ pointerEvents: "auto" }}
                                        disabled={activity.is_full}>
                                        {
                                            (registersActivityNoRejected.length > 0
                                                && registersActivityNoRejected.find((register: ActivityRegisterProps) => register.activity === activity._id) !== undefined
                                            ) ?
                                                <RemoveIcon color="secondary" fontSize="inherit" sx={{
                                                    borderRadius: '20px',
                                                    border: '1px solid',
                                                    '::hover': {
                                                        color: 'red',
                                                    }
                                                }} />
                                                :
                                                <>
                                                    {
                                                        activity.is_full ?
                                                            <BlockIcon fontSize="inherit" sx={{
                                                                borderRadius: '20px',
                                                                border: '1px solid',
                                                            }} />
                                                            :
                                                            <AddIcon color="primary" fontSize="inherit" sx={{
                                                                borderRadius: '20px',
                                                                border: '1px solid',
                                                                '::hover': {
                                                                    color: 'green',
                                                                }
                                                            }} />
                                                    }
                                                </>
                                        }
                                    </IconButton>
                                </div>
                            }
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack direction={{ xs: "column", md: "row" }}>
                                <Box sx={{ flex: 1, padding: 2 }} textAlign={"center"}>
                                    {activity.image ?
                                        <Image src={activity.image?.url} alt={activity.title} width={150} height={150} sizes="50vw"
                                            style={{
                                                width: '70%',
                                                height: 'auto',
                                            }} />
                                        : null}

                                </Box>
                                <Box sx={{ flex: 1, padding: 2 }}>
                                    <Stack direction="column" spacing={1} >
                                        <Typography>
                                            {activity.description}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                            <SupervisorAccountIcon color="primary" fontSize="inherit" /> {activity.organizers?.join(", ")}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                            <LocationOnIcon color="primary" fontSize="inherit" /> {activity.location}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                            {activity.link && <Chip size="small" icon={<PublicIcon />} label={activity.link_text || ""} variant="filled" color="primary" onClick={() => window.open(activity.link, '_blank')} />}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))}
        </>
    );
}

export default function Page({ params }: { params: { id: string } }) {
    const [token] = useRecoilState(accessTokenState);
    const { enqueueSnackbar } = useSnackbar();
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState({ name: "" });
    const [additionalInfoResponses, setAdditionalInfoResponses] = useState<string[]>([]);
    const eventLoadable = useRecoilValueLoadable(eventQuery(params.id));
    const registrationLoadable = useRecoilValueLoadable(eventRegisterQuery({ id: params.id }));
    const registrationActivityLoadable = useRecoilValueLoadable(activityRegisterQuery({ id: params.id }));
    const refreshUserInfo = useSetRecoilState(userInfoSelector);
    const [registers, setRegisters] = useState<EventRegisterProps[]>([]);
    const [registersNoRejected, setRegistersNoRejected] = useState<EventRegisterProps[]>([]);
    const [registersActivity, setRegistersActivity] = useState<ActivityRegisterProps[]>([]);
    const [registersActivityNoRejected, setRegistersActivityNoRejected] = useState<ActivityRegisterProps[]>([]);
    const socialNetworksLoadable = useRecoilValueLoadable(socialNetworkQuery);
    const [socialNetworks, setSocialNetworks] = useState<SocialNetworkProps[]>([]);
    const [actualSocialNetwork, setActualSocialNetwork] = useState<string>("");
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
    const handleSocialNetwork = (event: SelectChangeEvent) => {
        setActualSocialNetwork(event.target.value as string);
    };
    const handleSave = () => {
        if (event.document_required && (!selectedFile || selectedFile.name === "")) {
            enqueueSnackbar("Se requiere subir un documento", { variant: "error" });
            return;
        }
        if (event.additional_info && event.additional_info.length > 0) {
            if (additionalInfoResponses.length !== event.additional_info.length) {
                enqueueSnackbar("Se requiere completar las preguntas adicionales", { variant: "error" });
                return;
            }
        }
        if (actualSocialNetwork === "") {
            enqueueSnackbar("Seleccione una red social", { variant: "error" });
            return;
        }
        additionalInfoResponses.forEach((response, index) => {
            const trimmed = response.trim();
            if (trimmed === "") {
                enqueueSnackbar(`Por favor ingrese un valor en la pregunta ${index + 1}`, { variant: "error" });
                return;
            }
        });
        // save
        registerEvent(params.id, token, selectedFile, additionalInfoResponses, actualSocialNetwork).then((response) => {
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
    useEffect(() => {
        if (status === "authenticated") {
            if (registrationActivityLoadable.state === "hasValue") {
                setRegistersActivity(registrationActivityLoadable.contents.content);
                setRegistersActivityNoRejected(registrationActivityLoadable.contents.content.filter((register: ActivityRegisterProps) => register.status !== "rejected"));
            }
        }
    }, [status, registrationActivityLoadable]);
    useEffect(() => {
        if (socialNetworksLoadable.state === "hasValue") {
            setSocialNetworks(socialNetworksLoadable.contents.content);
        }
    }, [socialNetworksLoadable]);
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
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }} textAlign={"center"}>
                    {event.image ?
                        <Box sx={{
                            background: "url('/img/border.square.svg') no-repeat center",
                            backgroundSize: "contain",
                            borderRadius: "20px",
                            padding: "20px",
                        }}>
                            <Image src={event.image?.url} alt={event.title} width={350} height={350} sizes="100vw"
                                style={{
                                    width: '85%',
                                    height: 'auto',
                                }} />
                        </Box>
                        : null}
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
                    <Box >
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'medium' }}>{event.title}</Typography>
                                <Typography variant="caption">{event.finished ? "Finalizado" : "Activo"}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                                <Typography variant="body2">{event.description}</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 'light' }} >{event.tags.join(", ")}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                                <Stack direction="row" spacing={1} useFlexGap
                                    sx={{ flexWrap: 'wrap' }}>
                                    <Chip size="small" icon={<AccessTimeFilledIcon />} label={dayjs(event.date).format("DD/MM/YYYY")} variant="outlined" />
                                    <Chip size="small" icon={<FaceIcon />} label={event.quota > 0 ? `Cupos: ${event.quota}` : `Cupos: Ilimitados`} color="primary" variant="outlined" />
                                    <Chip size="small" icon={<PaidIcon />} label={event.price ? `${event.price} ${event.currency}` : "Gratuito"} color="secondary" variant="outlined" />
                                    {!event.location_map ? <Chip size="small" icon={<LocationOnIcon />} label={event.location} variant="outlined" />
                                        : <Chip size="small" icon={<LocationOnIcon />} label={event.location} variant="filled" color="primary" onClick={() => window.open(event.location_map, '_blank')} />
                                    }
                                    {event.document && <Chip size="small" icon={<DescriptionIcon />} label={`${documentText.toUpperCase()}`} color="primary" variant="filled" onClick={() => window.open(event.document, '_blank')} />}
                                    {event.link && <Chip size="small" icon={<PublicIcon />} label={linkText.toUpperCase()} variant="filled" color="primary" onClick={() => window.open(event.link, '_blank')} />}
                                    <Chip size="small"
                                        icon={event.automatic ? <HourglassDisabledIcon /> : <HourglassTopIcon />}
                                        label={event.automatic ? "Registro automático" : "Requiere confirmación"}
                                        color={event.automatic ? "success" : "error"}
                                        variant="outlined" />
                                </Stack>
                            </Grid>

                            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{"Organizado por:"}</Typography>
                                <Typography variant="caption">{event.organizers.join(", ")}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                                {
                                    event.additional_info && event.additional_info.length > 0 && (
                                        <Stack spacing={1}>
                                            <Alert severity="info" variant="outlined" >Preguntas adicionales</Alert>
                                            {event.additional_info.map((info: string, index: number) => (
                                                <Typography key={info} variant="overline"><b>{index + 1}.</b> {info}</Typography>
                                            ))
                                            }
                                        </Stack>
                                    )
                                }
                            </Grid>
                            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                                {
                                    event.document_required && (
                                        <Alert severity="warning" variant="outlined">Se requiere subir un documento al registrarse</Alert>
                                    )
                                }
                            </Grid>
                            {!session ? (
                                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                                    <Link href={routes.login}>
                                        <Button fullWidth sx={{ borderRadius: '16px' }} variant="contained" color="secondary">Iniciar Sesión y llena tu perfil</Button>
                                    </Link>
                                </Grid>
                            ) : (
                                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                                    <Button disabled={registersNoRejected.length > 0} fullWidth
                                        sx={{ borderRadius: '16px' }}
                                        variant="contained" color="primary" onClick={() => setOpen(true)}>
                                        {registersNoRejected.length > 0 ? "Ya está registrado" : "¡Regístrate ahora!"}
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                    <ActivityList params={params} registersNoRejected={registersNoRejected} registersActivity={registersActivity} registersActivityNoRejected={registersActivityNoRejected} />
                </Grid>
                <Divider variant='inset' />
                {registers.length > 0 && (
                    <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Historial de registros</Typography>
                    </Grid>
                )}
                <List sx={{ width: '100%' }}>
                    {registers.length > 0 && registers.map((register: EventRegisterProps) => (
                        <>
                            <EventRegisterItem key={register._id} register={register} />
                            <Divider
                                sx={{
                                    "&::before, &::after": {
                                        borderColor: "primary",
                                    },
                                }}
                                variant='inset' />
                        </>
                    ))}
                </List>
            </Grid>
            <FullScreenDialog props={{
                title: "",
                open: open,
                closeFunction: () => setOpen(false),
                saveFunction: () => handleSave(),
                saveText: "Registrarse",
            }}>
                <Container>
                    <Typography variant="h5" sx={{ fontWeight: "medium" }} >¡Regístrate ahora!</Typography>
                    <Grid container spacing={3} >
                        {event.document_required &&
                            (<Grid size={12}>
                                <Typography variant="h6" sx={{ fontWeight: 'light' }} >Subir documento requerido</Typography>
                                <Button fullWidth color='secondary' variant='outlined' component="label" endIcon={<PhotoCamera />}>
                                    Seleccionar archivo
                                    <input hidden accept="image/avif,image/gif,image/jpeg,image/png,image/web,image/svg,image/svg+xml,application/pdf,application/msword"
                                        type="file" onChange={handleFileChange} />
                                </Button>
                                <Typography>
                                    {selectedFile ? selectedFile.name : "No se ha seleccionado ninguna imagen"}
                                </Typography>
                            </Grid>)}
                        {event.additional_info && event.additional_info.length > 0 && (
                            <Grid size={12}>
                                <Typography variant="h6" sx={{ fontWeight: 'light' }} >Información adicional</Typography>
                            </Grid>
                        )}
                        {event.additional_info && event.additional_info.map((info: string, index: number) => (
                            <Grid size={12} key={info}>
                                <Typography variant="overline"><b>{index + 1}.</b> {info}</Typography>
                                <TextField variant="outlined" fullWidth onChange={handleAdditionalInfoChange} id={index.toString()} />
                            </Grid>
                        ))}
                        {socialNetworks && (
                            <Grid size={12}>
                                <Typography variant="h6" sx={{ fontWeight: 'light' }} >
                                    ¿Por cuáles medios te enteraste de nuestro evento?
                                </Typography>
                            </Grid>
                        )}
                        <Grid size={12}>

                            {socialNetworks && (
                                <FormControl fullWidth>
                                    <InputLabel id="select-social-network">
                                        Red social
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        label="Red social"
                                        id="select-social-network"
                                        onChange={handleSocialNetwork}
                                    >
                                        {socialNetworks && socialNetworks.map((social: SocialNetworkProps) => (
                                            <MenuItem key={social._id} value={social._id}>
                                                {social.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </FullScreenDialog>
        </>
    );
}