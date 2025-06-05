import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession } from '@/actions';

export async function GET() {

  const response= await  conn.query('SELECT * FROM ClientesT')
  const data = response.rows;
  console.log(data)
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const { nombre, apellidopat, apellidomat, categoria, direccion, numero } = await request.json();
  const session = await getSession();
  const user = session.Usuario
  if (!nombre || !apellidopat || !apellidomat || !categoria || !direccion || !numero) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }else{
  try {
    const result = await conn.query('CALL sp_agregarClientes($1,$2,$3,$4,$5,$6,$7)', [nombre, apellidopat, apellidomat, categoria, direccion, numero,user]);
   
    return NextResponse.json({ message: "Cliente agregado" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al insertar el Cliente" }, { status: 500 });
  }
}
  
}