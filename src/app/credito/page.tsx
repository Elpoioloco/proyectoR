import CreditTable from "@/components/TableCredito";
import axios from "axios";


async function loadCredito(){
    const response = await axios.get("http://localhost:3000/api/credito");
    return response.data.data; 

}

export default  async function CreditPage() {

    const credit = await loadCredito();

    return (
        <div>  
            <div>
                <CreditTable credit={credit}/>
            </div>
        </div>
    );
}

