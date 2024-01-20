import { Link } from "react-router-dom"
import { useAuth } from "../../contexto/AuthProvider";

export default function Navbar(){
    const { user } = useAuth();
    return (
        <div className="bg-neutral-700 flex justify-end px-2 py-2 w-full">
                <ul className="flex gap-x-1">
                    <li>
                        <Link to="/" className="bg-slate-200 text-gray-700 rounded px-2 py-1">Inicio</Link>
                    </li>
                    <li>
                       {user.username && <Link to="/perfil" className="bg-slate-200 text-gray-700 rounded px-2 py-1">Perfil</Link> }
                    </li>
                    <li>
                        { !user.username && <Link to="/login" className="bg-slate-200 text-gray-700 rounded px-2 py-1">Iniciar Sesión</Link> }
                    </li>
                </ul>
        </div>
    )
}