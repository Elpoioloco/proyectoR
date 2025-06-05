import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession } from '@/actions';

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    const result = await conn.query('SELECT * FROM ClientesT WHERE IdPersona=$1', [id]);
    const data = result.rows[0];
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener al cliente" }, { status: 500 });
  }
}

export async function PUT( request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  const { nombre, apellidopat, apellidomat, categoria,direccion ,numero  } = await request.json();
  const session = await getSession();
  const user = session.Usuario
  
  try{
  const result= await conn.query('CALL sp_ActualizarClientes($1,$2,$3,$4,$5,$6,$7,$8)', [id, nombre, apellidopat, apellidomat, categoria, direccion, numero,user]);
  const data = result.rows[0];
  console.log(data)
  return NextResponse.json({ message: "actualizando Cliente" });
  }catch(error){
    console.log(error)
    return NextResponse.json({ error: "Error al actualizar Cliente" }, { status: 500 });
  }
}