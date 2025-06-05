import VentaClienteForm from "@/components/clienteventaop";
import axios from "axios"
import { redirect } from "next/navigation";
import { getPasoVentaStatus } from "@/actions";


async function loadClientesOp(){
    const response = await axios.get("http://localhost:3000/api/clientetemp")
    return response.data.data; 
}

export default async function RegistrosEPage() {
    const clientop = await loadClientesOp();
    const paso = await getPasoVentaStatus();
    if (paso) {
        redirect('/ventas');
    }
   
    return (
        <div className="flex justify-center items-center mb-4">
            <VentaClienteForm clientop={clientop}/>
        </div>
    )
}
