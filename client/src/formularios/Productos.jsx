/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getInventariosRequest } from '../api/inventario.api';
import { postProductoRequest, updProductoRequest } from '../api/productos.api';
import { getTipoUnidadMedidasRequest } from '../api/tipounidadmedida.api';

function Productos() {
    const [productos,setProductos] = useState({
        nombre:"",
        descripcion:"",
        precio:0,
        imagen:"",
        personalizable:"",
        tipounidadmedidaid:0,
        detalle:{
            inventarioid:0,
            nombre:"",
            cantidad:0
        }
    })
    const [errores,setErrores] = useState("");
    const [newInventario,setNewInventario] = useState([]);
    const [inventario,setInventario] = useState([]);
    const [existe,setExiste] = useState([]);
    const [tipounidad,setTipoUnidad] = useState([]);
    const [image,setImage] = useState(null)

    const navigate = useNavigate();
    const params = useParams();

    const cargarInventario = async()=>{
        try {
            const resp = await getInventariosRequest();
            setInventario(resp.data);

        } catch (error) {
            console.error(error);
        }
    }

    const cargarTipoUnidad = async()=>{
        try {
            const resp = await getTipoUnidadMedidasRequest();
            setTipoUnidad(resp.data);
        } catch (error) {
            console.error(error);
        }
    }

    const agregarProducto = (values,valor)=>{
        setExiste([...existe,values.inventarioid])
        const nombre = filtrarNombres(values.inventarioid)
        const desc = filtrarDescripcion(values.inventarioid)
        
        setNewInventario([...newInventario,{inventarioid:values.inventarioid,nombre:nombre,desc:desc,cantidad:values.cantidad}])    
    }

    const filtrarNombres = (id)=>{
        const result = inventario.map((inv)=>{
            if(inv.inventarioid==id){
                return inv.nombre
            }
        })
        return result
    }
    const filtrarDescripcion = (id)=>{
        const result = inventario.map((inv)=>{
            if(inv.inventarioid==id){
                return inv.descripcion
            }
        })
        return result
    }
    

    useEffect(()=>{
        cargarTipoUnidad();
        cargarInventario();
    },[])


  return (
    <div>
        <Formik
          initialValues={productos}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
            if(params.id){
                await updProductoRequest(params.id,{nombre:values.nombre,descripcion:values.descripcion,precio:values.precio,manoobra:values.manoobra,margen:values.margen,tipoproductoid:values.tipoproductoid,detalle:newInventario})
            }else{
                await postProductoRequest({nombre:values.nombre,descripcion:values.descripcion,precio:values.precio,manoobra:values.manoobra,margen:values.margen,tipoproductoid:values.tipoproductoid,detalle:newInventario})
            }
            setProductos([]);
            actions.resetForm();
            navigate('/')
        }}
        >
          {({handleChange,handleSubmit,values,isSubmitting})=>(
            <div className="h-full font-sans bg-cover bg-zinc-950 ">
  
              <div className="container mx-auto flex flex-1 justify-center items-center">
  
                  <div className="w-full max-w-4xl">
  
                    <div className="leading-loose">
                     
                      <Form 
                      className="max-w-4xl m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl mt-40" 
                      onSubmit={handleSubmit}
                      >

                          <p 
                          className="
                                    text-white text-center text-lg font-bold bg-slate-700 rounded-md max-w-2xl ml-14 
                                    md:ml-10 md:mr-9 
                                    lg:ml-14
                                    ">
                          Producto
                          </p>

                          <div className='justify-center flex mt-5 bg-gray-700 max-w-2xl ml-14 py-7 rounded-md'>

                            <div className='max-w-xl flex flex-wrap justify-between align-middle flex-row'>

                                <div className="mt-0">
                                    <label className="block text-sm text-white">
                                    Nombre</label>
                            
                                    <input 
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    type="text" 
                                    name='nombre'
                                    placeholder="Escriba el nombre del producto" 
                                    value={values.nombre || ''}
                                    onChange={handleChange}
                                    required 
                                    />
                                </div>

                                <div className="mt-0">
                                    <label className="block text-sm text-white">
                                    Descripcion</label>
                            
                                    <input 
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    type="text" 
                                    name='descripcion'
                                    placeholder="Escriba el nombre del producto" 
                                    value={values.descripcion || ''}
                                    onChange={handleChange}
                                    required 
                                    />
                                </div>

                                <div className="mt-1">
                                    <label className="block text-sm text-white">
                                    Precio</label>
                            
                                    <input 
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    type="number" 
                                    name='precio'
                                    placeholder="" 
                                    value={values.precio || ''}
                                    onChange={handleChange}
                                    required 
                                    />
                                </div>

                                <div className='mt-1'>
                                </div>

                                <div className='mt-1'>
                                    <label className='block text-sm text-white'>
                                        Unidad de Medida
                                    </label>
                                    <select name="tipounidadmedidaid" value={values.tipounidadmedidaid} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange} required>
                                        <option value="">Seleccione una Opcion</option>
                                        {
                                            tipounidad.map(tipo=>
                                                <option value={tipo.tipounidadmedidaid} key={tipo.tipounidadmedidaid} className=" hover:bg-sky-700">{tipo.descripcion}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className='mt-1'>
                                    <label className='block text-sm text-white'>
                                        Imagen del Producto
                                    </label>
                                    <input 
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    type="file" 
                                    name='imagen'
                                    value={values.imagen || ''}
                                    onChange={(e)=>{
                                        const file = e.target.files[0];
                                        const reader = new FileReader();
                                        reader.onloadend = ()=>{
                                            console.log(reader.result)
                                            setImage(reader.result)
                                        };
                                        reader.readAsDataURL(file)
                                    }}
                                    required 
                                    />
                                </div>
                                <div className='mt-10 flex flex-row  -ml-40'>

                                    <input
                                    className='w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' 
                                    name='personalizable'
                                    type="checkbox"
                                    value={values.personalizable || ''} 
                                    onChange={handleChange}
                                    />

                                    <label className=' ml-3 block text-sm text-white'>
                                        Personalizable
                                    </label>
                                </div>

                            </div>
                            
                        </div>
                        <div className='max-w-2xl flex justify-center align-middle mt-5 bg-slate-700 flex-col px-5 py-5 ml-14 rounded-md'>
                            <div className='max-w-xl flex justify-center align-middle ml-5'>
                                <div className='ml-2 mr-4'>
                                    <label className='block text-sm text-white'>
                                    Producto
                                    </label>
                                    <select name="detalle.inventarioid" value={values.detalle.inventarioid} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange}>
                                        <option value="">Seleccione una opción</option>
                                        {
                                            inventario.map(tipo=>(
                                                <option value={tipo.inventarioid} key={tipo.inventarioid} className=" hover:bg-sky-700">{tipo.nombre}</option>
                                            ))
                                        }
                                    </select>
                                            
                                </div>
                                <div className="ml-5 max-w-xs">
        
                                    <label className="block text-sm text-white">
                                    Cantidad</label>
                            
                                    <input 
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    type="text" 
                                    name='detalle.cantidad'
                                    placeholder="Cantidad de producto" 
                                    value={values.detalle.cantidad || ''}
                                    onChange={handleChange}
                                    required 
                                    />
        
                                    </div>
                                <div className='justify-end flex ml-16 mt-5 -mr-2'>
                                            <button 
                                            type='button'
                                            onClick={()=>{
                                                let exist = newInventario.length == 0 ? false : existe.includes(values.detalle.inventarioid)                                      
                                                if(values.detalle.inventarioid && values.detalle.cantidad && values.precio && values.descripcion && values.nombre && values.tipounidadmedidaid){
                                                    if(exist == false){
                                                        setErrores("")
                                                        agregarProducto(values.detalle,values)
                                                    }
                                                    else{
                                                        setErrores("Ya existe el mismo producto")
                                                    }
                                                }
                                                else{
                                                    setErrores("Ingrese todos los datos")
                                                }
                                            }}  
                                            className="px-4 py-1 text-white font-light tracking-wider bg-green-600 hover:bg-green-500 rounded text-lg">+</button>
                                </div>
                            
                            </div>
                            <section className="antialiased text-gray-600 px-4 mt-5 bg-cover rounded">
                                <div className="flex flex-col justify-center ">
                                    <div className="w-full max-w-xl mx-auto bg-slate-300 shadow-lg rounded-sm border border-gray-200">
                                        <div className="p-3">
                                            <div className="overflow-x-auto">
                                                <table className="table-auto w-full">
                                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-700">
                                                        <tr>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">Producto</div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">Descripcion</div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">Cantidad</div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">Acciones</div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-sm divide-y-2 divide-gray-100">
                                                        {
                                                            newInventario.map((invent)=>(
                                                            <tr key={invent.inventarioid}>
                                                            
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">{invent.nombre}</div>
                                                                </td>
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">{invent.desc}</div>
                                                                </td>
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">{invent.cantidad}</div>
                                                                </td>
                                                                <td className="p-2 whitespace-nowrap">
                                                                   <button
                                                                   type='button'
                                                                   className='px-4 py-1 text-white font-light tracking-wider bg-red-700 hover:bg-red-600 rounded text-lg'
                                                                   onClick={()=>{
                                                                    setNewInventario(newInventario.filter(newInventario => newInventario.inventarioid != invent.inventarioid))
                                                                    setExiste(existe.filter(existe=> existe != invent.inventarioid))
                                                                   }}
                                                                   >
                                                                    -
                                                                   </button>
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
                        </div>
                        
                           {errores.length>0 ?<div className='flex justify-center align-middle font-mono text-justify text-red-500 text-base mt-5'> {errores} </div>: null}

                            <div className="mt-4 items-center flex justify-center">
  
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

export default Productos