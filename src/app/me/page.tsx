"use client"
import { useRecoilState } from "recoil";
import { loginState } from "@/atoms/index";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { Button } from "@mui/material";

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