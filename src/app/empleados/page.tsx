"use client"
import EmpleadosTable from "@/components/empleadosTable";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


async function loadEmpleados(){
    const response = await axios.get("http://localhost:3000/api/empleados");
    return response.data.data; 

}

export default function EmpleadosPage() {
    const [employees, setEmployees] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadEmpleados();
            setEmployees(data);
        };
        fetchData();
    }, []);

    console.log(employees)
    return (
        <div>
            <div className="flex justify-center items-center mb-4">
                
                <Link href="/empleados/new" className="bg-green-300 hover:bg-green-500 text-white px-4 py-2 rounded flex justify-between items-center">+</Link>
            </div>
            <div>
                <EmpleadosTable employees={employees}/>
            </div>
        </div>
    );
}
