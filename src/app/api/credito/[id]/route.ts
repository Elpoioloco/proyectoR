import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getUser } from '@/actions';

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    const result = await conn.query('SELECT * FROM Credito WHERE IdCredito=$1', [id]);
    const data = result.rows[0];
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener el producto" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  const body = await request.json();
  const {estatus, creditolimite} = body;
const user = await getUser();

  try {
    const result = await conn.query('CALL sp_ActualizarCredito($1, $2, $3, $4)', [id, estatus, creditolimite, user]);
    return NextResponse.json({ message: "Credito actualizado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar el credito" }, { status: 500 });
  }
}