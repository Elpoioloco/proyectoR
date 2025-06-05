"use client"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { Trash2,RotateCw } from "lucide-react";
import axios from "axios";

function ClientesTable({ clientes }: { clientes: any[] }) {
    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();

    return(
        <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">IdCliente</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Nombre</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">ApellidoPat</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">ApellidoMat</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Categoria</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Direccion</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Numero</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map((clientes) =>(
                    <tr key={clientes.idcliente} className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{clientes.idcliente}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{clientes.nombre}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{clientes.apellidopat}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{clientes.apellidomat}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{clientes.categoria}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{clientes.direccion}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{clientes.numero}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                            <button className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded" 
                            onClick={() =>{
                                router.push(`/clientes/edit/${clientes.idpersona}`)
                            }}><RotateCw/></button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-sans py-2 px-4 rounded "
                            onClick={async() => {
                                const res = await axios.delete(`/api/empleados/${clientes.idpersona}`);
                                console.log(res.data);
                                router.refresh();
                            }}
                            ><Trash2/></button>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );

}

export default ClientesTable;