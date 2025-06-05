import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession } from '@/actions';


export async function GET( request: Request, context: { params: { id: string } }) {
  const {id}  = await context.params;
  try {
    const response = await conn.query('SELECT * FROM Preciobase WHERE idpreciob = $1', [id]);
    const data = response.rows[0];
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching PrecioB:', error);
    return NextResponse.json({ error: 'Failed to fetch PrecioB' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const {id}  = await context.params;
  const body = await request.json();
  const { precioslp } = body;
  const session = await getSession();
  const user = session.Usuario;

  try {
    const response = await conn.query('CALL sp_ActualizarPrecio($1, $2, $3)',[id, precioslp, user]);
    return NextResponse.json({ message: 'PrecioB created successfully' });
  } catch (error) {
    console.error('Error inserting PrecioB:', error);
    return NextResponse.json({ error: 'Failed to create PrecioB' }, { status: 500 });
  }
}
