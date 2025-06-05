"use client"
import { useRef, useState, useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import {RotateCw } from "lucide-react";



function PreciosBTable({ priceb }: { priceb: any[] }) {
    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
  



    return(
        <div>
            <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">IdPrecioB</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Elemento</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Forma</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Tipo</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Cargo</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Precio</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Actualizar Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {priceb.map((priceb) =>(
                        <tr key={priceb.idpreciob} className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{priceb.idpreciob}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{priceb.elemento}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{priceb.forma}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{priceb.tipo}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap"> {priceb.cargo}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{priceb.precioslp}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap"> 
                                {(priceb.idpreciob !== 1 && priceb.idpreciob !== 7) && (<h1 className="font-bold">Cargo</h1>)}
                                {priceb.idpreciob == 1 && (<h1 className="font-bold">Precio</h1>)}
                                {priceb.idpreciob == 7 && (<h1 className="font-bold">Precio  Cargo</h1>)}
                                {(priceb.idpreciob == 1 || priceb.idpreciob == 7)&& (<button className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded" 
                                onClick={() =>{
                                    router.push(`/productosb/editPrecio/${priceb.idpreciob}`)
                                }}><RotateCw/></button>)}
                                {priceb.idpreciob !== 1 && (<button className="bg-[#0b6efc] hover:bg-[#0254c8] text-white font-sans py-2 px-4 rounded" 
                                onClick={() =>{
                                    router.push(`/productosb/editCargo/${priceb.idpreciob}`)
                                }}><RotateCw/></button>)}
                                </td>
                                
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default PreciosBTable