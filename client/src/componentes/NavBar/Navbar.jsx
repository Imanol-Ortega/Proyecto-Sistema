import { Link } from "react-router-dom"
import { useAuth } from "../../contexto/AuthProvider";
import PERMISOS from "../../VariablesGlobales/Permisos";

export default function Navbar(){
    const { user } = useAuth();
    return (
        
        <div className="bg-neutral-950 rounded-md flex justify-end px-2 py-2 w-full border-2 border-red-400 fixed ">
               {/*  <link
                href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
                rel="stylesheet" />
                
                <i className="material-icons-outlined text-base">visibility</i> */}
                <ul className="flex gap-x-1">
                    
                    <li>
                        <Link 
                        to="/" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1"
                        >
                            Inicio
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to="/cliente/vista" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                        >
                            Clientes
                        </Link>
                    </li>
                    
                    <li>
                         <Link 
                         to="/empleado/vista" 
                         className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                         >
                            Empleado
                        </Link>
                    </li>

                    <li>
                        { 
                        user.permisos == PERMISOS.ADMIN && 
                            <Link 
                            to="/proveedores/vista" 
                            className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                            >
                                Proveedores
                            </Link> 
                        }
                    </li>

                    <li>
                        <Link 
                        to="/facturacompra/nuevo" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                        >
                            Compra
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to="/inventario/nuevo" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                        >
                            Inventario
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to="/subproducto/nuevo" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                        >
                            SubProducto
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to="/tipodocumento/nuevo" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                        >
                            TipoDocumento
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to="/tipopersona/nuevo" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                        >
                            TipoPersona
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to="/tipounidadmedida/nuevo" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                        >
                            TipoUnidadMedida
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to="/tipoproducto/nuevo" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                        >
                            TipoProducto
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to="/categoria/nuevo" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                        >
                            Categorias
                        </Link>
                    </li>

                    <li>
                        <Link 
                        to="/productos/nuevo" 
                        className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1" 
                        >
                            Productos
                        </Link>
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