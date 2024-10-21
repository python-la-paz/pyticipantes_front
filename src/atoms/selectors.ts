import { accessTokenState } from "@/atoms";
import { GenderProps, LocationProps, ProfessionProps, ProgrammingLanguageProps, SocialNetworkProps, UserProps } from "@/const";
import { fetchSocialNetwork } from "@/lib/http/events";
import { fetchGender, fetchLocation, fetchMe, fetchProfession, fetchProgrammingLanguage } from "@/lib/http/user";
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

export const locationQuery = selector({
    key: "locationQuery",
    get: async ({ get }) => {
        const id = get(accessTokenState);
        if (id !== "") {
            const response = await fetchLocation(id);
            if (response.error) {
                throw response.error;
            }
            return response;
        }
        return { content: [] as LocationProps[] };
    },
});

export const programmingLanguageQuery = selector({
    key: "programmingLanguagesQuery",
    get: async ({ get }) => {
        const id = get(accessTokenState);
        if (id !== "") {
            const response = await fetchProgrammingLanguage(id);
            if (response.error) {
                throw response.error;
            }
            return response;
        }
        return { content: [] as ProgrammingLanguageProps[] };
    },
});
export const socialNetworkQuery = selector({
    key: "socialNetworkQuery",
    get: async ({ get }) => {
        const id = get(accessTokenState);
        if (id !== "") {
            const response = await fetchSocialNetwork(id);
            if (response.error) {
                throw response.error;
            }
            return response;
        }
        return { content: [] as SocialNetworkProps[] };
    },
});