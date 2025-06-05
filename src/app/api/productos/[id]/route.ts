import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession } from '@/actions';


export async function GET( request: Request, context: { params: { id: string } }) {
  const {id}  = await context.params;
  try {
    const response = await conn.query('SELECT * FROM TablaProductos WHERE idproducto = $1', [id]);
    const data = response.rows[0];
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching PrecioB:', error);
    return NextResponse.json({ error: 'Failed to fetch PrecioB' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  const body = await request.json();
  const { cargoextra } = body;
  const session = await getSession();
  const user = session.Usuario;

  try {
    const response = await conn.query('CALL sp_ActualizarCargoExtra($1, $2, $3)',[id, cargoextra, user]);
    return NextResponse.json({ message: "Prodcuto actualizado" });
  } catch (error) {
    console.error('Error updating CargoExtra:', error);
    return NextResponse.json({ error: 'Failed to update CargoExtra' }, { status: 500 });
  }
}

