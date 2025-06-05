import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getSession } from '@/actions';

export async function GET(request: Request) {
 
    const session = await getSession();
    const sucursal = session.idSucu; 
  console
  const response= await  conn.query('SELECT * FROM InventarioProductos WHERE Cantidad > 0 AND IdSucursal = $1', [sucursal]);
  const data = response.rows;
  console.log(data)
  return NextResponse.json({ data });
 
  
}

