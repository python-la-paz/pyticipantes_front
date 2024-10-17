"use client"
import { accessTokenState } from '@/atoms';
import { fetchSignOutAPI } from '@/lib/http/auth';
import { routes } from '@/lib/urls';
import { Button} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../page.module.css'
export default function MenuAppBar({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [token, setAccessTokenState] = useRecoilState(accessTokenState);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    // const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // };

    useEffect(() => {
        if (status === "authenticated") {
            setAccessTokenState(session.accessToken);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, status]);

    const menuId = "primary-search-account-menu";
    const mobileMenuId = "primary-search-account-menu-mobile";

    const renderLogged = (
        <div>
            <Link href={routes.profile} aria-label="Perfil">
                <MenuItem>Perfil</MenuItem>
            </Link>
            <a href={routes.logout} aria-label="Salir" onClick={(e) => {
                e.preventDefault()
                fetchSignOutAPI(token);
                signOut({ callbackUrl: `${window.location.origin}` })
            }}>
                <MenuItem>Salir</MenuItem>
            </a>
        </div>
    )
    const renderNotLogged = (
        <a href={routes.login} onClick={(e) => {
            e.preventDefault()
            signIn()
        }}>
            <MenuItem>Iniciar Sesión</MenuItem>
        </a>
    )

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            {session ? renderLogged : renderNotLogged}
        </Menu>
    );
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            id={mobileMenuId}
            keepMounted
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
            {session ? renderLogged : renderNotLogged}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" sx={{
                backgroundColor: 'rgba(0, 0, 0 , 0.2)',
                color: 'black',
                backdropFilter: 'blur(10px)',
                boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)'
            }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, margin: { xs: "10px", md: "20px" } }}>
                        <Link
                            href="/" passHref>
                            <img
                                src="/icons/logo_blanco.svg"
                                alt="Descripción del ícono"
                                className={styles.logoNav}
                            />
                        </Link>
                    </Box>
                    {status === "authenticated" && session ?
                        <>
                            <Button
                                variant="outlined"
                                size='small'
                                href={routes.logout}
                                sx={{
                                    color: "white",
                                    borderColor: "white",
                                    background: "transparent",
                                    borderRadius: "20px",
                                    textTransform: 'none',
                                    marginRight: { xs: '10px'},
                                    fontSize: '16px',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: '#171515',
                                    },
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                Cerrar sesion
                            </Button>
                            <Button
                                variant="outlined"
                                size='small'
                                href={routes.profile}
                                sx={{
                                    color: "white",
                                    borderColor: "white",
                                    background: "transparent",
                                    borderRadius: "20px",
                                    textTransform: 'none',
                                    marginRight: { xs: '1px', md: '100px' },
                                    fontSize: '16px',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: '#171515',
                                    },
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                Perfil
                            </Button>
                        </>
                        : <>
                            <Button
                                variant="outlined"
                                size='small'
                                href={routes.login}
                                sx={{
                                    color: "white",
                                    borderColor: "white",
                                    background: "transparent",
                                    borderRadius: "20px",
                                    textTransform: 'none',
                                    marginRight: { xs: '1px', md: '100px' },
                                    fontSize: '16px',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: '#171515',
                                    },
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                Iniciar Sesion
                            </Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {children}
        </Box>
    );
}
