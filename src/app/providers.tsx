"use client";
import { styled } from '@mui/material/styles';
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider, MaterialDesignContent } from "notistack";

type Props = {
    children?: React.ReactNode;
};
const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    minWidth: '400px',
    minHeight: '80px',
    fontSize: '1.1rem',
    padding: '16px 24px',
    borderRadius: '12px',

    '& .notistack-MuiContent-message': {
        fontSize: '1.1rem',
        lineHeight: 1.5,
    },

    '& .notistack-MuiContent-icon': {
        fontSize: '28px',
        marginRight: '12px',
    },

    '&.notistack-MuiContent-success': {
        backgroundColor: '#2D7738',
    },

    '&.notistack-MuiContent-error': {
        backgroundColor: '#970C0C',
    },
}));

export const Providers = ({ children }: Props) => {
    return <SnackbarProvider
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
        }}
    ><SessionProvider>{children}</SessionProvider></SnackbarProvider>;
};