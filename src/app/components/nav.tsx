"use client"
import { accessTokenState } from '@/atoms';
import { fetchSignOutAPI } from '@/lib/http/auth';
import { routes } from '@/lib/urls';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
export default function MenuAppBar() {
    const { data: session, status } = useSession();

    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [token, setAccessTokenState] = useRecoilState(accessTokenState);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    useEffect(() => {
        if (status === "authenticated") {
            setAccessTokenState(session.accessToken);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, status]);

    const menuId = "primary-search-account-menu";
    const mobileMenuId = "primary-search-account-menu-mobile";

    const renderLogged = (
        <>
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
        </>
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
            {session ? (
                <>
                    {renderLogged}
                </>
            ) : (
                <>
                    {renderNotLogged}
                </>
            )}
        </Menu>
    );
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            id={mobileMenuId}
            keepMounted
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
            {session ? (
                <>
                    {renderLogged}
                </>
            ) : (
                <>
                    {renderNotLogged}
                </>
            )}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" passHref>
                            Pyticipantes
                        </Link>
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar sx={{ borderColor: (theme) => theme.palette.secondary.main, borderStyle: "solid" }}>
                            {status === "authenticated" && session ?
                                <>
                                    {session.user.image !== null && session.user.image !== undefined ?
                                        <>
                                            {session.user.name !== null && session.user.name !== undefined ?
                                                <Image src={session.user.image} alt={session.user.name} layout="fill" /> :
                                                <Image src={session.user.image} alt="Usuario" layout="fill" />
                                            }
                                        </> :
                                        null}

                                </>
                                :
                                <AccountCircle />
                            }
                        </Avatar>
                    </IconButton>
                    {renderMobileMenu}
                    {renderMenu}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
