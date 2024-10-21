import { TokenProps } from "@/const";
import { URLS } from "@/lib/http/urls";
import axios from "axios";

export async function fetchLoginAPI(access_token: string) {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${API_URL}${URLS.LOGIN}`, { "headers": { "Authorization": `Bearer ${access_token}` } });
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return response.data as TokenProps;
    } catch (error) {
        console.error(error);
        throw new Error("Error to login");
    }
}
export async function fetchSignOutAPI(access_token: string) {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${API_URL}${URLS.LOGOUT}`, { "headers": { "Authorization": `Bearer ${access_token}` } });
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
