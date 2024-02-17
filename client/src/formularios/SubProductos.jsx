/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik'
import { useNavigate,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSubProductoRequest, postSubProductoRequest, updSubProductoRequest } from '../api/subproducto.api';
import { getInventariosRequest } from '../api/inventario.api';


function SubProductos() {
    const [errores,setErrores] = useState("");
    const [subProducto,setSubProducto] = useState({
        nombre:"",
        descripcion:"",
        detalle:{
            inventarioid:"",
            cantidad:""
        }
    });
    const [newInventario,setNewInventario] = useState([]);
    const [inventario,setInventario] = useState([]);
    
    const cargarSubProductos = async()=>{
        try {
            if(params.id) {
                const resp = await getSubProductoRequest(params.id);
                console.log(resp.data)
                setSubProducto(resp.data)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const cargarInventario = async()=>{
        try {
            const resp = await getInventariosRequest();
            setInventario(resp.data);
        } catch (error) {
            console.error(error)
        }
    }
    const agregarProducto = (values)=>{
        const nombre = filtrarNombres(values.inventarioid)
        setNewInventario([...newInventario,{inventarioid:values.inventarioid,nombre:nombre,cantidad:values.cantidad}])
    }
    const filtrarNombres = (id)=>{
        const rp = inventario.map((inv)=>{
            if(inv.inventarioid==id){
                return inv.nombre
            }
        })
        
        return rp;
    }

    useEffect(()=>{
        cargarInventario();
        cargarSubProductos();
    },[]);

    const navigate = useNavigate();
    const params = useParams();
  return (
    <div>
        <Formik
          initialValues={subProducto}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
                if(params.id){
                    await updSubProductoRequest(params.id,values);
                }
                else{
                    await postSubProductoRequest({nombre:values.nombre,descripcion:values.descripcion,detalle:newInventario});
                }
                actions.resetForm();
                navigate('/')
   
          }}
        >
          {({handleChange,handleSubmit,values,isSubmitting})=>(
            <div className="h-full font-sans bg-cover bg-zinc-950 ">
  
              <div className="container mx-auto h-full flex flex-1 justify-center items-center">
  
                  <div className="w-full max-w-xl">
  
                    <div className="leading-loose">
                     
                      <Form 
                      className="max-w-xl  h-full m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl mt-20" 
                      onSubmit={handleSubmit}
                      >

                          <p 
                          className="text-white text-center text-lg font-bold">
                          Sub Productos
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
                            <div className=' w-full justify-end flex mt-5'>
                                    <button 
                                    type='button' 
                                    onClick={()=>{
                                        if(values.detalle.inventarioid && values.detalle.cantidad){
                                            setErrores("")
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
                                        Producto</label>
                                        
                                        <select name="detalle.inventarioid" id="detalle.inventarioid" value={values.detalle.inventarioid} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange} >
                                        <option value="0">Seleccione una opción</option>
                                        {
                                            inventario.map(inv=>
                                                <option value={inv.inventarioid} key={inv.inventarioid} className=" hover:bg-sky-700">{inv.nombre}</option>  
                                            )
                                            
                                        }
                                        </select>
                                </div>
                                <div className="mt-0">
            
                                        <label className="block text-sm text-white">
                                        Cantidad</label>
                                
                                        <input 
                                        className="w-full px-5 py-1 text-gray-900 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                        type="number" 
                                        name='detalle.cantidad'
                                        placeholder="Escriba la cantidad de producto" 
                                        value={values.detalle.cantidad || ''}
                                        onChange={handleChange}
                                        required 
                                        />
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
                                                            <div className="font-semibold text-left">Producto</div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">Cantidad</div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm divide-y divide-gray-100">
                                                    {
                                                        newInventario.map((invent)=>(
                                                        <tr key={invent.inventarioid}>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-gray-800">{invent.nombre}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">{invent.cantidad}</div>
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

export default SubProductos