import PreciosLTable from "@/components/ListaPreciosTable";
import axios from "axios";


async function loadPreciosL(){
    const response = await axios.get("http://localhost:3000/api/listaprecios");
    return response.data.data; 

}

export default  async function ListaPPage() {

    const pricel = await loadPreciosL();

    return (
        <div>  
            <div>
                <PreciosLTable pricel={pricel}/>
            </div>
        </div>
    );
}
