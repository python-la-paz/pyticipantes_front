import axios from "axios";
import { URLS } from "./urls";
import { EventProps, EventRegisterProps } from "@/const";
export async function fetchEvents(
    page?: number,
    size?: number,
): Promise<{
    content: EventProps[];
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const url = `${API_URL}${URLS.EVENTS}?page_number=${page}&n_per_page=${size}`;
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { content: response.data };
    }
    catch (error) {
        console.error(error);
        return { error, content: [] as EventProps[] };
    }
}
export async function fetchEvent(
    id: string,
): Promise<{
    content: EventProps;
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const url = `${API_URL}${URLS.EVENTS}/${id}`;
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { content: response.data };
    }
    catch (error) {
        console.error(error);
        return { error, content: {} as EventProps };
    }
}
export async function fetchEventRegister(
    id: string,
    access_token: string,
): Promise<{
    content: EventRegisterProps[];
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const url = `${API_URL}${URLS.EVENT_REGISTER.replace("{id}", id)}`;
        const response = await axios.get(url, { "headers": { "Authorization": `Bearer ${access_token}` } });
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { content: response.data };
    }
    catch (error) {
        console.error(error);
        return { error, content: [] as EventRegisterProps[] };
    }
}