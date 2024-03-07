/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate,Link,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { getProductosRequest } from '../api/productos.api';
import { getDescuentoRequest, getOfertaRequest, postOfertaRequest, updOfertasRequest } from '../api/ofertas.api';

function Ofertas() {

    const [ofertas,setOfertas]=useState({
        nombre:"",
        estado:"",
        descuento:{
            productoid:"",
            descuento:""
        }
    });
    const [errores,setErrores] = useState("");
    const [producto,setProductos] = useState([]);
    const [existe,setExiste] = useState([]);
    const [descuento,setDescuento] = useState([]);
    const [newProducto,setNewProducto] = useState([]);
    const [inventcargado,setInventCargado] = useState(false)

    const navigate = useNavigate();
    const params = useParams();

    const cargarProducto = async()=>{
        try {
            const rp = await getProductosRequest();
            setProductos(rp.data)
        } catch (error) {
            console.error(error)
        }
    }

    const cargarOferta = async(id)=>{
        try {
            const rp = await getOfertaRequest(id);
            const rp2 = await getDescuentoRequest(id);
            setDescuento(rp2.data)
            setOfertas({
                nombre:rp.data[0].nombre,
                estado:rp.data[0].estadogeneral,
                descuento:{
                    productoid:"",
                    descuento:""
                }
            })

        } catch (error) {
            console.error(error)
        }
    }

    const agregarProducto = (values)=>{
        setExiste([...existe,values.productoid])
        const nombre = filtrarNombres(values.productoid) 
        setNewProducto([...newProducto,{productoid:values.productoid,descuento:values.descuento,nombre:nombre}])    
    } 
    
    const filtrarNombres = (id)=>{
        const result = producto.map((inv)=>{
            if(inv.productoid==id){
                return inv.nombre
            }
        })
        return result
    }
    


    useEffect(()=>{
        cargarProducto()
    },[])

    useEffect(()=>{
        if(params.id){
            cargarOferta(params.id)
        }
    },[params.id])

    useEffect(()=>{
        if(descuento.length>0 && !inventcargado ){
            descuento.map((d)=>{
                setExiste((pr)=>[...pr,d.productoid]);
                const nombre = filtrarNombres(d.productoid);
                setNewProducto((pr)=>[...pr,{
                    productoid:d.productoid,
                    descuento:d.descuento,
                    nombre:nombre
                }])
            })
            
            setInventCargado(true)
        }

    },[descuento])

  return (
    <div>
        <Formik
          initialValues={ofertas}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
              if(params.id){
                await updOfertasRequest(params.id,{nombre:values.nombre,estado:values.estado,descuento:newProducto})
              }else{
                await postOfertaRequest({nombre:values.nombre,descuento:newProducto})
              }
              actions.resetForm();
              navigate('/ofertas/vista');           
          }}
        >
          {({handleChange,handleSubmit,values,isSubmitting})=>(
            <div className="h-full font-sans bg-cover">
  
              <div className="container mx-auto h-full flex flex-1 justify-center items-center">
  
                  <div className="w-full max-w-4xl">
  
                    <div className="leading-loose">
                     
                      <Form 
                      className="max-w-4xl m-4 mt-32 p-10 bg-white bg-opacity-25 rounded shadow-xl" 
                      onSubmit={handleSubmit}
                      >

                          <p 
                          className="text-white text-center text-lg font-bold">
                          Ofertas
                          </p>
                            <div className='justify-center flex mt-5 bg-gray-700 max-w-2xl ml-14 py-7 rounded-md'>
                                <div className='max-w-xl flex flex-wrap justify-between align-middle flex-row'>
                                    <div className="mt-0">
        
                                        <label className="block text-sm text-white">
                                        Nombre</label>
                                
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
                                    <div className="ml-2 max-w-xs">
        
                                        <label className="block text-sm text-white">
                                        Estado</label>
                                        <select 
                                        className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        name='estado'
                                        value={values.estado} 
                                        onChange={handleChange}
                                        >
                                            <option value={true}>Activo</option>
                                            <option value={false}>Inactivo</option>
                                           
                                        </select>
                                   
        
                                </div>                                         
                                </div>
                            </div>
                        <div className='max-w-2xl flex justify-center align-middle mt-5 bg-slate-700 flex-col px-5 py-5 ml-14 rounded-md'>
                            <div className='max-w-xl flex justify-center align-middle ml-5'>
                                <div className="ml-2 max-w-xs">
        
                                    <label className="block text-sm text-white">
                                    Productos</label>
                                    <select 
                                    className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    name='descuento.productoid'
                                    value={values.descuento.productoid} 
                                    onChange={handleChange}
                                    >
                                        <option value="">Seleccione una opción</option>
                                        {
                                            producto.map(tipo=>(
                                                <option value={tipo.productoid} key={tipo.productoid} className=" hover:bg-sky-700">{tipo.nombre}</option>
                                            ))
                                        }
                                    </select>
                                   
        
                                </div>
                                <div className='ml-2 mr-4'>
                                    <label className='block text-sm text-white'>
                                    Descuento
                                    </label>
                                    <input 
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type='text'
                                        name='descuento.descuento'
                                        value={values.descuento.descuento || ''} 
                                        onChange={handleChange}
                                        placeholder="Escriba el descuento " 
                                         />
                                            
                                </div>
                                
                                <div className='justify-end flex ml-16 mt-5 -mr-2'>
                                    <button 
                                    type='button'
                                    onClick={()=>{
                                        let exist = newProducto.length == 0 ? false : existe.includes(values.descuento.productoid)                                      
                                        if(values.descuento.productoid && values.descuento.descuento){
                                            if(exist == false){
                                                setErrores("")
                                                agregarProducto(values.descuento)
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
                                                                <div className="font-semibold text-left">Descuento</div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">Acciones</div>
                                                            </th>                                                                                                                   
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-sm divide-y-2 divide-gray-100">
                                                        {
                                                            newProducto.map((invent)=>(
                                                            <tr key={invent.productoid}>
                                                            
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">{invent.nombre}</div>
                                                                </td>
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">{invent.descuento}</div>
                                                                </td>                                                             
                                                                
                                                                <td className="p-2 whitespace-nowrap">
                                                                   <button
                                                                   type='button'
                                                                   className='px-4 py-1 text-white font-light tracking-wider bg-red-700 hover:bg-red-600 rounded text-lg'
                                                                   onClick={()=>{
                                                                    setNewProducto(newProducto.filter(newInventario => newInventario.productoid != invent.productoid))
                                                                    setExiste(existe.filter(existe=> existe != invent.productoid))
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
                              Guardar
                              </button>
                              <Link to='/ofertas/vista'  className=" ml-2 px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded">Cancelar</Link>
  
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

export default Ofertas