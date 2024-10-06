import { accessTokenState } from "@/atoms";
import { UserProps } from "@/const";
import { fetchMe } from "@/lib/http/user";
import { selector } from "recoil";

export const mePageQuery = selector({
    key: "mePageQuery",
    get: async ({ get }) => {
        const id = get(accessTokenState);
        if (id !== "") {
            const response = await fetchMe(id);
            if (response.error) {
                throw response.error;
            }
            return response;
        }
        return { content: {} as UserProps };
    },
});