import NavBar from "./componentes/NavBar/Navbar"
import { AuthContextProvider } from "./contexto/AuthProvider"
import { Route,Routes } from "react-router-dom"
import Login from "./componentes/Sesion/Login"
import Register from "./componentes/Sesion/Register"
import Home from "./componentes/Home/Home"
import Profile from "./componentes/Perfil/Profile"
import Authentication from "./routes/Authentication"
function App() {

  return (
    <div className='bg-zinc-800 text-blue-50 h-full w-full '>
     
      <div className="container w-screen mx-auto">
        <AuthContextProvider>
          <div className="w-full">
              <NavBar/>
            </div>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/perfil" element={<Authentication><Profile/></Authentication>}/>
          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  )
}

export default App
