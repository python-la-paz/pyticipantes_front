import { accessTokenState, eventPageState, userInfoSelector } from "@/atoms";
import { EventRegisterProps } from "@/const";
import { fetchEvent, fetchEventRegister, fetchEvents } from "@/lib/http/events";
import { selector, selectorFamily } from "recoil";

export const eventsQuery = selector({
    key: "eventsQuery",
    get: async ({ get }) => {
        const { page, size } = get(eventPageState);
        const response = await fetchEvents(page, size);
        if (response.error) {
            throw response.error;
        }
        return response;
    },
});
export const eventQuery = selectorFamily({
    key: "eventQuery",
    get: (id: string) => async () => {
        const response = await fetchEvent(id);
        if (response.error) {
            throw response.error;
        }
        return response;
    },
});
export const eventRegisterQuery = selectorFamily({
    key: "eventRegisterQuery",
    get: (param: { id: string }) => async ({ get }) => {
        get(userInfoSelector);
        const at = get(accessTokenState);
        if (param.id !== "") {
            const response = await fetchEventRegister(param.id, at);
            if (response.error) {
                throw response.error;
            }
            return response;
        }
        return { content: [] as EventRegisterProps[] }
    },
});