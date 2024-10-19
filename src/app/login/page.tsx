"use client";
import { useState } from "react";
import { Button, Stack, TextField, Typography, Grid, Box, Container } from "@mui/material";
import { useRouter } from "next/navigation"; // Para redireccionar después del login
import { useSnackbar } from "notistack";
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from 'next-auth/react';
import { routes } from "@/lib/urls";

export default function LoginPage() {

    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            // Usar el método signIn de NextAuth para iniciar sesión con Google
            await signIn('google', { callbackUrl: routes.profile });
        } catch (error) {
            console.error("Error al iniciar sesión con Google", error);
        }
    };

    return (
        <Grid container sx={{ height: "100vh" }}>
            {/* Sección izquierda con la imagen */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    backgroundColor: "#f0f0f0",
                    order: { xs: 2, md: 1 }, // Cambia el orden en pantallas pequeñas
                }}
            >
                <Box
                    component="img"
                    src="/img/iniciar_sesion_imagen_recortada.png"
                    alt="Imagen de bienvenida"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                    }}
                />
            </Grid>

            {/* Sección derecha con el contenido */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    order: { xs: 1, md: 2 }, // Cambia el orden en pantallas pequeñas
                    backgroundImage: {
                        md: "none",
                        xs: "url('/img/iniciar_sesion_imagen_recortada.png')"
                    },
                    backgroundSize: "cover", // Ajusta la imagen de fondo
                    backgroundPosition: "center", // Centra la imagen de fondo
                    position: { xs: "relative", md: "initial" }, // Solo aplica "relative" en xs
                    "&::before": {
                        content: '""',
                        position: { xs: "absolute", md: "initial" }, // Solo aplica el pseudo-elemento en xs
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: { xs: "rgba(0, 0, 0, 0.3)", md: "none" }, // Filtro oscuro solo en xs
                        zIndex: { xs: 1, md: "initial" }, // Solo aplica el zIndex en xs
                    },
                    zIndex: { xs: 0, md: "initial" },
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        background: "url('/img/margen.svg') no-repeat center",
                        backgroundSize: "contain",
                        padding: "50px",
                        borderRadius: "20px",
                        width: {
                            xs: "0%",
                            md: "80%",
                        },
                        height: { xs: "0%", md: "80%" },
                        zIndex: 2,
                    }}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            textAlign: "center",
                            height: "100%",
                            justifyContent: "center",
                            marginLeft: "12%",
                            marginRight: "12%",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Box
                                component="img"
                                src="/icons/logo_m_original.svg"
                                alt="Logo"
                                sx={{
                                    width: "180px",
                                    height: "180px",
                                }}
                            />
                        </Box>

                        <Typography
                            variant="h4"
                            sx={{
                                color: { xs: "#fff", md: "inherit" }, // Blanco en xs, color por defecto en md
                                fontFamily: "'Montserrat Alternates', sans-serif",
                                fontWeight: "700",
                            }}
                        >
                            ¡Bienvenido de nuevo!
                        </Typography>

                        {/* Oculta este texto en pantallas xs */}
                        <Typography
                            variant="body1"
                            sx={{
                                display: { xs: "none", md: "block" }, // Oculta en xs
                            }}
                        >   Inicia sesión ingresando tu correo electrónico y contraseña. Si aún no tienes cuenta, regístrate fácilmente.
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<GoogleIcon sx={{ width: "20px", height: "20px" }} />}
                            sx={{
                                mt: 2,
                                backgroundColor: "#FF9C8D",
                                color: "#fff",
                                borderRadius: "20px",
                                "&:hover": {
                                    backgroundColor: "#C65D60",
                                },
                                width: "292px",
                                height: "40px",
                                fontSize: "16px",
                                fontFamily: "'Montserrat Alternates', sans-serif",
                                textTransform: "none",
                            }}
                            onClick={handleLogin}
                        >
                            Acceder con Google
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );


}