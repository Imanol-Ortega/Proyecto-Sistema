import NavBar from "./componentes/NavBar/Navbar"
import { AuthContextProvider } from "./contexto/AuthProvider"
import { Route,Routes } from "react-router-dom"
import Login from "./componentes/Sesion/Login"
import Register from "./componentes/Sesion/Register"
import Home from "./componentes/Home/Home"
import Profile from "./componentes/Perfil/Profile"
import Authentication from "./routes/Authentication"
import NotFound from "./componentes/NotFound/NotFound"
import Clientes from "./formularios/Clientes"
import Proveedores from "./formularios/Proveedores"
import Inventario from "./formularios/Inventario"
import FacturaCompra from "./formularios/FacturaCompra"

function App() {

  return (
    <div className='h-full bg-zinc-950 text-blue-50'>
      <div className="mx-auto h-full">
        <AuthContextProvider>
          <div className="mx-10 py-1">
              <NavBar/>
          </div>
          <Routes>
            <Route path="*" element={<NotFound/>}></Route>


            <Route path="/" element={<Home/>}></Route>

            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>

            <Route path="/perfil" element={<Authentication><Profile/></Authentication>}/>
            <Route path="/perfil/nuevo/:id2" element={<Clientes/>} />
            <Route path="/perfil/edit/:id" element={<Clientes/>} />

            <Route path="/proveedores/nuevo" element={<Proveedores/>} />
            <Route path="/proveedores/edit/:id" element={<Proveedores/>} />

            <Route path="/inventario/nuevo" element={<Inventario/>} />
            <Route path="/inventario/edit/:id" element={<Inventario/>} />

            <Route path="/facturacompra/nuevo" element={<FacturaCompra/>} />
          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  )
}


export default App
