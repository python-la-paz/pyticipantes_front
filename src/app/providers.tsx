"use client";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

type Props = {
    children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
    return <SnackbarProvider><SessionProvider>{children}</SessionProvider></SnackbarProvider>;
};