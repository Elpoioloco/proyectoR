"use client"
import { useRef} from "react"
import { useRouter } from "next/navigation"

function PreciosLTable({ pricel }: { pricel: any[] }) {
    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
  



    return(
        <div>
            <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">IdPrecios</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Producto</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Costo Base</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Costo neto</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Sin Iva</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Publico 1</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Herrero 2</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Herrero 3</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Herrero 4</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Mayoreo 1</th>
                        <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Mayoreo 2</th>
                    </tr>
                </thead>
                <tbody>
                    {pricel.map((pricel, index) =>(
                        <tr key={pricel.idprecios} className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{pricel.idprecios}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{pricel.producto}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{pricel.precioslp}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{pricel.costoneto}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap"> {pricel.siniva}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{pricel.publico_1}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{pricel.herrero_2}</td>   
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{pricel.herrero_3}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{pricel.herrero_4}</td> 
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{pricel.mayoreo_1}</td>
                            <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{pricel.mayoreo_2}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default PreciosLTable