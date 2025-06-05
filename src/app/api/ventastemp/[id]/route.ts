import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';


export async function GET( request: Request, context: { params: { id: string } }) {
    
    const {id}  = await context.params;
    
    try{
        const response= await  conn.query('SELECT * FROM VistaTemporal WHERE IdCliente =(SELECT IdCliente From TempCliente WHERE username= $1)',[id] );
        const data = response.rows;


        return NextResponse.json({ data });
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: "Error al obtener los roles" }, { status: 500 });
    }
    
}