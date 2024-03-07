/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductoRequest, getProductoSubproductoRequest, postProductoRequest, updProductoRequest } from '../api/productos.api';
import { getTipoUnidadMedidasRequest } from '../api/tipounidadmedida.api';
import { getCategoriasRequest } from '../api/categoria.api';
import { getTipoProductosRequest } from '../api/tipoproducto.api';
import { getSubProductosRequest } from '../api/subproducto.api';
import { getTipoSubproductosRequest } from '../api/tiposubproducto.api';

function Productos() {
    const [productos,setProductos] = useState({
        nombre:"",
        descripcion:"",
        precio:0,
        tipounidadmedidaid:"",
        tipoproductoid:"",
        categoriaid:"",
        detalle:{
            subproductoid:""
        }
    })
    const [errores,setErrores] = useState("");
    const [newInventario,setNewInventario] = useState([]);
    const [subproductos,setSubProductos] = useState([]);
    const [newSub,setNewSub] = useState([]);
    const [existe,setExiste] = useState([]);
    const [tipounidad,setTipoUnidad] = useState([]);
    const [image,setImage] = useState(null)
    const [tipoproductos,setTipoProductos] = useState([]);
    const [categorias,setCategorias] = useState([]);
    const [tiposubproducto,setTipoSubProducto] = useState([]);
    const [productoSubproducto,setProductoSubproducto] = useState([]);
    const [inventcargado,setInventCargado] = useState(false)

    const navigate = useNavigate();
    const params = useParams();

    const cargarSubProductos = async()=>{
        try {
            const rp = await getSubProductosRequest();
            setSubProductos(rp.data)
        } catch (error) {
            console.error(error);
        }
    }
    const cargarTipoSubProducto = async()=>{
        try {
            const rp = await getTipoSubproductosRequest();
            setTipoSubProducto(rp.data);
        } catch (error) {
            console.error(error)
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
    const cargarTipoProductos = async()=>{
        try {
            const rp = await getTipoProductosRequest();
            setTipoProductos(rp.data)
        } catch (error) {
            console.error(error);
        }
    }
    const cargarCategorias = async()=>{
        try {
            const rp = await getCategoriasRequest();
            setCategorias(rp.data)
        } catch (error) {
            console.error(error);
        }
    }

    const agregarProducto = (values,valor)=>{
        setExiste([...existe,values.subproductoid])
        const nombre = filtrarNombres(values.subproductoid)
        const tiposub = filtrarTipoSub(values.subproductoid)
        const precio = filtrarPrecio(values.subproductoid)
        setNewInventario([...newInventario,{subproductoid:values.subproductoid,nombre:nombre,precio:precio,tiposub:tiposub}])    
    }  
    const filtrarNombres = (id)=>{
        const result = subproductos.map((inv)=>{
            if(inv.subproductoid==id){
                return inv.nombre
            }
        })
        return result
    } 
    const filtrarTipoSub = (id)=>{
        const result = subproductos.map((inv)=>{
            if(inv.subproductoid==id){
                return inv.tiposub
            }
        })
        return result
    } 

    const filtrarPrecio = (id)=>{
        const result = subproductos.map((inv)=>{
            if(inv.subproductoid==id){
                return inv.precio
            }
        })
        return result
    }
    
    const cargarProductos = async(id)=>{
        try {
            const rp = await getProductoRequest(id);
            const rp2 = await getProductoSubproductoRequest(id);
            setProductoSubproducto(rp2.data)
            setProductos({
                nombre:rp.data[0].nombre,
                descripcion:rp.data[0].descripcion,
                precio:rp.data[0].precio,
                tipounidadmedidaid:rp.data[0].tipounidadmedidaid,
                tipoproductoid:rp.data[0].tipoproductoid,
                categoriaid:rp.data[0].categoriaid,
                detalle:{
                    subproductoid:""
                }
            })
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(()=>{
        cargarSubProductos();
        cargarTipoSubProducto();
        cargarTipoUnidad();
        cargarCategorias();
        cargarTipoProductos();
    },[])

    useEffect(()=>{
        if(params.id){
            cargarProductos(params.id);
        }
    },[params.id])

    useEffect(()=>{
        if(productoSubproducto.length>0 && !inventcargado ){
            productoSubproducto.map((prosub)=>{
                setExiste((prev)=>[...prev,prosub.subproductoid]);
                const nombre = filtrarNombres(prosub.subproductoid)
                const tiposub = filtrarTipoSub(prosub.subproductoid)
                const precio = filtrarPrecio(prosub.subproductoid)
                console.log(prosub.subproductoid)
                setNewInventario((prev) => [...prev,{
                    subproductoid:prosub.subproductoid,
                    nombre:nombre,
                    precio:precio,
                    tiposub:tiposub
                }]) 
            })
            setInventCargado(true)
        }
    },[productoSubproducto])


  return (
    <div>
        <Formik
          initialValues={productos}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{          
            if(params.id){
                await updProductoRequest(
                    params.id,
                    {
                        nombre:values.nombre,
                        descripcion:values.descripcion,
                        precio:values.precio,
                        imagen:image,
                        tipounidadmedidaid:values.tipounidadmedidaid,
                        tipoproductoid:values.tipoproductoid,
                        categoriaid:values.categoriaid,
                        detalle:newInventario
                    })
            }else{
                await postProductoRequest(
                    {
                        nombre:values.nombre,
                        descripcion:values.descripcion,
                        precio:values.precio,
                        imagen:image,
                        tipounidadmedidaid:values.tipounidadmedidaid,
                        tipoproductoid:values.tipoproductoid,
                        categoriaid:values.categoriaid,
                        detalle:newInventario
                    })
            }
            setProductos([]);
            actions.resetForm();
            navigate('/productos/vista')     
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
                                    value={values.precio || 0}
                                    onChange={handleChange}
                                    required 
                                    />
                                </div>                              

                                <div className='mt-1'>
                                    <label className='block text-sm text-white'>
                                        Unidad de Medida del precio
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
                                        Tipo Producto
                                    </label>
                                    <select name="tipoproductoid" value={values.tipoproductoid} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange} required>
                                        <option value="">Seleccione una Opcion</option>
                                        {
                                            tipoproductos.map(tipo=>
                                                <option value={tipo.tipoproductoid} key={tipo.tipoproductoid} className=" hover:bg-sky-700">{tipo.descripcion}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className='mt-1'>
                                    <label className='block text-sm text-white'>
                                        Categoria
                                    </label>
                                    <select name="categoriaid" value={values.categoriaid} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange} required>
                                        <option value="">Seleccione una Opcion</option>
                                        {
                                            categorias.map(tipo=>
                                                <option value={tipo.categoriaid} key={tipo.categoriaid} className=" hover:bg-sky-700">{tipo.descripcion}</option>
                                            )
                                        }
                                    </select>
                                </div>                                              
                            </div>
                            
                        </div>
                        <div className='max-w-2xl flex justify-center align-middle mt-5 bg-slate-700 flex-col px-5 py-5 ml-14 rounded-md'>
                            <div className='max-w-xl flex justify-center align-middle ml-5'>
                                <div className="ml-5 max-w-xs">
        
                                    <label className="block text-sm text-white">
                                    Tipo SubProducto</label>
                                    <select 
                                    className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    onChange={(e)=>{
                                        setNewSub(subproductos.filter((n)=>n.tiposubproductoid == e.currentTarget.value))
                                    }}
                                    >
                                        <option value="">Seleccione una opción</option>
                                        {
                                            tiposubproducto.map(tipo=>(
                                                <option value={tipo.tiposubproductoid} key={tipo.tiposubproductoid} className=" hover:bg-sky-700">{tipo.descripcion}</option>
                                            ))
                                        }
                                    </select>
                                   
        
                                </div>
                                <div className='ml-2 mr-4'>
                                    <label className='block text-sm text-white'>
                                    Producto
                                    </label>
                                    <select name="detalle.subproductoid" value={values.detalle.subproductoid} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange}>
                                        <option value="">Seleccione una opción</option>
                                        {
                                            newSub.map(tipo=>(
                                                <option value={tipo.subproductoid} key={tipo.subproductoid} className=" hover:bg-sky-700">{tipo.nombre}</option>
                                            ))
                                        }
                                    </select>
                                            
                                </div>
                                
                                <div className='justify-end flex ml-16 mt-5 -mr-2'>
                                            <button 
                                            type='button'
                                            onClick={()=>{
                                                let exist = newInventario.length == 0 ? false : existe.includes(values.detalle.inventarioid)                                      
                                                //if(values.detalle.subproductoid && values.precio && values.descripcion && values.nombre && values.tipounidadmedidaid && values.tipoproductoid && values.categoriaid && image){
                                                    if(exist == false){
                                                        setErrores("")
                                                        agregarProducto(values.detalle)
                                                    }
                                                    else{
                                                        setErrores("Ya existe el mismo producto")
                                                    }
                                                /* }
                                                else{
                                                    setErrores("Ingrese todos los datos")
                                                } */
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
                                                                <div className="font-semibold text-left">SubProducto</div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">Precio Agregado</div>
                                                            </th> 
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">Tipo Sub Producto</div>
                                                            </th>                                                         
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-sm divide-y-2 divide-gray-100">
                                                        {
                                                            newInventario.map((invent)=>(
                                                            <tr key={invent.subproductoid}>
                                                            
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">{invent.nombre}</div>
                                                                </td>
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">{invent.precio}</div>
                                                                </td>
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">{invent.tiposub}</div>
                                                                </td>
                                                                
                                                                <td className="p-2 whitespace-nowrap">
                                                                   <button
                                                                   type='button'
                                                                   className='px-4 py-1 text-white font-light tracking-wider bg-red-700 hover:bg-red-600 rounded text-lg'
                                                                   onClick={()=>{
                                                                    setNewInventario(newInventario.filter(newInventario => newInventario.subproductoid != invent.subproductoid))
                                                                    setExiste(existe.filter(existe=> existe != invent.subproductoid))
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

                            <div className="ml-14 mt-4 items-center flex justify-start">
  
                              <button 
                              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                              type="submit"
                              disabled={isSubmitting}>
                              Guardar</button>
                              <Link to='/productos/vista'  className=" ml-2 px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded">Cancelar</Link>
  
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