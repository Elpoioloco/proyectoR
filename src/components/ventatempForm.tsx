"use client"
import { useRef, useState} from "react"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-toastify";
import Select from "react-select";



function VentTForm({ inventory }: { inventory: any[] }) {


     interface VentatType{
        inventario: string | number;
        cantidad: string | number;
    }

 const [ventatData, setVentatData] = useState<VentatType>({ 
        inventario: "", 
        cantidad: "" 
    });

    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const params = useParams();
    const[success, setSuccess] = useState(false)
    const[error, setError] = useState(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setVentatData({ ...ventatData, [e.target.name]: e.target.value }); 
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

         try{
            const res = await axios.post("http://localhost:3000/api/ventastemp", ventatData);
            console.log(res.data)
            form.current?.reset()
            router.refresh();
        }catch(error){
            toast.error("error al agregar producto", {
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



    const inventarioOptions = inventory.map((item) => ({
        value: item.idinventario,
        label: item.producto,
    }));

    return(
         <form className="flex items-center gap-2"
    ref={form}
    onSubmit={handleSubmit}
    >
      <label htmlFor="inventario" className="text-white font-bold">Productos</label>
      <Select 
      className="text-sm px-2 py-1 rounded-md w-32" 
       instanceId={"inventario-select"}
       onChange={(selectedOption) => setVentatData({ ...ventatData, inventario: selectedOption?.value })}
       value={inventarioOptions.find((option) => option.value === ventatData.inventario)}
        options={inventarioOptions}
      />
      <label htmlFor="cantidad" className="text-white font-bold">Cantidad</label>
      <input type="text" name="cantidad"  placeholder="Cantidad" onChange={handleChange} className="text-sm px-2 py-1 rounded-md w-24" autoFocus/>
      <button className="bg-[#1d79fa] hover:bg-[#064fb6] text-white font-sans py-2 px-4 rounded" type="submit">
        +
      </button>
    </form>
    );
}

export default VentTForm