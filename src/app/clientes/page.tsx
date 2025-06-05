import axios from "axios";
import Link from "next/link";
import ClientesTable from "@/components/ClientesTable";


async function loadClientes(){
    const response = await axios.get("http://localhost:3000/api/clientes");
    return response.data.data; 

}

export default async function ClientesPage() {

    const clientes =  await loadClientes();
    return (
        <div>
            <div className="flex justify-center items-center mb-4">
                
                <Link href="/clientes/new" className="bg-green-300 hover:bg-green-500 text-white px-4 py-2 rounded flex justify-between items-center">+</Link>
            </div>
            <div>
                <ClientesTable clientes={clientes} />
            </div>
        </div>
    );
}
