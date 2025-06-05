"use client"
import { useRef, useState, useEffect } from "react"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-toastify";
import Select from "react-select";


function EmpleadosNew({ role, status, sucu }: { role: any[]; status: any[]; sucu: any[] }) {


    interface empleadoType{
        nombre: string;
        apellidopat: string;
        apellidomat: string;
        rol: string | number;
        estatus: string | number;
        sucursal: string | number;
        sueldo: string | number;
    }

    const [empleado, setEmpleado] = useState<empleadoType>({ 
        nombre: "", 
        apellidopat: "", 
        apellidomat: "", 
        rol: "1", 
        estatus: "1", 
        sucursal: "1", 
        sueldo: 0 
    });

    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const params = useParams();
    const[success, setSuccess] = useState(false)
    const[error, setError] = useState(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (params?.id) {
            axios.get(`http://localhost:3000/api/empleados/${params.id}`)
            .then( (response) => {
                setEmpleado({
                    nombre: response.data.nombre,
                    apellidopat: response.data.apellidopat,
                    apellidomat: response.data.apellidomat,
                    rol: response.data.idrol,
                    estatus: response.data.idestatuse,
                    sucursal: response.data.idsucursal,
                    sueldo: response.data.sueldo.replace(/[$,]/g, '')
                })
            })

        }

    }, [params?.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{

            const res = await axios.post("http://localhost:3000/api/empleados", empleado);
                toast.success("Empleado creado", {
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
            router.refresh()
            router.push("/empleados")

        }catch(error){
            console.log(error)
          
                toast.error("error al crear empleado", {
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
        setEmpleado({
            nombre: "", 
            apellidopat: "", 
            apellidomat: "", 
            rol: "", 
            estatus: "", 
            sucursal: "", 
            sueldo: "" 
        });
        setError(null);
        setSuccess(false);
        form.current?.reset()
        router.refresh()
        router.push("/empleados")
    }

    const RolOptions = role.map((role) => ({
        value: role.idrol,
        label: role.rol
    }))

    const StatusOptions = status.map((status) => ({
        value: status.idestatuse,
        label: status.estatus
    }))

    const SucursalOptions = sucu.map((sucu) => ({
        value: sucu.idsucursal,
        label: sucu.sucursal
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
        value={empleado.nombre}
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
        value={empleado.apellidopat}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label htmlFor="apellidomat"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Apellido Materno</label>
        <input name="apellidomat"
        type="text"
        placeholder="Apellido Materno"
        onChange={handleChange}
        value={empleado.apellidomat}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label htmlFor="rol"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Rol</label>
        <Select name="rol" 
        instanceId={"rol-select"}
        onChange={(selectedOption) =>setEmpleado({ ...empleado, rol: selectedOption?.value })}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        value={RolOptions.find((option) => option.value === empleado.rol)}
        options={RolOptions}
        >
        </Select>

        <label htmlFor="estatus"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Estatus</label>
        <Select name="estatus" 
        instanceId={"estatus-select"}
        onChange={(selectedOption) =>setEmpleado({ ...empleado, estatus: selectedOption?.value })}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        value={StatusOptions.find((option) => option.value === empleado.estatus)}
        options={StatusOptions}
        >
        </Select>

        <label htmlFor="sucursal"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Sucursal</label>
        <Select name="sucursal" 
        instanceId={"sucursal-select"}
        onChange={(selectedOption) =>setEmpleado({ ...empleado, sucursal: selectedOption?.value })}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        value={SucursalOptions.find((option) => option.value === empleado.sucursal)}
        options={SucursalOptions}
        >
        </Select>

        <label htmlFor="sueldo"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Sueldo</label>
        <input name="sueldo"
        type="text"
        placeholder="Sueldo"
        onChange={handleChange}
        value={empleado.sueldo}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        />
        <label htmlFor="usuario"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Usuario</label>
        <input name="usuario"
        type="text"
        placeholder="Usuario"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        />
        <label htmlFor="contraseña"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Contraseña</label>
        <input name="contraseña"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <button type="submit" 
        className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded mt-4"
        > Guardar</button>

        <button type="button"
        onClick={handleCancel} className="bg-red-500 hover:bg-red-800 text-white font-sans py-2 px-4 rounded mt-4">Cancelar</button>
        </form>
    );
}

export default EmpleadosNew