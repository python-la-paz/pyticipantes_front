import { PageProps } from "@/const";
import { fetchPageBySlug } from "@/lib/http/page";
import { selectorFamily } from "recoil";

export const pageQuery = selectorFamily({
    key: "pageQuery",
    get: (param: { id: string }) => async () => {
        if (param.id !== "") {
            const response = await fetchPageBySlug(param.id);
            if (response.error) {
                throw response.error;
            }
            return response;
        }
        return { content: {} as PageProps }
    },
});