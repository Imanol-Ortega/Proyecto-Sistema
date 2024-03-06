/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik'
import { Link, useNavigate,useParams  } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTipoDocumentosRequest } from '../api/tipodocumento.api';
import { useAuth } from '../contexto/AuthProvider'
import { postPersonaRequest,getPersonaRequest,updPersonasRequest } from '../api/personas.api'
import { postPerfilRequest } from '../api/perfil.api'

function Clientes({nombre}) {
  const [cliente,setCliente] = useState({
    nombres:"",
    apellidos:"",
    telefono:"",
    direccion:"",
    nrodocumento:"",
    email:"",
    tipopersonaid: nombre=='Cliente' ? '2':'1',
    tipodocumentoid:""
  });
  const [tipodoc,setTipodoc] = useState([]);
  const [errores,setErrores] = useState("");

  const cargarTipoDocumento = async()=>{
    try {
      const res = await getTipoDocumentosRequest();
      setTipodoc(res.data)
    } catch (error) {
      console.error(error);
    }
  }
  const cargarPersonas = async()=>{
    try {
        if(params.id){
            const res = await getPersonaRequest(params.id);
            setCliente({
              nombres:res.data[0].nombres,
              apellidos:res.data[0].apellidos,
              telefono:res.data[0].telefono,
              direccion:res.data[0].direccion,
              nrodocumento:res.data[0].nrodocumento,
              email:res.data[0].email,
              tipopersonaid:nombre=='Cliente' ? '2':'1',
              tipodocumentoid:res.data[0].tipodocumentoid
            });
        }
    } catch (error) {
        console.error(error)
    }
  }

  /* const validateEmail = (email)=>{
    const valEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    
    if(valEmail.test(email)){
      setErrores("");
      return true
    }else{
      setErrores("Email invalido");
      return false;
    }
    
  } */


  const params = useParams();
  const navigate = useNavigate()
  useEffect(()=>{
    cargarTipoDocumento();
  },[])

  useEffect(()=>{
    cargarPersonas();
  },[params.id])

  return (
    <div>
      <Formik
          initialValues = {cliente}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
              if(params.id){
                await updPersonasRequest(params.id,values)
                actions.resetForm();
                if(nombre == 'Cliente'){
                  navigate('/cliente/vista');
                }else{
                  navigate('/empleado/vista')
                }
              }
              else{
                const rsp = await postPersonaRequest(values);
                if(nombre == 'Cliente' && params.id2){
                  const idu = parseInt(params.id2)
                  const envv = {personaid:rsp.data[0].personasid,userid:idu}
                  console.log(envv)
                  await postPerfilRequest(envv)
                  actions.resetForm();
                  navigate('/login');
                }
                actions.resetForm();
                if(nombre == 'Cliente'){
                  navigate('/cliente/vista');
                }else{
                  navigate('/empleado/vista')
                }
              }
              
            }
          }
        >
          {({handleChange,handleSubmit,values,isSubmitting})=>(
             <div className="h-full font-sans bg-cover bg-zinc-950 ">
               <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                 <div className="w-full max-w-lg">
                   <div className="leading-loose">
                      <Form 
                        className="max-w-lg m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl mt-40" 
                        onSubmit={handleSubmit}
                        >
                          <p className="text-white text-center text-xl font-bold">
                              Informacion Personal del {`${nombre}`}
                          </p>

                          <div className='mt-2'>
                            <label className='block text-sm text-white'>
                              Nombre
                            </label>
                            <input 
                              type="text"
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              name='nombres'
                              placeholder='Escriba su Nombre'
                              value={values.nombres || ''}
                              onChange={handleChange}
                              required 
                               />
                          </div>

                          <div className='mt-2'>
                            <label className='block text-sm text-white'>
                              Apellido
                            </label>
                            <input 
                              type="text"
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              name='apellidos'
                              placeholder='Escriba su Apellido'
                              value={values.apellidos || ''}
                              onChange={handleChange}
                              required 
                               />
                          </div>

                          <div className='mt-2'>
                            <label className='block text-sm text-white'>
                              Nro. de Telefono
                            </label>
                            <input 
                              type="text"
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              name='telefono'
                              placeholder='Escriba su Nro. de Telefono'
                              value={values.telefono || ''}
                              onChange={handleChange}
                              required 
                               />
                          </div>

                          <div className='mt-2'>
                            <label className='block text-sm text-white'>
                              Dirección
                            </label>
                            <input 
                              type="text"
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              name='direccion'
                              placeholder='Escriba su Dirección'
                              value={values.direccion || ''}
                              onChange={handleChange}
                              required 
                               />
                          </div>

                          <div className='mt-2'>
                            <label className='block text-sm text-white'>
                              Tipo de Documento
                            </label>
                            <select name="tipodocumentoid" value={values.tipodocumentoid} className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange} required>
                              <option value="">Seleccione una opción</option>
                              {
                                tipodoc.map(tipo=>
                                  <option value={tipo.tipodocumentoid} key={tipo.tipodocumentoid} className=" hover:bg-sky-700">{tipo.descripcion}</option>
                                )
                              }
                            </select>
                          </div>

                          <div className='mt-2'>
                            <label className='block text-sm text-white'>
                              Nro de Documento
                            </label>
                            <input 
                              type="text"
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              name='nrodocumento'
                              placeholder='Escriba su Nro. de Documento'
                              value={values.nrodocumento || ''}
                              onChange={handleChange}
                              required 
                               />
                          </div>

                          <div className='mt-2'>
                            <label className='block text-sm text-white'>
                              E-mail
                            </label>
                            <input 
                              type="text"
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              name='email'
                              placeholder='Escriba su E-mail'
                              value={values.email || ''}
                              onChange={handleChange}
                              required 
                               />
                          </div>

                          {errores.length>0 ?<div className='flex justify-center align-middle font-mono text-justify text-red-500 text-base mt-5'> {errores} </div>: null}

                          <div className="mt-4 items-center flex justify-start">
  
                              <button 
                              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                              type="submit"
                              disabled={isSubmitting}>
                              Guardar
                              </button>
                              {
                                nombre == 'Cliente' ? 
                                <Link to='/cliente/vista'  className=" ml-2 px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded">Cancelar</Link>
                                :
                                <Link to='/empleado/vista'  className=" ml-2 px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded">Cancelar</Link>
                              }
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

export default Clientes