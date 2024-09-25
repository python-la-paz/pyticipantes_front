"use client";

import { RecoilRoot, atom } from "recoil";
import { loginState } from "../atoms";

export default function RecoidContextProvider({ children }: { children: React.ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>;
}