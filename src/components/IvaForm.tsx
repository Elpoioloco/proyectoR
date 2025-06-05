"use client"
import { useRef, useState, useEffect} from "react"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-toastify";
import {Check} from "lucide-react";


function IvaForm() {


    interface IvaType{
        flete: number | string ;
        seguro: number | string ;
        descarga: number | string ;
        iva: number | string ;
    }
      

    const [Iva, setIva] = useState<IvaType>({ 
        flete: 0,
        seguro: 0,
        descarga: 0,
        iva: 0, 
    });

    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const params = useParams();
    const[success, setSuccess] = useState(false)
    const[error, setError] = useState(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setIva({ ...Iva, [e.target.name]: e.target.value });
    };

    useEffect(() => {
            axios.get(`http://localhost:3000/api/iva/${params.id}`)
            .then( (response) => {
                setIva({
                    flete: response.data.data.flete.replace(/[$,]/g, ''),
                    seguro: response.data.data.seguro.replace(/[$,]/g, ''),
                    descarga: response.data.data.descarga.replace(/[$,]/g, ''),
                    iva: response.data.data.iva.replace(/[$,]/g, '')
                })
            })
    }, [params?.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            
                const res = await axios.put(`http://localhost:3000/api/iva/${params.id}`, Iva);
                console.log(res.data)
            
            setSuccess(true)
            setError(null);
            
                toast.success("Iva actualizado", {
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
            router.push("/iva")

        }catch(error){
            console.log(error)
            
            toast.error("Iva no actualizado", {
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
        setIva({
            flete: "",
            seguro: "",
            descarga: "",
            iva: "",
        });
        setError(null)
        setSuccess(false);
        form.current?.reset()
        router.refresh()
        router.push("/iva")
    }

    return(
        <form 
        className="bg-white shadow-md rounded-md p-6 w-80 mx-auto flex-col items-center gap-4 border-2 border-gray-300 mt-10"
        ref={form}
        onSubmit={handleSubmit}
        >
        <label htmlFor="flete"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Flete</label>
        <input name="flete"
        type="text"
        placeholder="Flete"
        onChange={handleChange}
        value={Iva.flete}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        autoFocus
         />

        <label htmlFor="seguro"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Seguro</label>
        <input name="flete"
        type="text"
        placeholder="Seguro"
        onChange={handleChange}
        value={Iva.seguro}
        className="shadow appearance-none border rounded w-full py-2 px-3"
         />

        <label htmlFor="descarga"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Descarga</label>
        <input name="descarga"
        type="text"
        placeholder="Descarga"
        onChange={handleChange}
        value={Iva.descarga}
        className="shadow appearance-none border rounded w-full py-2 px-3"
         />

         <label htmlFor="iva"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Iva</label>
        <input name="iva"
        type="text"
        placeholder="Iva"
        onChange={handleChange}
        value={Iva.iva}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        autoFocus
         />

        <button type="submit" 
        className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded mt-4"
        ><Check/></button>

        <button type="button"
        onClick={handleCancel} className="bg-red-500 hover:bg-red-800 text-white font-sans py-2 px-4 rounded mt-4">Cancelar</button>
        </form>
    );
}

export default IvaForm;