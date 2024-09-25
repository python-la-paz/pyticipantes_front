"use client"
import { loginState } from "@/atoms/index";
import { Button } from "@mui/material";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useRecoilState } from "recoil";

function addOne() {
    return (prev: number) => prev + 1;
}

export default function Page() {
    const [text, setText] = useRecoilState(loginState);
    return (
        <div>
            <SnackbarProvider />
            <h1>{text}</h1>
            <Button onClick={() => setText(addOne())} variant="text">Text</Button>
            <Button onClick={() => enqueueSnackbar('That was easy!')}>Show snackbar</Button>
        </div>
    );
}