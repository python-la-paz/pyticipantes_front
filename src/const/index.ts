/* eslint-disable  @typescript-eslint/no-explicit-any */
export type TokenProps = {
    token: any,
    new: boolean,
};

export type FileBlobProps = {
    name: string;
    url: string;
    content_type: string;
};

export type UserSkillProps = {
    skill: string;
    name: string;
    level: number;
};

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
    programming_languages: UserSkillProps[];
    new: boolean;
    _id?: string;
};

export type GenderProps = {
    _id: string;
    name: string;
};

export type ProfessionProps = {
    _id: string;
    name: string;
};

export type AdditionalInfoType = "text" | "multiple" | "single";

export type AdditionalInfoQuestionProps = {
    question: string;
    type: AdditionalInfoType;
    options: string[];
};

export type AdditionalInfoAnswerProps = {
    question: string;
    type: AdditionalInfoType;
    answer: string | string[];
};

export type EventProps = {
    title: string;
    description: string;
    date: Date;
    location: string;
    location_map?: string;
    image?: FileBlobProps;
    document?: string;
    document_type?: string;
    link?: string;
    link_text?: string;
    public?: boolean;
    quota: number;
    price?: number;
    currency?: string;
    finished?: boolean;
    tags: string[];
    organizers: string[];
    additional_info: AdditionalInfoQuestionProps[];
    document_required?: boolean;
    automatic?: boolean;
    registration_start?: Date | null;
    registration_end?: Date | null;
    _id: string;
};



export type EventRegisterProps = {
    event: string;
    user: string;
    date: Date;
    seat?: number;
    status?: string;
    note?: string;
    document_upload: FileBlobProps | null;
    additional_info?: AdditionalInfoAnswerProps[];
    _id: string;
};

export type PageProps = {
    slug: string;
    title: string;
    html: string;
    _id: string;
};

export type LocationProps = {
    name: string;
    _id: string;
};

export type ProgrammingLanguageProps = {
    name: string;
    _id: string;
};

export type SocialNetworkProps = {
    name: string;
    _id: string;
};

export type ActivityProps = {
    event: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    location_map?: string;
    image?: FileBlobProps;
    document?: string;
    document_type?: string;
    link?: string;
    link_text?: string;
    public?: boolean;
    quota: number;
    price?: number;
    currency?: string;
    finished?: boolean;
    tags?: string[];
    organizers?: string[];
    additional_info?: AdditionalInfoQuestionProps[];
    document_required?: boolean;
    automatic?: boolean;
    registration_start?: Date | null;
    registration_end?: Date | null;
    is_full: boolean;
    _id: string;
}

export type ActivityRegisterProps = {
    activity: string;
    user: string;
    date: Date;
    seat?: number;
    status?: string;
    note?: string;
    document_upload?: FileBlobProps;
    additional_info?: AdditionalInfoAnswerProps[];
    _id: string;
}