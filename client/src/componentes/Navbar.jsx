import { Link } from "react-router-dom"


export default function Navbar() {
  return (
    <div>
      
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/personas/new">Añadir Persona</Link>
        </li>
      </ul>
    </div>
  )
}
