"use client"
import {  useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {RotateCw} from "lucide-react";
import { getAdmin } from "@/actions";


function CreditTable({ credit }: { credit: any[] }) {
    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<any>(false);

    useEffect(() => {
        const checkAdmin = async () => {
            const adminStatus = await getAdmin();
            setIsAdmin(adminStatus);
        };
        checkAdmin();
    }, []);

  

 
    return(
        <div>
        <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">IdCredito</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Cliente</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Estatus</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Credito Limite</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Credito Usado</th>
                    {isAdmin && <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Acciones</th>}
                </tr>
            </thead>
            <tbody>
                {credit.map((credit) =>(
                    <tr key={credit.idcredito} className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{credit.idcredito}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{credit.cliente}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{credit.estatus}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{credit.creditolimite}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{credit.credito}</td>
                        {isAdmin && <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                            <button className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded" 
                            onClick={() =>{
                                router.push(`/credito/edit/${credit.idcredito}`)
                            }}><RotateCw/></button>
                        </td>}

                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );

}

export default CreditTable;