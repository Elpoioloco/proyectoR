import IvaTable from "@/components/IvaTable";
import axios from "axios";


async function loadIva(){
    const response = await axios.get("http://localhost:3000/api/iva");
    return response.data.data; 

}

export default  async function IvaPage() {

    const iva = await loadIva();

    return (
        <div>  
            <div>
                <IvaTable iva={iva}/>
            </div>
        </div>
    );
}

