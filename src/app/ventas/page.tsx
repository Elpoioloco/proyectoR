import VentasTable from "@/components/VentasTable";
import VentTForm from "@/components/ventatempForm";
import DVentForm from "@/components/DVentaForm";
import axios from "axios"
import { getUser, getSucursal, getPasoVentaStatus } from "@/actions";
import { redirect } from "next/navigation";


async function loadTableV(){
   const user = await getUser();
    const response = await axios.get(`http://localhost:3000/api/ventastemp/${user}`)
    return response.data.data; 
}
async function loadInventario(){
    const sucursal = await getSucursal();
    const response = await axios.get(`http://localhost:3000/api/invent/${sucursal}`)
    return response.data.data; 
}

async function loadMetodoPago(){
    const response = await axios.get("http://localhost:3000/api/metodopago")
    return response.data.data;
}

export default async function VentaTPage() {
    const paso = await getPasoVentaStatus();
    if (!paso) {
        redirect('/ventas/newC');
    }

    const venta = await loadTableV();
    const inventory = await loadInventario();
    const metodopago = await loadMetodoPago();
    
    return (
        <div className="flex justify-center items-center mb-4">
            <div className="w-full max-w-6xl">
                <VentasTable venta={venta}/>
            </div>
            <div>
            <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
            {/* ...thead y tbody... */}
            </table>
              {/* Footer fijo abajo */}
            <nav className="bg-gray-400 p-4 w-full rounded-t-md flex items-center justify-between fixed left-0 z-50 bottom-24">
            {/* Izquierda: Form de productos */}
            <VentTForm inventory={inventory}/>
            {/* Derecha: Form de método de pago y total */}
             <div className="flex items-center gap-4">
                <DVentForm metodopago={metodopago}/>
             </div>
           </nav>
          </div>
            
        </div>
    )
}
