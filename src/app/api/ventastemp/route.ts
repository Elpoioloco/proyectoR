import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getUser, getPasoVenta } from '@/actions';


export async function POST(request: Request) {
  const { inventario, cantidad } = await request.json();
 const user = await getUser();
  try {
    const result = await conn.query('CALL sp_VentaTemp($1,$2,$3)', [inventario, cantidad, user]);
    
   
    return NextResponse.json({ message: "Venta hecha creado" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al Hacer la venta" }, { status: 500 });
  }
  
}

export async function DELETE(){
  
  try {
    const result = await conn.query('DELETE FROM TempVentas');
    const pasoVenta = await getPasoVenta();
    return NextResponse.json({ message: "Venta Cancelada" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al Cancela la Venta" }, { status: 500 });
  }
}