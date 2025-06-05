"use client"
import { useRef, useState, useEffect} from "react"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-toastify";
import Select from "react-select";
import {Check} from "lucide-react";


function ClientesForm({ category }: { category: any[] }) {


    interface clienteType{
        nombre: string;
        apellidopat: string;
        apellidomat: string;
        categoria: string | number;
        direccion: string ;
        numero: string | number;
    }

    const [cliente, setcliente] = useState<clienteType>({ 
        nombre: "", 
        apellidopat: "", 
        apellidomat: "", 
        categoria: "1", 
        direccion: "", 
        numero: ""
    });

    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const params = useParams();
    const[success, setSuccess] = useState(false)
    const[error, setError] = useState(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setcliente({ ...cliente, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (params?.id) {
            axios.get(`http://localhost:3000/api/clientes/${params.id}`)
            .then( (response) => {
                setcliente({
                    nombre: response.data.nombre,
                    apellidopat: response.data.apellidopat,
                    apellidomat: response.data.apellidomat,
                    categoria: response.data.idcatc,
                    direccion: response.data.direccion,
                    numero: response.data.numero
                })
            })

        }

    }, [params?.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            if(!params.id){
              
                const res = await axios.post("http://localhost:3000/api/clientes", cliente);
                console.log(res.data)

            }else{
                const res = await axios.put(`http://localhost:3000/api/clientes/${params.id}`, cliente);
                console.log(res.data)
            }
            setSuccess(true)
            setError(null);

            if(success && !params.id){
                  toast.success("cliente creado", {
                    position: "top-center", 
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }else if(success && params.id){
                toast.success("cliente actualizado", {
                    position: "top-center", 
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
             
            form.current?.reset()
            router.refresh()
            router.push("/clientes")

        }catch(error){
            console.log(error)
            if(params.id){
                toast.error("cliente no actualizado", {
                    position: "top-center", 
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }else{
                toast.error("cliente no creado", {
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
    }

    const handleCancel = () =>{
        setcliente({
            nombre: "", 
            apellidopat: "", 
            apellidomat: "", 
            categoria: "", 
            direccion: "", 
            numero: ""
        });
        setError(null);
        setSuccess(false);
        form.current?.reset()
        router.refresh()
        router.push("/clientes")
    }



    const CategoriaOptions = category.map((cat) => ({
        value: cat.idcatc,
        label: cat.categoria
    }))

    return(
        <form 
        className="bg-white shadow-md rounded-md p-6 w-80 mx-auto flex-col items-center gap-4 border-2 border-gray-300 mt-10"
        ref={form}
        onSubmit={handleSubmit}
        >
        <label htmlFor="nombre"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Nombre</label>
        <input name="nombre"
        type="text"
        placeholder="Nombre"
        onChange={handleChange}
        value={cliente.nombre}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        autoFocus
         />

        <label htmlFor="apellidopat"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Apellido Paterno</label>
        <input name="apellidopat"
        type="text"
        placeholder="Apellido Paterno"
        onChange={handleChange}
        value={cliente.apellidopat}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label htmlFor="apellidomat"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Apellido Materno</label>
        <input name="apellidomat"
        type="text"
        placeholder="Apellido Materno"
        onChange={handleChange}
        value={cliente.apellidomat}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label htmlFor="categoria"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Categoria</label>
        <Select name="categoria" 
        instanceId={"categoria-select"}
        onChange={(selectedOption) => setcliente({ ...cliente, categoria: selectedOption?.value })}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        value={CategoriaOptions.find((option) => option.value === (cliente.categoria))}
        options={CategoriaOptions}
        >
        </Select>

         <label htmlFor="direccion"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Direccion</label>
        <input name="direccion"
        type="text"
        placeholder="direccion"
        onChange={handleChange}
        value={cliente.direccion}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        />

         <label htmlFor="numero"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Numero</label>
        <input name="numero"
        type="text"
        placeholder="212212341"
        onChange={handleChange}
        value={cliente.numero}
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

export default ClientesForm