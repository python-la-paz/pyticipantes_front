/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { URLS } from "./urls";
import { ActivityProps, ActivityRegisterProps} from "@/const";

export async function fetchActivities(
    id: string,
): Promise<{
    content: ActivityProps[];
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const url = `${API_URL}${URLS.ACTIVITIES.replace("{id}", id)}`;
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { content: response.data };
    }
    catch (error) {
        console.error(error);
        return { error, content: [] as ActivityProps[] };
    }
}


export async function fetchImage(
    id: string,
    access_token: string,
): Promise<{
    content: string;
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const url = `${API_URL}${URLS.FILE.replace("{id}", id)}`;
        const response = await axios.get(url, { "headers": { "Authorization": `Bearer ${access_token}` }, responseType: 'blob' });
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        // const byteCharacters = atob(response.data);
        // const byteNumbers = new Uint8Array(byteCharacters.length);
        // for (let i = 0; i < byteCharacters.length; i++) {
        //     byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }
        // const blob = new Blob([byteNumbers], { type: 'image/png' });
        const imageObjectUrl = URL.createObjectURL(response.data);
        return { content: imageObjectUrl };
    }
    catch (error) {
        console.error(error);
        return { error, content: "" };
    }
}


export async function registerActivity(
    id: string,
    access_token: string,
    file: any,
    additionalInfo: string[],
): Promise<{
    content: ActivityRegisterProps;
    error?: any;
    message: string;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const url = `${API_URL}${URLS.ACTIVITY_REGISTER.replace("{id}", id)}`;
        const formData = new FormData();
        if (file && file.name !== "")
            formData.append("file", file, file.name);
        if (additionalInfo.length > 0) {
            additionalInfo.forEach((info) => {
                formData.append("additional_info", info);
            });
        } else {
            formData.append("additional_info", "");
        }
        const response = await axios.post(url, formData, { "headers": { "Authorization": `Bearer ${access_token}` } });
        if (response.status !== 200 && response.status !== 201) {
            if (response.status === 400) {
                throw new Error("message" in response.data ? response.data.message : "Error al registrar");
            }
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { message: "message" in response.data ? response.data.message : "Registro realizado", content: response.data };
    }
    catch (error) {
        if (error instanceof AxiosError) {
            if (error.response && error.response.status === 400) {
                return { message: "message" in error.response.data ? error.response.data.message : "Error al registrar", error, content: {} as ActivityRegisterProps };
            }
        }
        return { message: "", error, content: {} as ActivityRegisterProps };
    }
}

export async function deleteRegisterActivity(
    id: string,
    access_token: string,
): Promise<{
    content: ActivityRegisterProps;
    error?: any;
    message: string;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const url = `${API_URL}${URLS.ACTIVITY_REGISTER.replace("{id}", id)}`;
        const response = await axios.delete(url, { "headers": { "Authorization": `Bearer ${access_token}` } });
        if (response.status !== 200 && response.status !== 204) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { message: "Registro eliminado", content: {} as ActivityRegisterProps };
    }
    catch (error) {
        if (error instanceof AxiosError) {
            if (error.response && error.response.status === 400) {
                return { message: "message" in error.response.data ? error.response.data.message : "Error al eliminar", error, content: {} as ActivityRegisterProps };
            }
        }
        return { message: "", error, content: {} as ActivityRegisterProps };
    }
}

export async function fetchActivityRegister(
    id: string,
    access_token: string,
): Promise<{
    content: ActivityRegisterProps[];
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const url = `${API_URL}${URLS.ACTIVITIES_REGISTER.replace("{id}", id)}`;
        const response = await axios.get(url, { "headers": { "Authorization": `Bearer ${access_token}` } });
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { content: response.data };
    }
    catch (error) {
        console.error(error);
        return { error, content: [] as ActivityRegisterProps[] };
    }
}
