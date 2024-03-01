/* eslint-disable no-unused-vars */
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
import Productos from "./formularios/Productos"
import Authorization from "./routes/Authorization"
import PERMISOS from "./VariablesGlobales/Permisos"

function App() {

  return (
    <div className='h-screen bg-zinc-950 text-blue-50'>
      <div className="mx-auto h-full">
        <AuthContextProvider>
          
          <NavBar/>
 
          <Routes>
            <Route path="*" element={<NotFound/>}></Route>


            <Route path="/" element={<Home/>}></Route>

            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>

            <Route path="/perfil" element={<Authentication><Profile/></Authentication>}/>
            <Route element={<Authorization permisos={[PERMISOS.ADMIN]} />}>
              <Route path="/proveedores/nuevo" element={<Proveedores/>} />
            </Route>

            <Route path="/perfil/nuevo/:id2" element={<Authentication> <Clientes nombre={"Cliente"}/> </Authentication> } />
            <Route path="/perfil/edit/:id" element={<Authentication><Clientes nombre={"Cliente"}/> </Authentication>} />
            <Route path="/empleado/nuevo" element={<Clientes nombre={"Empleado"}/>} />
            <Route path="/proveedores/nuevo" element={<Proveedores/>} />
            <Route path="/proveedores/edit/:id" element={<Proveedores/>} />
            <Route path="/inventario/nuevo" element={<Inventario/>} />
            <Route path="/inventario/edit/:id" element={<Inventario/>} />
            <Route path="/facturacompra/nuevo" element={<FacturaCompra/>} />
            <Route path="/productos/nuevo" element={<Productos/>} />

          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  )
}


export default App
