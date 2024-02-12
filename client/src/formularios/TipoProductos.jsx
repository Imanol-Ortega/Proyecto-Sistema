/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Formik} from 'formik'
import {  getSubProductosRequest } from '../api/subproducto.api';
import { postTipoProductoRequest } from '../api/tipoproducto.api';

function TipoProductos() {
    const [errores,setErrores] = useState("");
    const [tipoProducto,setTipoProducto] = useState({
        nombre:"",
        descripcion:"",
        personalizable:false,
        detalle:{
            subproductoid:"",
            tipo:""
        }
    });
    const [subProducto,setSubProducto] = useState([])
    const [newInventario,setNewInventario] = useState([]);

    const navigate = useNavigate();
    const params = useParams();
    
    const cargarSubProductos = async()=>{
        try {
                const resp = await getSubProductosRequest();
                setSubProducto(resp.data)
        } catch (error) {
            console.error(error)
        }
    }
    const agregarProducto = (values)=>{
        const nombre = filtrarNombres(values.subproductoid)
        setNewInventario([...newInventario,{subproductoid:values.subproductoid,nombre:nombre,tipoproducto:values.tipo == 1? 'Relleno':'Cobertura',tipo:values.tipo}])
    }
    const filtrarNombres = (id)=>{
        const rp = subProducto.map((inv)=>{
            if(inv.subproductoid==id){
                return inv.nombre
            }
        })
        
        return rp;
    }

    useEffect(()=>{
        cargarSubProductos();
    },[params.id]);
    
    return (
    <div>
        <Formik
          initialValues={tipoProducto}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
                await postTipoProductoRequest({nombre:values.nombre,descripcion:values.descripcion,personalizable:values.personalizable,detalle:newInventario})
                console.log({nombre:values.nombre,descripcion:values.descripcion,detalle:newInventario})
                actions.resetForm();
                navigate('/')
          }}
        >
          {({handleChange,handleSubmit,values,isSubmitting})=>(
            <div className="h-screen font-sans bg-cover">
  
              <div className="container mx-auto h-full flex flex-1 justify-center items-center">
  
                  <div className="w-full max-w-xl">
  
                    <div className="leading-loose">
                     
                      <Form 
                      className="max-w-xl  h-full m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl" 
                      onSubmit={handleSubmit}
                      >

                          <p 
                          className="text-white text-center text-lg font-bold">
                          Tipo de Producto
                          </p>
  
                            <div className="mt-0">
  
                              <label className="block text-sm text-white">
                              Nombre</label>
                      
                              <input 
                              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                              type="text" 
                              name='nombre'
                              placeholder="Escriba un nombre del sub producto" 
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
                              type="text" 
                              name='descripcion'
                              value={values.descripcion || ''} 
                              onChange={handleChange}
                              placeholder="Escriba la descripcion" 
                              required />
  
                            </div>
                            <div className="mt-2 flex">
                                <label 
                                className="block  text-sm text-white">
                                Personalizable</label>
    
                                <input 
                                className="ml-10 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                type="checkbox" 
                                name='personalizable'
                                value={values.personalizable || ''} 
                                onChange={handleChange}
                                placeholder="Escriba la descripcion" />
                                </div>
                            {values.personalizable!=''?(
                            <div>
                            <div className=' w-full justify-end flex mt-5'>
                                    <button 
                                    type='button' 
                                    onClick={()=>{
                                        if(values.detalle.subproductoid && values.detalle.tipo){
                                            setErrores("")
                                            setNewInventario([])
                                            agregarProducto(values.detalle)
                                        }
                                        else{
                                            setErrores("Ingrese todos los datos")
                                        }
                                    }}  
                                    className="px-4 py-1 text-white font-light tracking-wider bg-green-600 hover:bg-green-700 rounded text-lg">+</button>
                            </div>

                            <div className='flex  justify-between columns-2'>
                                <div className="mt-0">
            
                                        <label className="block text-sm text-white">
                                        Sub Producto</label>
                                        
                                        <select name="detalle.subproductoid" id="detalle.subproductoid" value={values.detalle.subproductoid} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange} required>
                                        <option value="0">Seleccione una opción</option>
                                        {
                                            subProducto.map(inv=>
                                                <option value={inv.subproductoid} key={inv.subproductoid} className=" hover:bg-sky-700">{inv.nombre}</option>  
                                            )
                                            
                                        }
                                        </select>
                                </div>
                                <div className="mt-0">
                                
                                        <label className="block text-sm text-white">
                                        Tipo de Personalizacion</label>
                                        <select name="detalle.tipo" id="tipo" value={values.detalle.tipo} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange} required>
                                            <option value="">Seleccione una opcion</option>
                                            <option value="1">Relleno</option>
                                            <option value="2">Cobertura</option>
                                        </select>

                                    </div>
                            </div>
                            
                            <section className="antialiased text-gray-600 px-4 mt-5 bg-cover rounded">
                            <div className="flex flex-col justify-center ">
                                <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                                    <div className="p-3">
                                        <div className="overflow-x-auto">
                                            <table className="table-auto w-full">
                                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                    <tr>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">SubProducto</div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">Tipo</div>
                                                        </th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm divide-y divide-gray-100">
                                                    {
                                                        newInventario.map((invent)=>(
                                                        <tr key={invent.subproductoid}>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-gray-800">{invent.nombre}</div>
                                                                </div>

                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">{invent.tipoproducto}</div>
                                                            </td>

                                                        </tr>
                                                        ))
                                                    }
                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                            {errores.length>0 ?<div className='flex justify-center align-middle font-mono text-justify text-red-500 text-base mt-5'> {errores} </div>: null}
                    </div>
                    ):null}
                            <div className="mt-4 items-center flex justify-between">
  
                              <button 
                              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                              type="submit"
                              disabled={isSubmitting}>
                              Guardar</button>
  
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

export default TipoProductos