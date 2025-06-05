"use client"
import {  useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {RotateCw, Funnel} from "lucide-react";
import { getAdmin } from "@/actions";


function ProductsTable({ products }: { products: any[] }) {
    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [searchValue, setSearchValue] = useState<"nombre" | "categoria">("nombre");
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
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
        setFilteredProducts(products);
    },[])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
       console.log(e.target.value);
       setSearch(e.target.value);
       if(search.length>0){
        const filterValues = products.filter( q =>{
            return q[searchValue].toLowerCase().includes(e.target.value.toLowerCase()) 
        });
        setFilteredProducts(filterValues);
       }
    }

 
    return(
        <div>
            <div className="flex items-center justify-center p-4">
                <input type="text" placeholder="Buscar" value={search} onChange={handleSearch} 
                className="block w-1/4 rounded-md border-gray-300 border-solid border border-inherit py-2 px-4 mb-4 mt-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                />
                <div className="relative">
                <button onClick={toggleDropdown} className="rounded-md border-gray-300 border-solid border border-inherit py-2 px-4 mb-4 mt-10 hover:bg-gray-400"><Funnel/></button>
                {isOpen && (
                    <div className="absolute left-0 w-40 bg-white shadow-lg rounded-md mt-2 z-10 transition-all duration-200 transform origin-top scale-100 opacity-100">
                        <button onClick={() => {setSearchValue("nombre"); setIsOpen(false);}} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Tipo</button>
                        <button onClick={() => {setSearchValue("categoria"); setIsOpen(false);}} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Producto</button>
                    </div>
                )}
                </div>
            </div>
        <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">IdProducto</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Producto</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Tipo</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Cargo Extra</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">LAB B</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">PUBLICO 1</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">HERRERO 2</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">HERRERO 3</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">HERRERO 4</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">MAYOREO 1</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">MAYOREO 2</th>
                    {isAdmin && <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Actualizar Cargo Extra</th>}
                </tr>
            </thead>
            <tbody>
                {filteredProducts.map((products) =>(
                    <tr key={products.idproducto} className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.idproducto}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.categoria}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.nombre}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.cargoextra}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.lab_b}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.publico_1}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.herrero_2}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.herrero_3}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.herrero_4}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.mayoreo_1}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{products.mayoreo_2}</td>
                        {isAdmin && <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                            <button className="bg-[#00E71C] hover:bg-[#0DA51F] text-white font-sans py-2 px-4 rounded" 
                            onClick={() =>{
                                router.push(`/productos/edit/${products.idproducto}`)
                            }}><RotateCw/></button>
                        </td>}

                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );

}

export default ProductsTable;