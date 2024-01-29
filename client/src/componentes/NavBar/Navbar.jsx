import { Link } from "react-router-dom"
import { useAuth } from "../../contexto/AuthProvider";

export default function Navbar(){
    const { user } = useAuth();
    return (
        <div className="bg-neutral-950 rounded-md flex justify-end px-2 py-2 w-full border-2 border-red-400">
                <ul className="flex gap-x-1">
                    <li>
                        <Link to="/" className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1">Inicio</Link>
                    </li>
                    <li>
                       {user.username && <Link to="/perfil" className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1">Perfil</Link> }
                    </li>
                    <li>
                        { !user.username && <Link to="/login" className="focus:outline-none focus:ring focus:border-blue-400 bg-slate-200 text-gray-700 rounded px-2 py-1">Iniciar Sesión</Link> }
                    </li>
                </ul>
        </div>
    )
}