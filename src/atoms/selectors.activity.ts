import { accessTokenState, userInfoSelector } from "@/atoms";
import { ActivityRegisterProps } from "@/const";
import { fetchActivities, fetchActivityRegister } from "@/lib/http/activities";
import { selectorFamily } from "recoil";

export const activitiesQuery = selectorFamily({
    key: "activitiesQuery",
    get: (param: { id: string }) => async ({ get }) => {
        get(userInfoSelector);
        const response = await fetchActivities(param.id);
        if (response.error) {
            throw response.error;
        }
        return response;
    },
});
export const activityRegisterQuery = selectorFamily({
    key: "activityRegisterQuery",
    get: (param: { id: string }) => async ({ get }) => {
        get(userInfoSelector);
        const at = get(accessTokenState);
        if (param.id !== "") {
            const response = await fetchActivityRegister(param.id, at);
            if (response.error) {
                throw response.error;
            }
            return response;
        }
        return { content: [] as ActivityRegisterProps[] }
    },
});