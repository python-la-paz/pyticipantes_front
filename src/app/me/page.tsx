"use client"
import { accessTokenState } from "@/atoms";
import { genderQuery, locationQuery, mePageQuery, professionQuery, programmingLanguageQuery } from "@/atoms/selectors";
import { GenderProps, LocationProps, ProfessionProps, ProgrammingLanguageProps, UserProps, UserSkillProps } from "@/const";
import { updateMe } from "@/lib/http/user";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Button, Chip, Dialog, DialogActions, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/es';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

function MeInfo(props: { user: UserProps, setUser: (value: UserProps) => void, setBirthday: (value: Dayjs) => void, setGender: (value: string) => void, saveUser: () => void }) {
    const genderDetailsLoadable = useRecoilValueLoadable(genderQuery);
    const professionDetailsLoadable = useRecoilValueLoadable(professionQuery);
    const locationDetailsLoadable = useRecoilValueLoadable(locationQuery);
    const programmingLanguageDetailsLoadable = useRecoilValueLoadable(programmingLanguageQuery);
    const meDetailsLoadable = useRecoilValueLoadable(mePageQuery);
    const [genders, setGenders] = useState<GenderProps[]>([]);
    const [professions, setProfessions] = useState<ProfessionProps[]>([]);
    const [locations, setLocations] = useState<LocationProps[]>([]);
    const [programmingLanguages, setProgrammingLanguages] = useState<ProgrammingLanguageProps[]>([]);
    const [actualProgrammingLanguage, setActualProgrammingLanguage] = useState<string>("");
    const [actualProgrammingLanguageLevel, setActualProgrammingLanguageLevel] = useState<number>(0);

    const marks = [
        { value: 0, label: 'Nada 0', },
        { value: 1, label: '1', },
        { value: 2, label: '2', },
        { value: 3, label: '3', },
        { value: 4, label: '4', },
        { value: 5, label: '5', },
        { value: 6, label: '6', },
        { value: 7, label: '7', },
        { value: 8, label: '8', },
        { value: 9, label: '9', },
        { value: 10, label: '10 Avanzado', },
    ];
    const marksProgramming = [
        { value: 0, label: 'No utilizo', },
        { value: 1, label: 'Básico', },
        { value: 2, label: 'Intermedio', },
        { value: 3, label: 'Sólido', },
        { value: 4, label: 'Avanzado', },
    ];

    const handleGender = (event: SelectChangeEvent) => {
        props.setGender(event.target.value as string);
    };
    const handleProfession = (event: SelectChangeEvent) => {
        props.setUser({ ...props.user, profession: event.target.value as string });
    }
    const handleLocation = (event: SelectChangeEvent) => {
        props.setUser({ ...props.user, residence: event.target.value as string });
    }
    const handleProgrammingLanguage = (event: SelectChangeEvent) => {
        setActualProgrammingLanguage(event.target.value as string);
    }
    const updateSkill = () => {
        if (actualProgrammingLanguage === "") return;
        if (actualProgrammingLanguageLevel === 0) return;
        const nameSkill = programmingLanguages.find((s) => s._id === actualProgrammingLanguage)?.name;
        const newSkill: UserSkillProps = { skill: actualProgrammingLanguage, level: actualProgrammingLanguageLevel, name: nameSkill || "" };
        const existingSkillIndex = props.user.programming_languages.findIndex((s) => s.skill === newSkill.skill);
        let updatedSkills;
        if (existingSkillIndex !== -1) {
            updatedSkills = [...props.user.programming_languages];
            updatedSkills[existingSkillIndex] = newSkill;
        } else {
            updatedSkills = [...props.user.programming_languages, newSkill];
        }
        props.setUser({ ...props.user, programming_languages: updatedSkills });
        setActualProgrammingLanguage("");
        setActualProgrammingLanguageLevel(1);
    };

    const handleDeleteSkill = (skill: UserSkillProps) => {
        const newSkills = props.user.programming_languages.filter((s) => s.skill !== skill.skill);
        props.setUser({ ...props.user, programming_languages: newSkills });
    }


    useEffect(() => {
        if (meDetailsLoadable.state === 'hasValue') {
            props.setUser(meDetailsLoadable.contents.content);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meDetailsLoadable]);

    useEffect(() => {
        if (genderDetailsLoadable.state === 'hasValue') {
            setGenders(genderDetailsLoadable.contents.content as GenderProps[]);
        }
    }, [genderDetailsLoadable]);
    useEffect(() => {
        if (professionDetailsLoadable.state === 'hasValue') {
            setProfessions(professionDetailsLoadable.contents.content as ProfessionProps[]);
        }
    }, [professionDetailsLoadable]);
    useEffect(() => {
        if (programmingLanguageDetailsLoadable.state === 'hasValue') {
            setProgrammingLanguages(programmingLanguageDetailsLoadable.contents.content as ProgrammingLanguageProps[]);
        }
    }, [programmingLanguageDetailsLoadable]);
    useEffect(() => {
        if (locationDetailsLoadable.state === 'hasValue') {
            setLocations(locationDetailsLoadable.contents.content as LocationProps[]);
        }
    }, [locationDetailsLoadable]);

    const setGivenName = (value: string) => {
        value = value.slice(0, 30);
        props.setUser({ ...props.user, given_name: value });
    }
    const setFamilyName = (value: string) => {
        value = value.slice(0, 30);
        props.setUser({ ...props.user, family_name: value });
    }
    const setDni = (value: string) => {
        value = value.slice(0, 10);
        props.setUser({ ...props.user, dni: value });
    }
    const setPhone = (value: string) => {
        value = value.replace(/\D/g, '').slice(0, 15);
        props.setUser({ ...props.user, phone: value });
    }
    const setPlaceProfession = (value: string) => {
        value = value.slice(0, 50);
        props.setUser({ ...props.user, place_profession: value });
    }
    const setLevelProgramming = (value: number) => {
        props.setUser({ ...props.user, level_programming: value });
    }


    switch (meDetailsLoadable.state) {
        case "hasValue":
            const data = meDetailsLoadable.contents.content;
            return (
                <>
                    <Avatar
                        alt={data.given_name}
                        sx={{ width: 100, height: 100 }}
                    >
                        <Image src={data.picture} alt={data.given_name} width={100} height={100} />
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 'medium' }} >{data.given_name}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'medium' }} >{data.family_name}</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'light' }} >{data.email}</Typography>

                    {data.new && <Typography variant="h5" sx={{ fontWeight: 'light' }}>¡Regístrate y comienza hoy!</Typography>}

                    <Divider />
                    <Typography variant="h5">{!data.data_complete && "Completa tu perfil para registrarte en eventos"}</Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
                            <TextField id="tGivenName" label="Nombres" variant="outlined" fullWidth value={props.user.given_name} onChange={(e) => setGivenName(e.target.value)} />
                        </Grid>
                        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
                            <TextField id="tFamilyName" label="Apellidos" variant="outlined" fullWidth value={props.user.family_name} onChange={(e) => setFamilyName(e.target.value)} />
                        </Grid>
                        <Grid size={{ lg: 12, md: 12, sm: 12 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        slotProps={{ textField: { fullWidth: true } }} label="Fecha de nacimiento"
                                        openTo="year" views={['year', 'month', 'day']} value={dayjs(props.user.birthday)} onChange={(newValue) => newValue && props.setBirthday(newValue)} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
                            <TextField id="tDni" label="Cédula de identidad" variant="outlined" fullWidth value={props.user.dni || ''} onChange={(e) => setDni(e.target.value.replace(/\s+/g, ''))} />
                        </Grid>
                        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
                            <TextField type="number" id="tPhone" label="Teléfono" variant="outlined" fullWidth value={props.user.phone || ''} onChange={(e) => setPhone(e.target.value)} />
                        </Grid>


                        {genders ? (
                            <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-gender">
                                        Género
                                    </InputLabel>
                                    <Select
                                        label="Género"
                                        id="select-gender"
                                        value={props.user.gender || ''}
                                        onChange={handleGender}
                                    >
                                        {genders.map((option) => (
                                            <MenuItem key={option._id} value={option._id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>)
                            : <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}><Typography>Cargando...</Typography></Grid>}
                        {locations ? <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-location">
                                    Lugar de residencia
                                </InputLabel>
                                <Select
                                    label="Lugar de residencia"
                                    id="select-location"
                                    value={props.user.residence || ''}
                                    onChange={handleLocation}
                                >
                                    {locations.map((option) => (
                                        <MenuItem key={option._id} value={option._id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid> : <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}><Typography>Cargando...</Typography></Grid>}
                        {professions ? (
                            <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-profession">
                                        Profesión
                                    </InputLabel>
                                    <Select
                                        label="Profesión"
                                        id="select-profession"
                                        value={props.user.profession || ''}
                                        onChange={handleProfession}
                                    >
                                        {professions.map((option) => (
                                            <MenuItem key={option._id} value={option._id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>)
                            : <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}><Typography>Cargando...</Typography></Grid>}
                        <Grid size={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}>
                            <TextField id="tPlaceProfession" label="Lugar donde trabaja o estudia" variant="outlined" fullWidth value={props.user.place_profession || ''} onChange={(e) => setPlaceProfession(e.target.value)} />
                        </Grid>


                        <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                            <Stack direction="column"
                                spacing={0.5}
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <Typography variant="subtitle1">¿Cuál es tu nivel de programación?</Typography>
                                <Slider sx={{ width: '80%' }}
                                    value={props.user.level_programming ?? 0}
                                    valueLabelDisplay="auto"
                                    shiftStep={1}
                                    step={1}
                                    min={0}
                                    max={10}
                                    marks={marks}
                                    onChange={(_, value) => setLevelProgramming(value as number)}
                                />
                            </Stack>
                        </Grid>
                        <Divider />
                        {programmingLanguages && (

                            <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                                <Stack direction="column"
                                    spacing={0.5}
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                    <Typography variant="subtitle1">¿Qué lenguajes de programación usas?</Typography>
                                    <Grid container spacing={2} sx={{ width: "100%" }}>
                                        <Grid size={{ xl: 5, lg: 5, md: 12, sm: 12, xs: 12 }} >
                                            <FormControl fullWidth>
                                                <InputLabel id="select-programming-language">
                                                    Lenguaje de programación
                                                </InputLabel>
                                                <Select
                                                    label="Lenguaje de programación"
                                                    id="select-programming-language"
                                                    value={actualProgrammingLanguage}
                                                    onChange={handleProgrammingLanguage}
                                                >
                                                    {programmingLanguages.map((option) => (
                                                        <MenuItem key={option._id} value={option._id}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={{ xl: 5, lg: 5, md: 12, sm: 12, xs: 12 }} sx={{
                                            textAlign: "center",
                                        }}>
                                            <Slider
                                                sx={{ width: '70%' }}
                                                value={actualProgrammingLanguageLevel}
                                                valueLabelDisplay="auto"
                                                shiftStep={1}
                                                step={1}
                                                min={1}
                                                max={marksProgramming.length - 1}
                                                marks={marksProgramming}
                                                onChange={(_, value) => setActualProgrammingLanguageLevel(value as number)}
                                            />
                                        </Grid>
                                        <Grid size={{ xl: 2, lg: 2, md: 12, sm: 12, xs: 12 }} sx={{ textAlign: "center", }}>
                                            <Button startIcon={<AddCircleOutlineIcon />} onClick={updateSkill}>Agregar Lenguaje</Button>
                                        </Grid>
                                    </Grid>


                                </Stack>
                            </Grid>
                        )}
                        <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                            <Stack direction="row" spacing={2} flexWrap={"wrap"} useFlexGap>
                                {props.user.programming_languages && props.user.programming_languages.map((skill, index) => (
                                    <Chip variant="outlined" key={index} onDelete={() => handleDeleteSkill(skill)} avatar={<Avatar>{
                                        marksProgramming.find((m) => m.value === skill.level)?.label.charAt(0)
                                    }</Avatar>} label={skill.name} />
                                ))}
                            </Stack>
                        </Grid>
                        <Grid size={12}>
                            <Button variant="contained" fullWidth onClick={props.saveUser} endIcon={<SendIcon />}
                                sx={{ borderRadius: "20px", }}
                            >Guardar</Button>
                        </Grid>
                        <Divider />
                    </Grid >
                </>
            );
        case "loading":
            return <div>Loading...</div>;
        case "hasError":
            return <div>{meDetailsLoadable.contents.message}</div>;
    }
}

export default function MePage() {
    const defaultUser: UserProps = {
        username: "",
        email: "",
        given_name: "",
        family_name: "",
        picture: "",
        admin: false,
        disabled: false,
        birthday: null,
        gender: null,
        dni: null,
        profession: null,
        place_profession: null,
        residence: null,
        level_programming: 0,
        phone: null,
        data_complete: false,
        programming_languages: [],
        new: false,
    };
    const { enqueueSnackbar } = useSnackbar();
    // const [gender, setGender] = useState('');
    const [token] = useRecoilState(accessTokenState);
    const [user, setUser] = useState<UserProps>(defaultUser);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleRedirect = () => router.push('/');
    const setGender = (value: string) => {
        setUser({ ...user, gender: value });
    }
    const setBirthday = (value: Dayjs) => {
        setUser({ ...user, birthday: value.toDate() });
    }
    const saveUser = () => {
        if (user.given_name.length < 3 || user.given_name.length > 30) {
            enqueueSnackbar(`El nombre debe tener entre 3 y 30 caracteres`, {
                variant: "error",
            })
            return;
        }
        if (user.family_name.length < 3 || user.family_name.length > 30) {
            enqueueSnackbar(`El apellido debe tener entre 3 y 30 caracteres`, {
                variant: "error",
            })
            return;
        }
        if (!user.dni) {
            enqueueSnackbar(`La cédula es obligatoria`, {
                variant: "error",
            })
            return;
        }
        if (user.dni.length < 6 || user.dni.length > 10) {
            enqueueSnackbar(`La cédula debe tener entre 6 y 10 caracteres`, {
                variant: "error",
            })
            return;
        }
        if (!user.phone) {
            enqueueSnackbar(`El teléfono es obligatorio`, {
                variant: "error",
            })
            return;
        }
        if (user.phone.length < 6 || user.phone.length > 15) {
            enqueueSnackbar(`El teléfono debe tener entre 6 y 15 caracteres`, {
                variant: "error",
            })
            return;
        }
        if (!user.place_profession) {
            enqueueSnackbar(`El lugar de trabajo es obligatorio`, {
                variant: "error",
            })
            return;
        }
        if (user.place_profession.length < 3 || user.place_profession.length > 50) {
            enqueueSnackbar(`El lugar de trabajo debe tener entre 3 y 50 caracteres`, {
                variant: "error",
            })
            return;
        }
        updateMe(token, user).then(() => {
            setOpen(true);
        }).catch(() => {
            enqueueSnackbar(`Error al actualizar el usuario`, {
                variant: "error",
            })
        });
    }
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Se actualizó el usuario</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Volver
                    </Button>
                    <Button onClick={handleRedirect} variant="contained" color="secondary">
                        Finalizar
                    </Button>
                </DialogActions>
            </Dialog>
            <Stack direction="column"
                spacing={0.5}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <MeInfo
                    user={user}
                    setUser={setUser}
                    setBirthday={setBirthday}
                    setGender={setGender}
                    saveUser={saveUser}
                />
            </Stack>
        </>
    );
}
