/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from "axios";
import { URLS } from "./urls";
import { ActivityProps} from "@/const";

export async function fetchActivities(
    page?: number,
    size?: number,
): Promise<{
    content: ActivityProps[];
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const url = `${API_URL}${URLS.ACTIVITIES}?page_number=${page}&n_per_page=${size}`;
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
