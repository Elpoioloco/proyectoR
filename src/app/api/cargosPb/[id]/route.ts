import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession } from '@/actions';


export async function PUT(request: Request, context: { params: { id: string } }) {
  const {id}  = await context.params;
  const body = await request.json();
  const { cargo } = body;
  const session = await getSession();
  const user = session.Usuario;

  try {
    const response = await conn.query('CALL sp_ActualizarCargo($1, $2, $3)',[id, cargo, user]);
    return NextResponse.json({ message: 'PrecioB created successfully' });
  } catch (error) {
    console.error('Error inserting PrecioB:', error);
    return NextResponse.json({ error: 'Failed to create PrecioB' }, { status: 500 });
  }
}