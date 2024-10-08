import { atom } from "recoil";

export const loginState = atom({
    key: "loginState",
    default: 0,
});
export const accessTokenState = atom({
    key: 'AccessTokenState',
    default: "",
});
export const eventPageState = atom({
    key: "EventPageState",
    default: { page: 1, size: 1000 },
});