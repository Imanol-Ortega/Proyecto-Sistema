/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getInventariosRequest } from '../api/inventario.api';
import { getRecetaRequest, getSubProductoRequest, postSubProductoRequest, updSubProductoRequest } from '../api/subproducto.api';



function Subproductos() {
    const [subproducto,setSubProducto] = useState({
        nombre:"",
        descripcion:"",
        detalle:{
            inventarioid:"",
            cantidad:""
        }
    });
    const [errores,setErrores] = useState("");
    const [inventario,setInventario] = useState([]);
    const [newInventario,setNewInventario] = useState([]);
    const [existe,setExiste] = useState([])
    const [receta,setReceta] = useState([])
    const [inventcargado,setInventCargado] = useState(false)
    const [tiposubproducto,setTipoSubProducto] = useState([])

    const cargarInventario = async()=>{
        try {
            const rp = await getInventariosRequest();
            setInventario(rp.data);
        } catch (error) {
            console.error(error)
        }
    }

    const agregarProducto = (values)=>{
        setExiste([...existe,values.inventarioid])
        const nombre = filtrarNombres(values.inventarioid)
        const desc = filtrarDescripcion(values.inventarioid)
        const tp = filtrarUnidad(values.inventarioid)
        
        setNewInventario([...newInventario,{inventarioid:values.inventarioid,nombre:nombre,desc:desc,cantidad:values.cantidad,tp:tp}])    
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
    const filtrarUnidad = (id)=>{
        const result = inventario.map((inv)=>{
            if(inv.inventarioid == id){
                return inv.tipounidad;
            }
        })
        return result
    }

    const cargarSubproductos = async(id)=>{
        try {
            const rp = await getSubProductoRequest(id);
            const rp2 = await getRecetaRequest(id);
            setReceta(rp2.data)                            
            setSubProducto({
                nombre:rp.data[0].nombre,
                descripcion:rp.data[0].descripcion,
                detalle:{
                    inventarioid:"",
                    cantidad:""
                }
            })
        } catch (error) {
            console.error(error) 
        }
    }

    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        setNewInventario([])
        cargarInventario(); 
    },[])
    useEffect(()=>{
        if(params.id){
            cargarSubproductos(params.id)
        }
    },[params.id])
    useEffect(()=>{
        if(receta.length>0 && !inventcargado){                  
            receta.map((receta) => {
                const nombre = filtrarNombres(receta.inventarioid);
                const desc = filtrarDescripcion(receta.inventarioid);
                const tp = filtrarUnidad(receta.inventarioid);
          
                // Agregar el nuevo objeto a newInventario
                setNewInventario((prevInventario) => [...prevInventario, {
                  inventarioid: receta.inventarioid,
                  nombre:nombre,
                  desc:desc,
                  cantidad: receta.cantidad,
                  tp:tp,
                }]);
              });
              setInventCargado(true)              
        }
    },[receta])

  return (
    <div>
        <Formik
          initialValues={subproducto}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
            actions.setSubmitting(true)
           if(params.id){
                await updSubProductoRequest(params.id,{nombre:values.nombre, descripcion:values.descripcion, detalle:newInventario})
           }else{
                await postSubProductoRequest({nombre:values.nombre, descripcion:values.descripcion, detalle:newInventario});
           }

            actions.resetForm();
            navigate('/subproducto/vista')
                         
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
                          className="text-white text-center text-lg font-bold">
                          SubProductos
                          </p>


                          <div className='justify-center flex mt-5 bg-gray-700 max-w-2xl ml-14 py-7 rounded-md'>

                            <div className='max-w-xl flex flex-wrap justify-between align-middle flex-row'>

                                <div className="mt-0 mr-32">
    
                                    <label className="block text-sm text-white">
                                    Nombre</label>
                            
                                    <input 
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    type="text" 
                                    name='nombre'
                                    placeholder="Escriba el nombre del subproducto" 
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
                                    placeholder="Escriba la descripcion" 
                                    value={values.descripcion || ''}
                                    onChange={handleChange}
                                    required 
                                    />
    
                                </div> 
                                <div className='mt-1'>
                                    <label className='block text-sm text-white'>
                                        Unidad de Medida
                                    </label>
                                    <select name="tipounidadmedidaid" value={values.tipounidadmedidaid} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange} required>
                                        <option value="">Seleccione una Opcion</option>
                                        {
                                            tiposubproducto.map(tipo=>
                                                <option value={tipo.tiposubproductoid} key={tipo.tiposubproductoid} className=" hover:bg-sky-700">{tipo.descripcion}</option>
                                            )
                                        }
                                    </select>
                                </div> 
                            </div>
                        </div>


                        <div className='max-w-2xl flex justify-center align-middle mt-5 bg-slate-700 flex-col px-5 py-5 ml-14 rounded-md'>
                            <p 
                            className="text-white text-center text-lg font-bold mb-5"
                            >
                                Receta
                            </p>
                            <div className='max-w-xl flex justify-center align-middle ml-5'>

                                <div className='ml-2 mr-4'>
                                    <label className='block text-sm text-white'>
                                    Ingrediente
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
                                    placeholder="Cantidad de ingrediente" 
                                    value={values.detalle.cantidad || ''}
                                    onChange={handleChange}
                                    />{
                                        inventario.filter(invent=>invent.inventario == values.detalle.inventarioid).tipounidad
                                    }
        
                                </div>
                                <div className='justify-end flex ml-16 mt-5 -mr-2'>
                                            <button 
                                            type='button'
                                            onClick={()=>{
                                                let exist = newInventario.length == 0 ? false : existe.includes(values.detalle.inventarioid)                                      
                                                if(values.detalle.inventarioid && values.detalle.cantidad && values.nombre && values.descripcion){
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
                                                                <div className="font-semibold text-left">Medida</div>
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
                                                                    <div className="text-left">{invent.tp}</div>
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
                        <div className='max-w-2xl flex justify-start align-middle mt-5 bg-slate-700 flex-col px-5 py-5 ml-14 rounded-md'>                                    
                            <div className="ml-6 mt-4 items-center flex justify-start">
            
                                <button 
                                className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                type="submit"
                                disabled = {isSubmitting}>{isSubmitting ? "Guardando...":"Guardar"}</button>
                                <Link to='/subproducto/vista'  className=" ml-2 px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded">Cancelar</Link>
            
                            </div>
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

export default Subproductos