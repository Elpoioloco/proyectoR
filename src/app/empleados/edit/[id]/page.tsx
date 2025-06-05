import axios from "axios";
import EmpleadosForm from "@/components/EmpleadosForm";



async function loadRol(){
    const role = await axios.get("http://localhost:3000/api/rol")
    return role.data.data;
}
async function loadStatus(){
    const status = await axios.get("http://localhost:3000/api/estatuse")
    return status.data.data;
}
async function loadSucursal(){
    const sucu = await axios.get("http://localhost:3000/api/sucursal")
    return sucu.data.data;
}

export default async function EmpleadosF() {
    const role = await loadRol();
    const status = await loadStatus();
    const sucu = await loadSucursal();

    return (
        <div className="items-center" >
            <EmpleadosForm role={role} status={status} sucu={sucu}/>
        </div>
    );
   
}