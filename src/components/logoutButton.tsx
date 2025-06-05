"use client"
import { logout } from "@/actions"
import { useRouter } from "next/navigation"

function LogoutButton() {
    
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout()
            router.push("/login")
            router.refresh()
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
        }
    }

    return (
        <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
        >
            Cerrar sesión
        </button>
    )

}

export default LogoutButton