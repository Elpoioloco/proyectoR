import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession } from '@/actions';

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    const result = await conn.query('SELECT * FROM EmpleadosT WHERE IdPersona=$1', [id]);
    const data = result.rows[0];
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener el producto" }, { status: 500 });
  }
}

export async function PUT( request: Request, context: { params: { id: string } }) {
  const {id}  = await context.params;
  const { nombre, apellidopat, apellidomat, rol, estatus, sucursal, sueldo } = await request.json();
  const session = await getSession();
  const user = session.Usuario
  if (!nombre || !apellidopat || !apellidomat || !rol || !estatus || !sucursal || !sueldo) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }
  
  try{
  const result= await conn.query('CALL sp_ActualizarEmpleados($1,$2,$3,$4,$5,$6,$7,$8,$9)', [id, nombre, apellidopat, apellidomat, rol, estatus, sucursal, sueldo,user]);
  const data = result.rows[0];
  console.log(data)
  return NextResponse.json({ message: "actualizando un producto" });
  }catch(error){
    console.log(error)
    return NextResponse.json({ error: "Error al actualizar el producto" }, { status: 500 });
  }
}

export async function DELETE( request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  const session = await getSession();
  const user = session.Usuario
  try {
    const result = await conn.query('CALL sp_EliminarPersonas($1,$2)', [id, user]);
    const data = result.rows[0];
    console.log(data)
    return NextResponse.json({ message: "eliminando empleado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar el producto" }, { status: 500 });
  }
    
  
}

