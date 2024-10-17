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
export const dialogOpenState = atom({
    key: "DialogOpenState",
    default: false,
});
export const userInfoSelector = atom({
    key: "UserInfoSelector",
    default: 0,
});