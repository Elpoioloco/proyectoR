import { NextResponse } from 'next/server';
import { conn } from '@/libs/database';
import { getUser, getPasoVenta} from '@/actions';

export async function GET() {

  const response= await  conn.query('SELECT * FROM ClienteOpciones')
  const data = response.rows;
  console.log(data)
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const {cliente} = await request.json();
  const user = await getUser();
  try {
    const result = await conn.query('CALL sp_VentaClientes($1, $2) ', [cliente, user]);
    const pasoVenta = await getPasoVenta();
    return NextResponse.json({ message: "Cliente" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al insertar al cliente" }, { status: 500 });
  }
  
}
export async function DELETE(){
  
  try {
    const result = await conn.query('DELETE FROM TempCliente');
    return NextResponse.json({ message: "Cliente eliminado" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al eliminar el cliente" }, { status: 500 });
  }
}