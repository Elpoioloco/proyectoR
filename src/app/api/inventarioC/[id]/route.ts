import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';


export async function GET(request: Request, context: { params: { id: string } }) {
  const {id}  = await context.params;
  const response= await  conn.query('SELECT * FROM InventarioProductos WHERE IdInventario = $1' , [id]);
  const data = response.rows;
  console.log(data)
  return NextResponse.json({ data });
 
  
}
