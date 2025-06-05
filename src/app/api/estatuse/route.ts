import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';

export async function GET(){
    try{
        const response= await  conn.query('SELECT * FROM EstatusE')
        const data = response.rows;
        return NextResponse.json({ data });
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: "Error al obtener los roles" }, { status: 500 });
    }
    
}