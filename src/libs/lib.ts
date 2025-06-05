import { SessionOptions } from "iron-session";

export interface SessionData{
    userId?: string,
    idSucu?: string,
    RolId?: string,
    paso_venta?: boolean,
    Usuario?: string,
    img?: string,
    isAdmin?: boolean,
    isLoggedIn?: boolean,
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "usu-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    },

}