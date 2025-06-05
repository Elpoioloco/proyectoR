import EmpleadosRTable from "@/components/registrosETable"
import axios from "axios"

async function loadEmpleadosR(){
    const response = await axios.get("http://localhost:3000/api/registrosE")
    return response.data.data; 
}

export default async function RegistrosEPage() {
    const empleadosR = await loadEmpleadosR()
    console.log(empleadosR)
    return (
        <div className="flex justify-center items-center mb-4">
            <EmpleadosRTable employeesR={empleadosR}/>
        </div>
    )
}
