import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession } from '@/actions';

export async function GET() {

  const response= await  conn.query('SELECT * FROM EmpleadosT')
  const data = response.rows;
  console.log(data)
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const { nombre, apellidopat, apellidomat, rol, estatus, sucursal, sueldo, usuario, contraseña } = await request.json();
  const session = await getSession();
  const user = session.Usuario
  try {
    const result = await conn.query('CALL sp_agregarEmpleado($1,$2,$3,$4,$5,$6,$7,$8, crypt($9,gen_salt(\'bf\')),$10)', [nombre, apellidopat, apellidomat, rol, estatus, sucursal, sueldo, usuario, contraseña, user]);
   
    return NextResponse.json({ message: "empleado creado" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al insertar el empleado" }, { status: 500 });
  }
  
}