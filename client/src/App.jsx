import { useEffect, useState } from 'react'
import './App.css'
import { getPersonaRequest } from './api/personas.api'
function App() {
  const [post,setPost] = useState([])

  useEffect(()=>{

    async function getPersonas(){
      try {
          const res = await getPersonaRequest();
          console.log(res.data.rows)
          setPost(res.data.rows)
      } catch (error) {
          console.log(error)
      }
    }
    getPersonas();
  },[])
  return (
    <div>{
          post.map(qsql =>
            <div key = {qsql.personasid}>
              <h1>{qsql.nombres}</h1>
            </div>
          )
        }
    </div>
  )
}

export default App
