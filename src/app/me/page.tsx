"use client"
import { accessTokenState } from "@/atoms";
import { genderQuery, mePageQuery, professionQuery } from "@/atoms/selectors";
import { GenderProps, ProfessionProps, UserProps } from "@/const";
import { updateMe } from "@/lib/http/user";
import { Avatar, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/es';
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

function MeInfo(props: { user: UserProps, setUser: (value: UserProps) => void, setBirthday: (value: Dayjs) => void, setGender: (value: string) => void, saveUser: () => void }) {
    const genderDetailsLoadable = useRecoilValueLoadable(genderQuery);
    const professionDetailsLoadable = useRecoilValueLoadable(professionQuery);
    const meDetailsLoadable = useRecoilValueLoadable(mePageQuery);
    const [genders, setGenders] = useState<GenderProps[]>([]);
    const [professions, setProfessions] = useState<ProfessionProps[]>([]);
    const marks = [
        {
            value: 0,
            label: 'Nada 0',
        },
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        },
        {
            value: 6,
            label: '6',
        },
        {
            value: 7,
            label: '7',
        },
        {
            value: 8,
            label: '8',
        },
        {
            value: 9,
            label: '9',
        },
        {
            value: 10,
            label: '10 Avanzado',
        },
    ];

    const handleGender = (event: SelectChangeEvent) => {
        props.setGender(event.target.value as string);
    };
    const handleProfession = (event: SelectChangeEvent) => {
        props.setUser({ ...props.user, profession: event.target.value as string });
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

    const setGivenName = (value: string) => {
        props.setUser({ ...props.user, given_name: value });
    }
    const setFamilyName = (value: string) => {
        props.setUser({ ...props.user, family_name: value });
    }
    const setDni = (value: string) => {
        props.setUser({ ...props.user, dni: value });
    }
    const setPhone = (value: string) => {
        props.setUser({ ...props.user, phone: value });
    }
    const setResidence = (value: string) => {
        props.setUser({ ...props.user, residence: value });
    }
    const setPlaceProfession = (value: string) => {
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
                        sx={{ width: 150, height: 150 }}
                    >
                        <Image src={data.picture} alt={data.given_name} width={150} height={150} />
                    </Avatar>
                    <h1>{data.given_name}</h1>
                    <h2>{data.family_name}</h2>
                    <h3>{data.email}</h3>
                    <hr />
                    <Typography variant="h5">{!data.data_complete && "Completa tu perfil para registrarte en eventos"}</Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                            <TextField id="tGivenName" label="Nombres" variant="outlined" fullWidth value={props.user.given_name} onChange={(e) => setGivenName(e.target.value)} />
                        </Grid>
                        <Grid size={{ lg: 6, md: 12, sm: 12 }}>
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
                        <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                            <TextField id="tDni" label="Cédula de identidad" variant="outlined" fullWidth value={props.user.dni || ''} onChange={(e) => setDni(e.target.value)} />
                        </Grid>
                        <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                            <TextField id="tPhone" label="Teléfono" variant="outlined" fullWidth value={props.user.phone || ''} onChange={(e) => setPhone(e.target.value)} />
                        </Grid>


                        {genders ? (
                            <Grid size={{ lg: 6, md: 12, sm: 12 }}>
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
                            : <Grid size={{ lg: 6, md: 12, sm: 12 }}><Typography>Cargando...</Typography></Grid>}
                        <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                            <TextField id="tResidence" label="Lugar de residencia" variant="outlined" fullWidth value={props.user.residence || ''} onChange={(e) => setResidence(e.target.value)} />
                        </Grid>
                        {professions ? (
                            <Grid size={{ lg: 6, md: 12, sm: 12 }}>
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
                            : <Grid size={{ lg: 6, md: 12, sm: 12 }}><Typography>Cargando...</Typography></Grid>}
                        <Grid size={{ lg: 6, md: 12, sm: 12 }}>
                            <TextField id="tPlaceProfession" label="Lugar donde trabaja o estudia" variant="outlined" fullWidth value={props.user.place_profession || ''} onChange={(e) => setPlaceProfession(e.target.value)} />
                        </Grid>


                        <Grid size={{ lg: 12, md: 12, sm: 12 }}>
                            <Stack direction="column"
                                spacing={0.5}
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <Typography variant="subtitle1">¿Cuál es tu nivel de programación?</Typography>
                                <Slider sx={{ width: '70%' }}
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

                        <Grid size={12}>
                            <Button onClick={props.saveUser}>Guardar</Button>
                        </Grid>
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
    };
    const { enqueueSnackbar } = useSnackbar();
    // const [gender, setGender] = useState('');
    const [token] = useRecoilState(accessTokenState);
    const [user, setUser] = useState<UserProps>(defaultUser);
    const setGender = (value: string) => {
        setUser({ ...user, gender: value });
    }
    const setBirthday = (value: Dayjs) => {
        setUser({ ...user, birthday: value.toDate() });
    }
    const saveUser = () => {
        updateMe(token, user).then(() => {
            enqueueSnackbar(`Se actualizó el usuario`, {
                variant: "success",
            })
        }).catch(() => {
            enqueueSnackbar(`Error al actualizar el usuario`, {
                variant: "error",
            })
        });
    }
    return (
        <>
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
