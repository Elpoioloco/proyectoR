"use client"
import {  useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {RotateCw, Funnel} from "lucide-react";
import { getAdmin } from "@/actions";


function InventoryTable({ invent }: { invent: any[] }) {
    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [searchValue, setSearchValue] = useState<"producto" | "sucursal">("producto");
    const [filteredInvent, setFilteredInvent] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState<any>(false);

    useEffect(() => {
        const checkAdmin = async () => {
            const adminStatus = await getAdmin();
            setIsAdmin(adminStatus);
        };
        checkAdmin();
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setFilteredInvent(invent);
    },[])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
       console.log(e.target.value);
       setSearch(e.target.value);
       if(search.length>0){
        const filterValues = invent.filter( q =>{
            return q[searchValue].toLowerCase().includes(e.target.value.toLowerCase()) 
        });
        setFilteredInvent(filterValues);
       }
    }

 
    return(
        <div>
            <div className="flex items-center justify-center p-4">
                <input type="text" placeholder="Buscar" value={search} onChange={handleSearch} 
                className="block w-1/4 rounded-md border-gray-300 border-solid border border-inherit py-2 px-4 mb-4 mt-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                />
                {isAdmin && <div className="relative">
                <button onClick={toggleDropdown} className="rounded-md border-gray-300 border-solid border border-inherit py-2 px-4 mb-4 mt-10 hover:bg-gray-400"><Funnel/></button>
                {isOpen && (
                    <div className="absolute left-0 w-40 bg-white shadow-lg rounded-md mt-2 z-10 transition-all duration-200 transform origin-top scale-100 opacity-100">
                        <button onClick={() => {setSearchValue("producto"); setIsOpen(false);}} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Producto</button>
                        <button onClick={() => {setSearchValue("sucursal"); setIsOpen(false);}} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Sucursal</button>
                    </div>
                )}
                </div>}
            </div>
        <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">IdProducto</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Producto</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Sucursal</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Cantidad</th>
                    {isAdmin && <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Agregar stock</th>}
                </tr>
            </thead>
            <tbody>
                {filteredInvent.map((invent) =>(
                    <tr key={invent.idinventario} className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{invent.idproducto}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{invent.producto}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{invent.sucursal}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{invent.cantidad}</td>
                        {isAdmin && <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                            <button className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded" 
                            onClick={() =>{
                                router.push(`/inventario/edit/${invent.idinventario}`)
                            }}><RotateCw/></button>
                        </td>}

                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );

}

export default InventoryTable;