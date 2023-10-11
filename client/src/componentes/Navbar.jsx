import { Link } from "react-router-dom"


export default function Navbar() {
  return (
    <div className="bg-neutral-700 flex justify-between px-2 py-2">
      <ul className="flex gap-x-1">
        <li>
          <Link to="/" className="bg-slate-200 text-gray-700 rounded px-2 py-1">Inicio</Link>
        </li>
        <li>
          <Link to="/new" className="bg-slate-200 text-gray-700 rounded px-2 py-1">Añadir Persona</Link>
        </li>
      </ul>
    </div>
  )
}
