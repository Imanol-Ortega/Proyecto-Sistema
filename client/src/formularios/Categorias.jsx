/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik'
import { useNavigate,useParams  } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCategoriaRequest, postCategoriasRequest, updCategoriasRequest } from '../api/categoria.api';

function Categorias() {

    const [categorias,setCategorias]=useState({
        descripcion:''
    })

    const navigate = useNavigate();
    const params = useParams();

    const cargarCategoria = async(id)=>{
        try {
            const rp = await getCategoriaRequest(id)
            setCategorias({
                descripcion:rp.data[0].descripcion
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        if(params.id){
            cargarCategoria(params.id)
        }
    },[params.id])

  return (
    <div>
        <Formik
          initialValues={categorias}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
            actions.setSubmitting(true)
            
            if(params.id){
                await updCategoriasRequest(params.id,values);
            }else{
                await postCategoriasRequest(values);
            }

            actions.resetForm();
            navigate('/')
              
            
          }}
        >
          {({handleChange,handleSubmit,values,isSubmitting})=>(
            <div className="h-screen font-sans bg-cover">
  
              <div className="container mx-auto h-full flex flex-1 justify-center items-center">
  
                  <div className="w-full max-w-lg">
  
                    <div className="leading-loose">
                     
                      <Form 
                      className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl" 
                      onSubmit={handleSubmit}
                      >

                          <p 
                          className="text-white text-center text-lg font-bold">
                          Categorias
                          </p>
  
                            <div className="mt-0">
  
                              <label className="block text-sm text-white">
                              Nombre</label>
                      
                              <input 
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              type="text" 
                              name='descripcion'
                              placeholder="Escriba el nombre de la categoria" 
                              value={values.descripcion || ''}
                              onChange={handleChange}
                              required 
                              />
  
                            </div>

                            <div className="mt-4 items-center flex justify-between">
  
                              <button 
                              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                              type="submit"
                              disabled = {isSubmitting}>{isSubmitting ? "Guardando...":"Guardar"}</button>
  
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

export default Categorias