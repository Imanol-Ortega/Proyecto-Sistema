import {Routes,Route} from 'react-router-dom'
import Navbar from './componentes/Navbar'
import { PersonasContextProvider } from './context/ContextoProvider'
import PersonasView from './views/PersonasView'
import PersonasForm from './forms/PersonasForm'
import Login from './componentes/login/Login'


function App() {

  return (
    <div className='bg-zinc-800 text-blue-50 h-screen'>
      <Navbar/>
      <div className="container mx-auto py-4 px-10" >
      <PersonasContextProvider>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
          
            <Route path='/personas' element={<PersonasView/>}></Route>
            <Route path='/new' element={<PersonasForm/>}></Route>
            <Route path='/edit/:id' element={<PersonasForm/>}></Route>
         
        </Routes>
        </PersonasContextProvider>
      </div>
    </div>
  )
}

export default App
