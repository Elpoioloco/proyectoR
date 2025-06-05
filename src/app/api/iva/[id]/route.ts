import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession } from '@/actions';


export async function GET( request: Request, context: { params: { id: string } }) {
  const {id}  = await context.params;
  try {
    const response = await conn.query('SELECT * FROM CargosSinIva WHERE idiva = $1', [id]);
    const data = response.rows[0];
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching Iva:', error);
    return NextResponse.json({ error: 'Failed to fetch Iva' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const {id}  = await context.params;
  const body = await request.json();
  const { flete, seguro, descarga, iva } = body;
  const session = await getSession();
  const user = session.Usuario;

  try {
    const response = await conn.query('CALL sp_Actualizar_Iva($1, $2, $3, $4, $5, $6)',[id, flete, seguro, descarga, iva, user]);
    return NextResponse.json({ message: 'Iva updated successfully' });
  } catch (error) {
    console.error('Error inserting Iva:', error);
    return NextResponse.json({ error: 'Failed to update Iva' }, { status: 500 });
  }
}