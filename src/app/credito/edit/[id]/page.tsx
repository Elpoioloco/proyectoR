import axios from "axios";
import CreditForm from "@/components/CreditoForm";

async function loadCredstatus(){
    const response = await axios.get("http://localhost:3000/api/creditoestatus");
    return response.data.data; 
}

export default async function CatcPage() {

    const status =  await loadCredstatus();
    return(
        <div className="items-center">
            <CreditForm status={status} />
        </div>
    );
}