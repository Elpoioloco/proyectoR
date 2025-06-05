"use client"
import { useRef, useState, useEffect} from "react"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-toastify";
import {Check} from "lucide-react";


function PreciobForm() {


    interface PreciobType{
        precioslp: number | string ;
    }
      

    const [Preciob, setPreciob] = useState<PreciobType>({ 
        precioslp: 0, 
    });

    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const params = useParams();
    const[success, setSuccess] = useState(false)
    const[error, setError] = useState(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPreciob({ ...Preciob, [e.target.name]: e.target.value });
    };

    useEffect(() => {
            axios.get(`http://localhost:3000/api/productosb/${params.id}`)
            .then( (response) => {
                setPreciob({
                    precioslp: response.data.data.precioslp.replace(/[$,]/g, '')
                })
            })
    }, [params?.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            
                const res = await axios.put(`http://localhost:3000/api/productosb/${params.id}`, Preciob);
                console.log(res.data)
            
            setSuccess(true)
            setError(null);
            
                toast.success("Precio actualizado", {
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
            router.push("/productosb")

        }catch(error){
            console.log(error)
            
            toast.error("Precio no actualizado", {
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
        setPreciob({
            precioslp: "",
        });
        setError(null);
        setSuccess(false);
        form.current?.reset()
        router.refresh()
        router.push("/productosb")
    }

    return(
        <form 
        className="bg-white shadow-md rounded-md p-6 w-80 mx-auto flex-col items-center gap-4 border-2 border-gray-300 mt-10"
        ref={form}
        onSubmit={handleSubmit}
        >
        <label htmlFor="precioslp"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Precio</label>
        <input name="precioslp"
        type="text"
        placeholder="Precio"
        onChange={handleChange}
        value={Preciob.precioslp}
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

export default PreciobForm;