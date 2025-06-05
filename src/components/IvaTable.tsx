"use client"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { RotateCw } from "lucide-react";


function IvaTable({ iva }: { iva: any[] }) {
    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();

    return(
        <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Flete</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Seguro</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Descarga</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Iva</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Actualizar valores</th>
                </tr>
            </thead>
            <tbody>
                {iva.map((iva) =>(
                    <tr key={iva.idiva} className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{iva.flete}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{iva.seguro}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{iva.descarga}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{iva.iva}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                            <button className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded" 
                            onClick={() =>{
                                router.push(`/iva/edit/${iva.idiva}`)
                            }}><RotateCw/></button>

                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );

}

export default IvaTable;