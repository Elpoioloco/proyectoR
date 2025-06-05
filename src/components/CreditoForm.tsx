"use client"
import { useRef, useState, useEffect} from "react"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-toastify";
import Select from "react-select";
import {Check} from "lucide-react";


function CreditForm({ status }: { status: any[] }) {


    interface creditoType{
       
        estatus: string | number;
        creditolimite: string | number;
    }

    const [credito, setcredito] = useState<creditoType>({ 
        estatus: "", 
        creditolimite: ""
      
    });

    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const params = useParams();
    const[success, setSuccess] = useState(false)
    const[error, setError] = useState(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setcredito({ ...credito, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (params?.id) {
            axios.get(`http://localhost:3000/api/credito/${params.id}`)
            .then( (response) => {
                setcredito({
                    estatus: response.data.idce,
                    creditolimite: response.data.creditolimite
    ? response.data.creditolimite.replace(/[$,]/g, '')
    : ''
                })
            })

        }

    }, [params?.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            
                const res = await axios.put(`http://localhost:3000/api/credito/${params.id}`, credito);
                console.log(res.data)
            setSuccess(true)
            setError(null);

                toast.success("credito actualizado", {
                    position: "top-center", 
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
             
            form.current?.reset()
            router.refresh()
            router.push("/credito")

        }catch(error){
            console.log(error)
                toast.error("Credito actualizado", {
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
        setcredito({
            estatus: "",
            creditolimite: ""
        });
        setError(null);
        setSuccess(false);
        form.current?.reset()
        router.refresh()
        router.push("/credito")
    }



    const EstatusOptions = status.map((stat) => ({
        value: stat.idce,
        label: stat.estatus
    }))

    return(
        <form 
        className="bg-white shadow-md rounded-md p-6 w-80 mx-auto flex-col items-center gap-4 border-2 border-gray-300 mt-10"
        ref={form}
        onSubmit={handleSubmit}
        >
       
        <label htmlFor="estatus"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Estatus</label>
        <Select name="estatus" 
        instanceId={"estatus-select"}
        onChange={(selectedOption) => setcredito({ ...credito, estatus: selectedOption?.value })}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        value={EstatusOptions.find((option) => option.value === (credito.estatus))}
        options={EstatusOptions}
        >
        </Select>

         <label htmlFor="creditolimite"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Credito Disponible</label>
        <input name="creditolimite"
        type="text"
        placeholder="Credito Disponible"
        onChange={handleChange}
        value={credito.creditolimite ? credito.creditolimite : ""}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <button type="submit" 
        className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded mt-4"
        ><Check/></button>

        <button type="button"
        onClick={handleCancel} className="bg-red-500 hover:bg-red-800 text-white font-sans py-2 px-4 rounded mt-4">Cancelar</button>
        </form>
    );
}

export default CreditForm