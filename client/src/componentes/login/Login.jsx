/* eslint-disable no-unused-vars */
import { Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUsuario } from "../../api/login.api"


function Login() {
  const [users, setUsers] = useState([])
  

    const prueba = async()=>{
      const value = {nombre:"admin",pass:"1234"}
      const res =  await getUsuario(value)
      console.log(res)
    }
    prueba()
  return ( 
    <div>
      <Formik
        initialValues={users}
        enableReinitialize = {true}
      >
        {({handleChange,handleSubmit,values,isSubmitting})=>(
            <div className='container ml-auto mr-auto flex items-center justify-center align-middle flex-column'>
              <div className='w-full md:w-1/2'>
                <Form onSubmit={handleSubmit} className='bg-white px-8 pt-6 pb-8 mb-4'>
                  <h1 className='text-gray-700 text-xl font-bold uppercase text-center'>Iniciar Sesión</h1>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Usuario</label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  
                    type="text" 
                    name="usuario"
                    placeholder="Ingrese el usuario"
                    onChange={handleChange}
                    value={values.nombre || ''}
                    />

                  <label className='block text-gray-700 text-sm font-bold mt-4'>Contraseña</label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  
                    type="password" 
                    name="pass"
                    placeholder="Ingrese la contraseña"
                    onChange={handleChange}
                    value={values.pass || ''}
                    />

                  <button 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4'
                    type='Submit' 
                    disabled = {isSubmitting}>{isSubmitting ? "Comprobando...":"Iniciar"}</button>   
                  <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    <p className="block text-gray-700 text-sm font-bold mt-4">No tienes una cuenta?</p>
                    <Link to="#" className="text-red-600 hover:underline hover:underline-offset-4">Registrarse</Link> 
                  </div>                   
                </Form>
              </div>
            </div>
        )}
      </Formik>
    </div>
  )
}

export default Login