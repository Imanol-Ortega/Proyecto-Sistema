/* eslint-disable no-unused-vars */
import { Link, useNavigate,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Formik,FieldArray } from 'formik'
import { getProveedoresRequest } from '../api/proveedor.api';
import { getInventariosRequest } from '../api/inventario.api';

import React from 'react';
import { postFacturaCompraRequest } from '../api/facturacompra.api';

function FacturaCompra() {
    const [factura,setFactura] = useState({
        timbrado:"",
        total:0,
        proveedorid:0,
        detalle:{
            inventarioid:"",
            cantidad:"",
            subtotal:""
        }
    })
    const [existe,setExiste] = useState([]);
    const [inventario,setInventario] = useState([]);
    const [proveedor,setProveedor] = useState([]);
    const [newInventario,setNewInventario] = useState([]);
    const [errores, setErrores] = useState("");
    const [total,setTotal]=useState(0)

    const cargarProveedor = async()=>{
        try {
            const resp = await getProveedoresRequest();
            setProveedor(resp.data)
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
        setExiste([...existe,values.inventarioid])
        const nombre = filtrarNombres(values.inventarioid)
        
        setNewInventario([...newInventario,{inventarioid:values.inventarioid,nombre:nombre,cantidad:values.cantidad,subtotal:values.subtotal}])
        setTotal(parseInt(total) + parseInt (values.subtotal))
    }

    const filtrarNombres = (id)=>{
        const result = inventario.map((inv)=>{
            if(inv.inventarioid==id){
                return inv.nombre
            }
        })
        
        return result
    }

    useEffect(()=>{
        cargarInventario();
        cargarProveedor();
    },[])

    const navigate = useNavigate();
    const params = useParams();  
  return (
    <div>
        <Formik
          initialValues={factura}
          enableReinitialize = {true}
          onSubmit={async(values,actions)=>{
              //actions.setSubmitting(true)
              await postFacturaCompraRequest({timbrado:values.timbrado,total:total,proveedorid:values.proveedorid,detalle:newInventario})
              
              console.log({timbrado:values.timbrado,total:total,proveedorid:values.proveedorid,detalle:newInventario})
              setFactura('')
              actions.resetForm();
              navigate('/');
          }}
        >
          {({handleChange,handleSubmit,values,isSubmitting})=>(
            <div className="h-full font-sans bg-cover bg-zinc-950  ">
  
              <div className="container mx-auto flex flex-1 justify-center items-center">
  
                  <div className="w-full max-w-4xl">
  
                    <div className="leading-loose">
                     
                      <Form 
                      className="max-w-4xl m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl mt-20" 
                      onSubmit={handleSubmit}
                      >

                          <p 
                          className="text-white text-center text-lg font-bold mb-10">
                          Factura Compra
                          </p>
                          <div className='flex flex-wrap justify-between'>
                                <div className="mt-0">
    
                                <label className="block text-sm text-white">
                                Timbrado</label>
                        
                                <input 
                                className="w-full px-5 py-1 text-gray-900 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                type="number" 
                                name='timbrado'
                                placeholder="Escriba el timbrado de la factura" 
                                value={values.timbrado || ''}
                                onChange={handleChange}
                                required 
                                />
    
                                </div>
                           
                                <div className="mt-0">
    
                                <label className="block text-sm text-white">
                                Total</label>
                        
                                <input 
                                className="w-full px-5 py-1 text-gray-900 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                type="text" 
                                name='total'
                                placeholder="Escriba el total de la compra" 
                                value={values.total || total}
                                onChange={handleChange}
                                required 
                                />
    
                                </div>

                                <div>

                                <label className='block text-sm text-white'>
                                Proveedor
                                </label>
                                
                                
                                <select name="proveedorid" defaultValue={values.proveedorid || 2} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange}>
                                <option value="">Seleccione una opción</option>
                                {
                                    proveedor.map(tipo=>
                                    <option value={tipo.proveedorid} key={tipo.proveedorid} className=" hover:bg-sky-700">{tipo.nombre}</option>
                                    )
                                }
                                </select>
                                
                            </div>

                          </div>

                          <div className=' w-full justify-end flex mt-5'>
                                    <button 
                                    type='button' 
                                    onClick={()=>{
                                        let exist = newInventario.length == 0 ? false : existe.includes(values.detalle.inventarioid)     
                                        if(values.detalle.inventarioid && values.detalle.cantidad && values.detalle.subtotal){
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
                                    
                                    <select name="detalle.inventarioid" id="detalle.inventarioid" defaultValue={values.detalle.inventarioid} className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" onChange={handleChange} >
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

                                <div className="mt-0">
        
                                    <label className="block text-sm text-white">
                                    SubTotal</label>
                                    <input 
                                    className=" px-5 py-1 text-gray-900 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                                    type="number" 
                                    name='detalle.subtotal'
                                    placeholder="Escriba el subtotal del producto" 
                                    value={values.detalle.subtotal || ''}
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
                                                        newInventario.map((invent,index)=>(
                                                        <tr key={index}>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-gray-800">{invent.nombre}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">{invent.cantidad}</div>
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
                          <Link to='/facturacompra/vista'  className=" ml-2 px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded">Cancelar</Link>

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

export default FacturaCompra
