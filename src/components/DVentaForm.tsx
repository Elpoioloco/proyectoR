"use client"
import { useRef, useState} from "react"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-toastify";
import Select from "react-select";



function DVentForm({ metodopago }: { metodopago: any[] }) {


    interface DVentaType {
        metodoPago: string | number;
       
    }

    const [dventaData, setDventaData] = useState<DVentaType>({ 
        metodoPago: ""
    });

    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const params = useParams();
    const[success, setSuccess] = useState(false)
    const[error, setError] = useState(null)


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
         try{
            const res = await axios.post("http://localhost:3000/api/ventasF", dventaData);
            toast.success("Venta finalizada", {
                position: "top-center", 
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(res.data)
            form.current?.reset()
            router.refresh();
            setSuccess(true);
            setError(null);
            router.push("/inicio");
        }catch(error){
            console.log(error);
            toast.error("error al finalizar venta", {
                position: "top-center", 
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

     const handleCancel = async() => {
       
        setDventaData({
            metodoPago: "",
           
        });
        const res =  await axios.delete(`http://localhost:3000/api/ventastemp/`);
        const res2 = await axios.delete(`http://localhost:3000/api/clientetemp/`);
        setError(null);
        setSuccess(false);
        form.current?.reset();
        router.refresh();
        router.push("/inicio");
    };




   const metodoPagoOptions = metodopago.map((item) => ({
        value: item.idmetodopago,
        label: item.metodopago,
    }));

    return(
         <form className="flex items-center gap-2"
    ref={form}
    onSubmit={handleSubmit}
    >
      <label htmlFor="metodopago" className="text-white font-bold">Metodo de Pago</label>
        <Select 
        className="text-sm px-2 py-1 rounded-md w-32" 
        instanceId={"metodopago-select"}
        onChange={(selectedOption) => setDventaData({ ...dventaData, metodoPago: selectedOption?.value })}
        value={metodoPagoOptions.find((option) => option.value === dventaData.metodoPago)}
        options={metodoPagoOptions}
        />
        <button className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans rounded py-2 px-4 whitespace-nowrap" type="submit">
          Terminar Venta
        </button>
        <button className="bg-[#FF0000] hover:bg-[#B20000] text-white font-sans rounded py-2 px-4 whitespace-nowrap" type="button" onClick={handleCancel}>
          Cancelar
        </button>
    </form>
    );
}

export default DVentForm