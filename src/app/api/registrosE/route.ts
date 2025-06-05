import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';

export async function GET() {

  const response= await  conn.query('SELECT * FROM RegistrosEmpleados')
  const data = response.rows;
  console.log(data)
  return NextResponse.json({ data });
}
