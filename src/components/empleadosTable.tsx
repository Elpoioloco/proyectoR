"use client"
import { useRef, useState, useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import { Trash2,RotateCw } from "lucide-react";
import axios from "axios";

function EmpleadosTable({ employees }: { employees: any[] }) {
    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();

    return(
        <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">IdEmpleado</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Nombre</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">ApellidoPat</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">ApellidoMat</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Rol</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Estatus</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Sucursal</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Sueldo</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employees) =>(
                    <tr key={employees.idempleado} className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.idempleado}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.nombre}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.apellidopat}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.apellidomat}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.rol}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.estatus}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.sucursal}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.sueldo}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                            <button className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded" 
                            onClick={() =>{
                                router.push(`/empleados/edit/${employees.idpersona}`)
                            }}><RotateCw/></button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-sans py-2 px-4 rounded "
                            onClick={async() => {
                                const res = await axios.delete(`/api/empleados/${employees.idpersona}`);
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

export default EmpleadosTable