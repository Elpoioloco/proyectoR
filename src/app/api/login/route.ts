import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';



export async function POST(request: Request) {
    try{
        const{usuario, contraseña} = await request.json();
        
        const result = await conn.query('SELECT * FROM RETUsuario($1,$2)', [usuario, contraseña]);
        const data = result.rows[0];
        if (!data) {
          return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });

        }
        else{
           return NextResponse.json({ message: "inicio de sesion exitoso", idemp: data.idemp, idr: data.idr, username: data.username, ids: data.idr},{ status: 200 });
        }
   
    }catch(error) {
        console.log(error)
        return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 });
    }
}