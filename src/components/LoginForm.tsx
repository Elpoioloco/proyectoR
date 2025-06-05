"use client"
import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/actions";
import { toast } from "react-toastify";


function LoginForm() {

    interface usuarioType{
        contraseña: string;
        usuario: string;
    }

    const [usuario, setUsuario] = useState<usuarioType>({ 
        usuario: "", 
        contraseña: "" 
    });

    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, e.target.name)
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!usuario.usuario || !usuario.contraseña) {
            toast.error("Por favor, completa todos los campos", {
                position: "top-center", 
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try{
            const res = await login(usuario);
            toast.success("Bienvenido", {
                position: "top-center", 
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            router.push("/inicio")
            form.current?.reset()
            router.refresh()
           
           

        }catch(error) {
            console.log(error)
            toast.error("Usuario o contraseña incorrectos", {
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

    };

    return(

        <form className="font-sans shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
        >
        <label 
        htmlFor="Usuario" 
        className="font-sans block text-gray-700 text-sm mb-2"
        >Usuario
        </label>
        <input 
        type="text" 
        name="usuario"
        placeholder="Usuario"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <label htmlFor="Contraseña"
        className="font-sans block text-gray-700 text-sm mb-2">
        Contraseña
        </label>
        <input 
        type="password"
        name="contraseña"
        placeholder="Contraseña"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
         />
        <button className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded"
        >
            Ingresar
        </button>

        </form>

    );

}


export default LoginForm