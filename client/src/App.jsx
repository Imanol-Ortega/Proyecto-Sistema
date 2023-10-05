import {Routes,Route} from 'react-router-dom'
import Navbar from './componentes/Navbar'
import { PersonasContextProvider } from './context/PersonasProvider'
import PersonasView from './views/PersonasView'
import PersonasForm from './forms/PersonasForm'

function App() {

  return (
    <div className='bg-zinc-900 h-screen text-blue-50'>
      <Navbar/>
      <div className="container mx-auto py-4 px-10" >
        <PersonasContextProvider>
          <Routes>
            <Route path='/' element={<PersonasView/>}></Route>
            <Route path='/new' element={<PersonasForm/>}></Route>
          </Routes>
        </PersonasContextProvider>
      </div>
    </div>
  )
}

export default App
