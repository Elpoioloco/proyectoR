"use client"


function EmpleadosRTable({ employeesR }: { employeesR: any[] }) {


    return(
        <table className="max-w-screen-lg bg-white shadow-md rounded-md w-auto border-collapse border border-gray-300 item-center mx-auto mt-10">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">IdMovimiento</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Campo Cambiado</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">User</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Accion</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Valor Anterior</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Valor Actual</th>
                    <th className="py-3 px-6 text-left shadow appearance-none border rounded text-center whitespace-nowrap">Fecha</th>
                    
                </tr>
            </thead>
            <tbody>
                {employeesR.map((employees) =>(
                    <tr key={employees.idremp} className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.idremp}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.tabla}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.username}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.accion}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.valant}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.valact}</td>
                        <td className="shadow appearance-none border rounded py-3 px-4 text-center whitespace-nowrap">{employees.fecha}</td>
                       
                    </tr>
                ))}
            </tbody>
        </table>
    );

}

export default EmpleadosRTable