/* eslint-disable no-unused-vars */
import { useNavigate,Link,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { getTipoDocumentosRequest } from '../api/tipodocumento.api';
import { postProveedoresRequest, updProveedoresRequest } from '../api/proveedor.api';

function Proveedores() {
    const [proveedor,setProveedor] = useState({
        nombre:"",
        email:"",
        telefono:"",
        direccion:"",
        ruc:"",
        tipodocumentoid:""
      });
      const [errores,setErrores] = useState("");
      const [tipodoc,setTipodoc] = useState([]);


      const navigate = useNavigate();
      const params = useParams();

      const cargarTipoDocumento = async()=>{
        try {
          const res = await getTipoDocumentosRequest();
          setTipodoc(res.data)
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(()=>{
        cargarTipoDocumento();
      },[])



  return (
    <div>
        <Formik
          initialValues={proveedor}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
              
              if(params.id){
                await updProveedoresRequest(params.id,values);
              }
              else{
                await postProveedoresRequest(values);
              }
              setProveedor([])
              actions.resetForm();
              navigate('/');
          }}
        >
          {({handleChange,handleSubmit,values,isSubmitting})=>(
            <div className="h-screen font-sans bg-cover">
  
              <div className="container mx-auto h-full flex flex-1 justify-center items-center">
  
                  <div className="w-full max-w-lg">
  
                    <div className="leading-loose">
                     
                      <Form 
                      className="max-w-lg m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl" 
                      onSubmit={handleSubmit}
                      >

                          <p 
                          className="text-white text-center text-lg font-bold">
                          Proveedores
                          </p>
  
                            <div className="mt-0">
  
                              <label className="block text-sm text-white">
                              Nombre del Proveedor</label>
                      
                              <input 
                              className="w-full px-5 py-1 text-gray-900 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              type="text" 
                              name='nombre'
                              placeholder="Escriba el nombre del proveedor" 
                              value={values.nombre || ''}
                              onChange={handleChange}
                              required 
                              />
  
                            </div>
  
                            <div className="mt-2">
  
                              <label 
                              className="block  text-sm text-white">
                              E-mail</label>
  
                              <input 
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                              type='text'
                              name='email'
                              value={values.email || ''} 
                              onChange={handleChange}
                              placeholder="Escriba el E-mail" 
                              required />
  
                            </div>

                            <div className="mt-2">
  
                              <label 
                              className="block  text-sm text-white">
                              Nro. de Teléfono</label>
  
                              <input 
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                              type='text'
                              name='telefono'
                              value={values.telefono || ''} 
                              onChange={handleChange}
                              placeholder="Escriba el Nro de Telefono" 
                              required />
  
                            </div>

                            <div className="mt-2">
  
                              <label 
                              className="block  text-sm text-white">
                              Dirección</label>
  
                              <input 
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              type='text' 
                              name='direccion'
                              value={values.direccion || ''} 
                              onChange={handleChange}
                              placeholder="Escriba una contraseña" 
                              required />
  
                            </div>

                            <div className='mt-2'>

                            <label className='block text-sm text-white'>
                              Tipo de Documento
                            </label>

                            <select name="tipodocumentoid" defaultValue={values.tipodocumentoid || 2} className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange}>
                              <option value="">Seleccione una opción</option>
                              {
                                tipodoc.map(tipo=>
                                  <option value={tipo.tipodocumentoid} key={tipo.tipodocumentoid} className=" hover:bg-sky-700">{tipo.descripcion}</option>
                                )
                              }
                            </select>
                            
                          </div>

                            <div className="mt-2">
  
                              <label 
                              className="block  text-sm text-white">
                              RUC</label>
  
                              <input 
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              type='text'
                              name='ruc'
                              value={values.ruc || ''} 
                              onChange={handleChange}
                              placeholder="Escriba el RUC" 
                              required />
  
                            </div>

                            {errores.length>0 ?<div className='flex justify-center align-middle font-mono text-justify text-red-500 text-base mt-5'> {errores} </div>: null}

                            <div className="mt-4 items-center flex justify-between">
  
                              <button 
                              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                              type="submit"
                              disabled={isSubmitting}>
                              Guardar
                              </button>
  
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

export default Proveedores