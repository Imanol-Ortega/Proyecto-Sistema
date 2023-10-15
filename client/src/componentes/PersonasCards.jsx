/* eslint-disable react/prop-types */

import { usePersonas } from "../context/ContextoProvider"
import { useNavigate } from "react-router-dom"
function PersonasCards({personas}) {
    const {deletePersonas} = usePersonas();
    const navigate = useNavigate();
  return (
    <div className="bg-gray-600 rounded-md p-4 ">
        <p className="text-sm text-gray-100">{personas.nombres}</p>
        <p className="text-sm text-gray-100">{personas.apellidos}</p>
        <p className="text-sm text-gray-100">{personas.nrodocumento}</p>
        <p className="text-sm text-gray-100">{personas.telefono}</p>
        <p className="text-sm text-gray-100">{personas.direccion}</p>
        <p className="text-sm text-gray-100">{personas.email}</p>
        <div>
            <button className="bg-red-500 px-2 py-1 text-white rounded mt-2" onClick={()=>deletePersonas(personas.personasid)}>Eliminar</button>
            <button className="bg-orange-500 px-2 py-1 text-white rounded mt-2 ml-2"  onClick={()=> navigate('/edit/'+personas.personasid)}>Editar</button>
        </div>
    </div>
  )
}

export default PersonasCards