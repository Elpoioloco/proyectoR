'use server'
import { getIronSession } from "iron-session"
import { sessionOptions, SessionData, defaultSession } from "./libs/lib"
import { cookies } from "next/headers"
import axios from "axios"


export const getSession = async () => {

    const cookieStore =  await cookies()
    
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;

    }

    return session;
}
export const login = async (formData:any) => {

    const session = await getSession();
    const {usuario, contraseña} = formData;

    const res = await axios.post('http://localhost:3000/api/login', {
        usuario: usuario, 
        contraseña: contraseña
    })

    session.userId = res.data.idemp;
    session.idSucu = res.data.ids;
    session.RolId = res.data.idr;
    session.Usuario = res.data.username;
    session.isAdmin = res.data.idr === 1;
    session.isLoggedIn = true;
    session.paso_venta = false;
    await session.save()
}
export const logout = async () => {
    const session = await getSession();
    session.destroy()
    
}

export const getAdmin = async () => {
    const session = await getSession();
    return session.isAdmin;
}

export const getUser = async () => {
    const session = await getSession();
    return session.Usuario;
}

export const getSucursal = async () => {
    const session = await getSession();
    return session.idSucu;
}

export const getPasoVenta = async () => {
    const session = await getSession();
    session.paso_venta = !session.paso_venta;
    await session.save();
}

export const getPasoVentaStatus = async () => {
    const session = await getSession();
    return session.paso_venta;
}