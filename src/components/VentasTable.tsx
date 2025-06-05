"use client"
import { useRef, useState } from "react"
import Select from "react-select";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";


function VentasTable({ venta }: { venta: any[];}) {
    


    return(
        <div>
        <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Producto</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Precio</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Cantidad</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Monto</th>
                </tr>
            </thead>
            <tbody>
                {venta.map((venta) =>(
                    <tr key={venta.idinventario} className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{venta.producto}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{venta.precio}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{venta.cantidad}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{venta.monto}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );

}

export default VentasTable;