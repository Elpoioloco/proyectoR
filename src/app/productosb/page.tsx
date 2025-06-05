import PreciosBTable from "@/components/PreciosBTable";
import axios from "axios";


async function loadPreciosB(){
    const response = await axios.get("http://localhost:3000/api/productosb");
    return response.data.data; 

}

export default  async function ProductosbPage() {

    const priceb = await loadPreciosB();

    return (
        <div>  
            <div>
                <PreciosBTable priceb={priceb}/>
            </div>
        </div>
    );
}
