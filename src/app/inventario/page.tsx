import InventoryTable from "@/components/InventarioTable";
import axios from "axios";
import { getAdmin, getSucursal } from "@/actions";

async function loadInventario(){
    const response = await axios.get("http://localhost:3000/api/inventario");
    return response.data.data; 

}

async function loadInventarioSucu(){
    const sucursal = await getSucursal();
    const response = await axios.get(`http://localhost:3000/api/inventario/${sucursal}`);
    return response.data.data; 

}

export default  async function InventPage() {
    const isAdmin = await getAdmin();
    let invent;
    if(isAdmin){
        invent = await loadInventario();
    }
    else{
        invent = await loadInventarioSucu();
    }

    return (
        <div>  
            <div>
                <InventoryTable invent={invent}/>
            </div>
        </div>
    );
}

