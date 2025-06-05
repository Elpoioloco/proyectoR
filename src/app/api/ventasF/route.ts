import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession, getPasoVenta } from '@/actions';


export async function POST(request: Request) {
    const {metodopago} = await request.json();
    const session = await getSession();
    const user = session.Usuario;

    console.log(metodopago, user);
    try {
        const res= await conn.query('CALL sp_AceptarVenta($1,$2)', [ metodopago, user]);
        const pasoVenta = await getPasoVenta();
        return NextResponse.json({ message: "Venta hecha creado" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error al Hacer la venta" }, { status: 500 });
    }
}
