import axios from "axios";
import { URLS } from "./urls";
import { UserProps } from "@/const";

export async function fetchMe(access_token: string): Promise<{
    content: UserProps;
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${API_URL}${URLS.PROFILE}`, { "headers": { "Authorization": `Bearer ${access_token}` } });
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { content: response.data };
    } catch (error) {
        console.error(error);
        return { error, content: {} as UserProps };
    }
}
export async function updateMe(access_token: string, data: UserProps): Promise<{
    content: UserProps;
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.put(`${API_URL}${URLS.PROFILE}`, data, { "headers": { "Authorization": `Bearer ${access_token}` } });
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { content: response.data };
    } catch (error) {
        console.error(error);
        return { error, content: {} as UserProps };
    }
}
export async function fetchGender(access_token: string): Promise<{
    content: string[];
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${API_URL}${URLS.GENDER}`, { "headers": { "Authorization": `Bearer ${access_token}` } });
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { content: response.data };
    }
    catch (error) {
        console.error(error);
        return { error, content: [] };
    }
}