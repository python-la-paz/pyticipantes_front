"use client"
import { accessTokenState } from "@/atoms";
import { mePageQuery } from "@/atoms/selectors";
import { UserProps } from "@/const";
import { updateMe } from "@/lib/http/user";
import { Avatar, Button, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
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

function MeInfo(props: any) {
    const meDetailsLoadable = useRecoilValueLoadable(mePageQuery);
    const handleGender = (event: SelectChangeEvent) => {
        props.setGender(event.target.value as string);
    };
    useEffect(() => {
        if (meDetailsLoadable.state === 'hasValue') {
            props.setUser(meDetailsLoadable.contents.content);
        }
    }, [meDetailsLoadable]);
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

                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <Typography>Fecha Nacimiento</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker value={dayjs(props.user.birthday)} onChange={(newValue) => props.setBirthday(newValue)} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        {props.user.gender ? (
                            <Grid size={12}>
                                <Typography>Género</Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="select-gender"
                                        value={props.user.gender}
                                        onChange={handleGender}
                                    >
                                        <MenuItem value={"M"}>Másculino</MenuItem>
                                        <MenuItem value={"F"}>Fémenino</MenuItem>
                                        <MenuItem value={"NB"}>No Binario</MenuItem>
                                        <MenuItem value={"N/A"}>Prefiero no decirlo</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>)
                            : <Grid size={12}><Typography>Cargando...</Typography></Grid>}
                        <Grid size={12}>
                            <Button onClick={props.saveUser}>Guardar</Button>
                        </Grid>
                    </Grid>
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
        updateMe(token, user).then((response) => {
            enqueueSnackbar(`Se actualizó el usuario`, {
                variant: "success",
            })
        }).catch((error) => {
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
                    user={user} setUser={setUser}
                    setBirthday={setBirthday}
                    setGender={setGender}
                    saveUser={saveUser}
                />
            </Stack>
        </>
    );
}
