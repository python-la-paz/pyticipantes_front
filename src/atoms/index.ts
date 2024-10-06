import { atom } from "recoil";

export const loginState = atom({
    key: "loginState",
    default: 0,
});
export const accessTokenState = atom({
    key: 'AccessTokenState',
    default: "",
});