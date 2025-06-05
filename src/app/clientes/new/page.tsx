import axios from "axios";
import ClientesForm from "@/components/ClientForm";


async function loadCatc(){
    const response = await axios.get("http://localhost:3000/api/catc");
    return response.data.data; 
}

export default async function CatcPage() {

    const catc =  await loadCatc();
    return(
        <div className="items-center">
            <ClientesForm category={catc} />
        </div>
    );
}