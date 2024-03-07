/* eslint-disable no-unused-vars */
import { Link, useNavigate,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Formik,FieldArray } from 'formik'
import { postPedidosRequest } from '../api/pedido.api';
import { getPersonasRequest } from '../api/personas.api';
import { getProductosRequest } from '../api/productos.api';


function Pedidos() {

    const [pedidos,setPedidos] = useState({
        personasid:"",
        total:"",
        fecha:"",
        detalle:{
            productoid:"",
            subtotal:0,
            cantidad:0
        }
    })
    const [existe,setExiste] = useState([]);
    const [productos,setProductos] = useState([]);
    const [cliente,setCliente] = useState([]);
    const [total,setTotal] = useState(0);
    const [errores, setErrores] = useState("");
    const [newProducto,setNewProducto] = useState([]);


    const cargarCliente = async()=>{
        try {
            const rp = await getPersonasRequest(2);
            
            setCliente(rp.data)
        } catch (error) {
            console.error(error)
        }
    }

    const cargarProductos = async()=>{
        try {
            const rp = await getProductosRequest();
            setProductos(rp.data)
        } catch (error) {
            console.error(error)
        }
    }

    const agregarProducto = (values)=>{
        setExiste([...existe,values.productoid])
        const nombre = filtrarNombres(values.productoid)
        const prod = productos.filter((p)=>p.productoid == values.productoid)

        setNewProducto([...newProducto,{productoid:values.productoid,nombre:nombre,cantidad:values.cantidad,subtotal:prod[0].precio,tipomedida:prod[0].tipomedida}])
        setTotal(parseInt(total) + parseInt(prod[0].precio * values.cantidad))
    }

    const filtrarNombres = (id)=>{
        const result = productos.map((inv)=>{
            if(inv.productoid==id){
                return inv.nombre
            }
        })
        
        return result
    }

    useEffect(()=>{
        cargarCliente();
        cargarProductos();

    },[])

    const navigate = useNavigate();
    const params = useParams();  

  return (
    <div>
        <Formik
          initialValues={pedidos}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
              await postPedidosRequest({personasid:values.personasid,total:total,fecha:values.fecha,detalle:newProducto})             
              actions.resetForm();
              //navigate('/pedidos/vista');
          }}
        >
          {({handleChange,handleSubmit,values,isSubmitting})=>(
            <div className="h-full font-sans bg-cover bg-zinc-950  ">
  
              <div className="container mx-auto flex flex-1 justify-center items-center">
  
                  <div className="w-full max-w-2xl">
  
                    <div className="leading-loose">
                     
                      <Form 
                      className="max-w-2xl m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl mt-20" 
                      onSubmit={handleSubmit}
                      >

                          <p 
                          className="text-white text-center text-lg font-bold mb-10">
                          Pedidos
                          </p>
                          <div className='flex flex-wrap justify-around'>
                                <div className="mt-0">
    
                                    <label className="block text-sm text-white">
                                    Cliente</label>
                            
                                    <select name="personasid" defaultValue={values.personasid} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange}>
                                        <option value="">Seleccione una opción</option>
                                        {
                                            cliente.map(tipo=>
                                            <option value={tipo.personasid} key={tipo.personasid} className=" hover:bg-sky-700">{tipo.nombres}</option>
                                            )
                                        }
                                    </select>
        
                                </div>
                           
                                <div className="mt-0">
    
                                    <label className="block text-sm text-white">
                                    Total</label>
                            
                                    <input 
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    type="number" 
                                    name='total'
                                    placeholder="Escriba el total de la compra" 
                                    value={values.total || total}
                                    onChange={handleChange}
                                    required 
                                    />
        
                                </div>
                                <div className="mt-0">
    
                                    <label className="block text-sm text-white">
                                    Fecha Entrega</label>
                            
                                    <input 
                                    className="w-full px-5 py-1 text-gray-900 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    type="date" 
                                    name='fecha'                                  
                                    value={values.fecha || ''}
                                    onChange={handleChange}
                                    required 
                                    />
        
                                </div>                           

                            </div>

                          <div className=' w-full justify-end flex mt-5'>
                                    <button 
                                    type='button' 
                                    onClick={()=>{
                                        let exist = newProducto.length == 0 ? false : existe.includes(values.detalle.productoid)     
                                        if(values.detalle.productoid && values.detalle.cantidad ){
                                            if(exist == false){
                                                setErrores("")
                                                agregarProducto(values.detalle)
                                            }else{
                                                setErrores("Ya existe la misma materia prima")
                                            }
                                        }
                                        else{
                                            setErrores("Ingrese todos los datos")
                                        }
                                    }}  
                                    className="px-4 py-1 text-white font-light tracking-wider bg-green-600 hover:bg-green-700 rounded text-lg">+</button>
                          </div>
                          
                        <div className='flex flex-wrap justify-between  columns-3'>
                                <div className="mt-0">
        
                                    <label className="block text-sm text-white">
                                    Producto</label>
                                    
                                    <select 
                                    name="detalle.productoid" 
                                    value={values.detalle.productoid} 
                                    className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    onChange={handleChange} 
                                    >
                                    <option value="0">Seleccione una opción</option>
                                    {
                                        productos.map(inv=>
                                            <option value={inv.productoid} key={inv.productoid} className=" hover:bg-sky-700">{inv.nombre}</option>  
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
                                    placeholder="Escriba la cantidad a comprar" 
                                    value={values.detalle.cantidad || ''}
                                    onChange={handleChange}
                                    required 
                                    />
                                    
                                </div>
                                
                        </div>

                        <div className=''>
                        {errores.length>0 ?<div className='flex justify-center align-middle font-mono text-justify text-red-500 text-base mt-5'> {errores} </div>: null}
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
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">Subtotal</div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm divide-y divide-gray-100">
                                                    {
                                                        newProducto.map((invent,index)=>(
                                                        <tr key={invent.productoid}>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-gray-800">{invent.nombre}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">{invent.cantidad}{' '}{invent.tipomedida}</div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-green-500">{invent.subtotal} GS</div>
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

                        <div className="mt-4 items-center flex justify-start">
  
                          <button 
                          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                          type="submit"
                          disabled={isSubmitting}
                          >
                          Guardar
                          </button>
                          <Link to='/pedidos/vista'  className=" ml-2 px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded">Cancelar</Link>

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

export default Pedidos