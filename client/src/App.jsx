/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import NavBar from "./componentes/NavBar/Navbar"
import { AuthContextProvider } from "./contexto/AuthProvider"
import { Route,Routes } from "react-router-dom"
import Login from "./componentes/Sesion/Login"
import Register from "./componentes/Sesion/Register"
import Home from "./componentes/Home/Home"
import Authentication from "./routes/Authentication"
import NotFound from "./componentes/NotFound/NotFound"
import Clientes from "./formularios/Clientes"
import Proveedores from "./formularios/Proveedores"
import Inventario from "./formularios/Inventario"
import FacturaCompra from "./formularios/FacturaCompra"
import Productos from "./formularios/Productos"
import Authorization from "./routes/Authorization"
import PERMISOS from "./VariablesGlobales/Permisos"
import TipoDocumento from "./formularios/TipoDocumento"
import TipoPersona from "./formularios/TipoPersona"
import TipoUnidadMedida from "./formularios/TipoUnidadMedida"
import TipoProducto from "./formularios/TipoProducto"
import Categorias from "./formularios/Categorias"
import PersonasView from "./vistas/PersonasView"
import ProveedoresView from "./vistas/ProveedoresView"
import TipoPersonaView from "./vistas/TipoPersonaView"
import TipoUnidadMedidaView from "./vistas/TipoUnidadMedidaView"
import TipoDocumentoView from "./vistas/TipoDocumentoView"
import TipoProductoView from "./vistas/TipoProductoView"
import CategoriaView from "./vistas/CategoriaView"
import InventarioView from "./vistas/InventarioView"
import FacturaCompraView from "./vistas/FacturaCompraView"
import Subproductos from "./formularios/Subproductos"
import SubProductoView from "./vistas/SubProductoView"
import TipoSubProductoView from "./vistas/TipoSubProductoView"
import TipoSubProducto from "./formularios/TipoSubProducto"
import ProductosView from "./vistas/ProductosView"
import OfertasView from "./vistas/OfertasView"
import Ofertas from "./formularios/Ofertas"
import Pedidos from "./formularios/Pedidos"
import PedidosView from "./vistas/PedidosView"

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


            <Route path="/perfil/nuevo/:id2" element={<Authentication> <Clientes nombre={"Cliente"}/> </Authentication> } />


            <Route path="/cliente/vista" element={<PersonasView nombre={'Cliente'}/>} />
            <Route path="/cliente/nuevo" element={ <Clientes nombre={"Cliente"}/> } />
            <Route path="/cliente/edit/:id" element={<Authentication><Clientes nombre={"Cliente"}/> </Authentication>} />
            

            <Route path="/empleado/vista" element={<PersonasView nombre={'Empleado'}/>} />
            <Route path="/empleado/nuevo" element={<Clientes nombre={"Empleado"}/>} />
            <Route path="/empleado/edit/:id" element={<Clientes nombre={"Empleado"}/>} />
           

            <Route path="/proveedores/vista" element={<ProveedoresView />} />
            <Route path="/proveedores/edit/:id" element={<Proveedores/>} />
            <Route element={<Authorization permisos={[PERMISOS.ADMIN]} />}>
              <Route path="/proveedores/nuevo" element={<Proveedores/>} />
            </Route>

            <Route path="/inventario/vista" element={< InventarioView/>} />
            <Route path="/inventario/nuevo" element={<Inventario/>} />
            <Route path="/inventario/edit/:id" element={<Inventario/>} />

            <Route element={<Authorization permisos={[PERMISOS.ADMIN]} />}>
                <Route path="/facturacompra/vista" element={<FacturaCompraView/>} />
                <Route path="/facturacompra/nuevo" element={<FacturaCompra/>} />
            </Route>

            <Route path="/productos/vista" element={<ProductosView />} />
            <Route path="/productos/nuevo" element={<Productos/>} />
            <Route path="/productos/edit/:id" element={<Productos/>} />

            <Route path="/ofertas/vista" element={<OfertasView />} />
            <Route path="/ofertas/nuevo" element={< Ofertas/>} />
            <Route path="/ofertas/edit/:id" element={< Ofertas/>} />

            <Route path="/pedidos/vista" element={< PedidosView/>} />
            <Route path="/pedidos/nuevo" element={< Pedidos/>} />


            <Route path="/subproducto/vista" element={< SubProductoView/>} />
            <Route path="/subproducto/nuevo" element={<Subproductos />} />
            <Route path="/subproducto/edit/:id" element={<Subproductos />} />


            <Route path="/tipodocumento/vista" element={<TipoDocumentoView />} />
            <Route path="/tipodocumento/nuevo" element={<TipoDocumento/>} />
            <Route path="/tipodocumento/edit/:id" element={<TipoDocumento/>} />


            <Route path="/tipopersona/vista" element={< TipoPersonaView/>} />
            <Route path="/tipopersona/nuevo" element={<TipoPersona/>} />
            <Route path="/tipopersona/edit/:id" element={<TipoPersona/>} />


            <Route path="/tipounidadmedida/vista" element={< TipoUnidadMedidaView/>} />
            <Route path="/tipounidadmedida/nuevo" element={<TipoUnidadMedida/>} />
            <Route path="/tipounidadmedida/edit/:id" element={<TipoUnidadMedida/>} />


            <Route path="/tipoproducto/vista" element={<TipoProductoView/>} />
            <Route path="/tipoproducto/nuevo" element={<TipoProducto/>} />
            <Route path="/tipoproducto/edit/:id" element={<TipoProducto/>} />


            <Route path="/tiposubproducto/vista" element={<TipoSubProductoView />} />
            <Route path="/tiposubproducto/nuevo" element={<TipoSubProducto />} />
            <Route path="/tiposubproducto/edit/:id" element={<TipoSubProducto />} />


            <Route path="/categoria/vista" element={<CategoriaView/> } />
            <Route path="/categoria/nuevo" element={<Categorias/>} />
            <Route path="/categoria/edit/:id" element={<Categorias/>} />

            
            

          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  )
}


export default App
