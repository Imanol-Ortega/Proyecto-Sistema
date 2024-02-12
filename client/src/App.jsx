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
import SubProductos from "./formularios/SubProductos"
import TipoProductos from "./formularios/TipoProductos"
import Productos from "./formularios/Productos"
import Authorization from "./routes/Authorization"
import PERMISOS from "./VariablesGlobales/Permisos"

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
            <Route element={<Authorization permisos={[PERMISOS.ADMIN]} />}>
                <Route path="/perfil/nuevo/:id2" element={<Clientes nombre={"Cliente"}/> } />
            </Route>
            
            <Route path="/perfil/edit/:id" element={<Clientes nombre={"Cliente"}/>} />

            <Route path="/empleado/nuevo" element={<Clientes nombre={"Empleado"}/>} />

            <Route path="/proveedores/nuevo" element={<Proveedores/>} />
            <Route path="/proveedores/edit/:id" element={<Proveedores/>} />

            <Route path="/inventario/nuevo" element={<Inventario/>} />
            <Route path="/inventario/edit/:id" element={<Inventario/>} />

            <Route path="/facturacompra/nuevo" element={<FacturaCompra/>} />

            <Route path="/subproducto/nuevo" element={<SubProductos/>} />

            <Route path="/tipoproducto/nuevo" element={<TipoProductos/>} />

            <Route path="/productos/nuevo" element={<Productos/>} />
          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  )
}


export default App
