import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession } from '@/actions';

export async function GET(request: Request, context: { params: { id: string } }) {
  const {id}  = await context.params;
  const response= await  conn.query('SELECT * FROM InventarioProductos WHERE IdSucursal = $1' , [id]);
  const data = response.rows;
  console.log(data)
  return NextResponse.json({ data });
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  const body = await request.json();
  const { cantidad } = body;
  const session = await getSession();
  const user = session.Usuario;

  try {
    const response = await conn.query('CALL sp_AgregarInventario($1, $2, $3)',[id, cantidad, user]);
    return NextResponse.json({ message: "Prodcuto actualizado" });
  } catch (error) {
    console.error('Error updating CargoExtra:', error);
    return NextResponse.json({ error: 'Failed to update CargoExtra' }, { status: 500 });
  }
}