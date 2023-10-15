/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import PersonasCards from "../componentes/PersonasCards";
import { usePersonas } from "../context/ContextoProvider"

function PersonasView() {
  const {persona,loadPersonas} = usePersonas();
  useEffect(()=>{
      loadPersonas();
  },[])
  function renderMain(){
    if(persona===0) return <h1>No existen registros de personas</h1>
    return persona.map(per=>(
      <PersonasCards personas = {per} key={per.personasid}/>
    ))
  }
  return (
    <div>
      <h1 className="text-5xl text-white font-bold text-center">Personas</h1>
      <div className="grid grid-cols-3 gap-3">
        {renderMain()}
      </div>
    </div>
  )
}
export default PersonasView
