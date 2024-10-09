import { PageProps } from "@/const";
import axios from "axios";
import { URLS } from "./urls";

export async function fetchPageBySlug(slug: string): Promise<{
    content: PageProps;
    error?: any;
}> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${API_URL}${URLS.PAGES.replace("{id}", slug)}`);
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return { content: response.data };
    } catch (error) {
        console.error(error);
        return { error, content: {} as PageProps };
    }
}