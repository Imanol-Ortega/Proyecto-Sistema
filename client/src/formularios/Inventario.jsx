/* eslint-disable no-unused-vars */
import { useNavigate,Link,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { getTipoUnidadMedidasRequest } from '../api/tipounidadmedida.api';
import { postInventarioRequest, updInventarioRequest } from '../api/inventario.api';

function Inventario() {
    const [inventario,setInventario] = useState({
        nombre:"",
        descripcion:"",
        cantidad:"",
        tipounidadmedidaid:""
    })
    const [tipounidad,setTipoUnidad] = useState([]);
    const [errores,setErrores] = useState("");

    const params = useParams();
    const navigate = useNavigate();
  
    const cargarTipoUnidad = async()=>{
        try {
            const resp = await getTipoUnidadMedidasRequest();
            setTipoUnidad(resp.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        cargarTipoUnidad();
    },[])
  
    return (
    

    <div>
        <Formik
          initialValues={inventario}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
              
              if(params.id){
                await updInventarioRequest(params.id,values);
              }
              else{
                await postInventarioRequest(values);
              }
              setInventario([])
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
                          Inventario
                          </p>
  
                            <div className="mt-0">
  
                              <label className="block text-sm text-white">
                              Nombre del producto</label>
                      
                              <input 
                              className="w-full px-5 py-1 text-gray-900 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              type="text" 
                              name='nombre'
                              placeholder="Escriba el nombre del producto" 
                              value={values.nombre || ''}
                              onChange={handleChange}
                              required 
                              />
  
                            </div>
  
                            <div className="mt-2">
  
                              <label 
                              className="block  text-sm text-white">
                              Descripcion</label>
  
                              <input 
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                              type='text'
                              name='descripcion'
                              value={values.descripcion || ''} 
                              onChange={handleChange}
                              placeholder="Escriba la descripcion del producto" 
                              required />
  
                            </div>

                            <div className="mt-2">
  
                              <label 
                              className="block  text-sm text-white">
                              Cantidad
                              </label>
  
                              <input 
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                              type='text'
                              name='cantidad'
                              value={values.cantidad || ''} 
                              onChange={handleChange}
                              placeholder="Escriba la cantidad del producto" 
                              required />
  
                            </div>

                            

                            <div className='mt-2'>

                            <label className='block text-sm text-white'>
                              Tipo de Unidad de Medida
                            </label>

                            <select name="tipounidadmedidaid" defaultValue={values.tipounidadmedidaid} className="w-full px-5 py-1 text-gray-900 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange} required>
                                    <option value="">Seleccione una opción</option>
                              {
                                tipounidad.map(tipo=>
                                  <option value={tipo.tipounidadmedidaid} key={tipo.tipounidadmedidaid} className=" hover:bg-sky-700">{tipo.descripcion}</option>
                                )
                              }
                            </select>
                            
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

export default Inventario