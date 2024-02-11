/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik'
import { useAuth } from '../../contexto/AuthProvider'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function Register() {
  
  const {register,reg} = useAuth();
  const [user,setUser] = useState({
    name:"",
    passw:""
  });
  const navigate = useNavigate();
  const [errores,setErrores] = useState('');

  return (
    <div>
      <Formik
        initialValues={user}
        enableReinitialize = {true}
        onSubmit={async(values,actions)=>{
          actions.setSubmitting(true)
          const rp = await reg(values.name);
          if(rp.data==true){
            const rsp = await register(values);
            actions.resetForm();
            navigate('/perfil/nuevo/'+rsp.data);
          }
          else{
            actions.setSubmitting(false)
            setErrores("Ya existe el usuario")
            setUser({
              name:"",
              passw:""
            })
          }
          
          
        }}
      >
        {({handleChange,handleSubmit,values})=>(
          <div className="h-screen font-sans login bg-cover">

            <div className="container mx-auto h-full flex flex-1 justify-center items-center">

                <div className="w-full max-w-lg">

                  <div className="leading-loose">

                    <Form 
                    className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl" 
                    onSubmit={handleSubmit}
                    >
                        <p 
                        className="text-white text-center text-lg font-bold">
                        Registrarse</p>

                          <div className="mt-0">

                            <label className="block text-sm text-white">
                            Nombre</label>

                            <input 
                            className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                            type="text" 
                            name='name'
                            placeholder="Escriba un nombre de usuario" 
                            value={values.name || ''}
                            onChange={handleChange}
                            required 
                            />

                          </div>

                          <div className="mt-2">

                            <label 
                            className="block  text-sm text-white">
                            Contraseña</label>

                            <input 
                            className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                            type="password" 
                            name='passw'
                            value={values.passw || ''} 
                            onChange={handleChange}
                            placeholder="Escriba una contraseña" 
                            required />

                          </div>
                          {errores.length>0 ?<div className='flex justify-center align-middle font-mono text-justify text-red-500 text-base mt-5'> {errores} </div>: null}
                          <div className="mt-4 items-center flex justify-between">

                            <button 
                            className="align-middle px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                            type="submit">
                            Registrar</button>

                          </div>

                          <div className='mt-4 flex justify-center align-text-bottom text-sm tex-gray-100'>
                                <p className='pr-1 text-gray-200'>Ya tienes una cuenta </p>
                                <Link to="/login" className='text-sm text-orange-500'> Iniciar Sesión</Link>
                          </div>
                    </Form>
                  </div>
                </div>
              </div>
          </div>
        )}
      </Formik>
  </div>
  )
}

export default Register