export type UserProps = {
    username: string;
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
    admin: boolean;
    disabled: boolean;
    birthday: Date | null;
    gender: string | null;
    dni: string | null;
    profession: string | null;
    place_profession: string | null;
    residence: string | null;
    level_programming: number;
    phone: string | null;
    data_complete: boolean;
};