import { accessTokenState } from "@/atoms";
import { GenderProps, ProfessionProps, UserProps } from "@/const";
import { fetchGender, fetchMe, fetchProfession } from "@/lib/http/user";
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
export const genderQuery = selector({
    key: "genderQuery",
    get: async ({ get }) => {
        const id = get(accessTokenState);
        if (id !== "") {
            const response = await fetchGender(id);
            if (response.error) {
                throw response.error;
            }
            return response;
        }
        return { content: [] as GenderProps[] };
    },
});
export const professionQuery = selector({
    key: "professionQuery",
    get: async ({ get }) => {
        const id = get(accessTokenState);
        if (id !== "") {
            const response = await fetchProfession(id);
            if (response.error) {
                throw response.error;
            }
            return response;
        }
        return { content: [] as ProfessionProps[] };
    },
});