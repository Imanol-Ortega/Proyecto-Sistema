import { useEffect, useState } from 'react'
import './App.css'
import { getPruebaRequest } from './api/prueba.api'
function App() {
  const [post,setPost] = useState([])

  useEffect(()=>{

    async function getPrueba(){
      try {
          const res = await getPruebaRequest();
          console.log(res.data.rows)
          setPost(res.data.rows)
      } catch (error) {
          console.log(error)
      }
    }
    getPrueba();
  },[])
  return (
    <div>{
          post.map(po =>
            <div key = {po.pruebaID}>
              <h1>{po.descripcion}</h1>
            </div>
          )
        }
    </div>
  )
}

export default App
