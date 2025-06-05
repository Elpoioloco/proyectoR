"use client"
import { useRef, useState, useEffect, use } from "react"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-toastify";
import Select from "react-select";


function VentaClienteForm({ clientop }: { clientop: any[]}) {


    interface clientopType{
       
        cliente: string | number;
    }

    const [Clientop, setClientop] = useState<clientopType>({ 
        cliente: "", 
     
    });

    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const params = useParams();
    const[success, setSuccess] = useState(false)
    const[error, setError] = useState(null)


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{

            const res = await axios.post("http://localhost:3000/api/clientetemp", Clientop)
            console.log(res.data)
            form.current?.reset()
            router.refresh()
            router.push("/ventas")

        }catch(error){
            console.log(error)
            
            
            toast.error("Cliente no agregado a la venta", {
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

    const handleCancel = () =>{
        setClientop({
            cliente: "",
        });
        setError(null);
        setSuccess(false);
        form.current?.reset()
        router.refresh()
        router.push("/inicio")
    }

    const ClientesOptions = clientop.map((cl) => ({
        value: cl.idcliente,
        label: cl.cliente
    }))

   
  

    return(
        <form 
        className="bg-white shadow-md rounded-md p-6 w-80 mx-auto flex-col items-center gap-4 border-2 border-gray-300 mt-10"
        ref={form}
        onSubmit={handleSubmit}
        >
        
        <label htmlFor="cliente"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Cliente a Vender</label>
        <Select name="cliente" 
        instanceId={"rol-select"}
        onChange={(selectedOption) =>setClientop({ ...Clientop, cliente: selectedOption?.value })}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        value={ClientesOptions.find((option) => option.value === Clientop.cliente)}
        options={ClientesOptions}
        >
        </Select>


        <button type="submit" 
        className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded mt-4"
        >Iniciar Venta</button>

        <button onClick={handleCancel} className="bg-red-500 hover:bg-red-800 text-white font-sans py-2 px-4 rounded mt-4">Cancelar</button>
        </form>
    );
}

export default VentaClienteForm