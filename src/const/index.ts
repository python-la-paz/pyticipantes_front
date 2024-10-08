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
    _id?: string;
};

export type GenderProps = {
    name: string;
    _id: string;
};

export type EventProps = {
    title: string;
    description: string;
    date: Date;
    location: string;
    location_map?: string;
    image?: string;
    document?: string;
    document_type?: string;
    link?: string;
    link_text?: string;
    public?: boolean;
    quota?: number;
    price?: number;
    currency?: string;
    finished?: boolean;
    tags?: string[];
    organizers?: string[];
    additional_info?: string[];
    document_required?: boolean;
    automatic?: boolean;
    _id: string;
};

export type EventRegisterProps = {
    event: string;
    user: string;
    date: Date;
    seat?: number;
    status?: string;
    note?: string;
    document_upload?: string;
    additional_info?: string[];
    _id: string;
};