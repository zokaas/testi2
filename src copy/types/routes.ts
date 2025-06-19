export enum E_Routes {
    ROOT = "/",
    LANDING_PAGE = "/start/:uuid",
    START = "/start",
    APPLICATION = "/application",
    PREVIEW = "/preview",
    APPLICATION_UUID_NULL = "/application/null",
    APPLICATION_UUID = "/application/:uuid",
    AUTHENTICATE = "/authenticate",
    FORBIDDEN = "/forbidden",
    EXPIRED = "/expired",
    ERROR = "/error",
    THANK_YOU = "/thank-you",
    ALL_OTHERS = "*",
}

export type T_StartPagePayload = {
    uuid: string;
};

export type TApplicationParam = { uuid: string | undefined };
