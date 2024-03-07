/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { dltInventarioRequest, getInventariosRequest } from "../api/inventario.api";


function InventarioView() {

    const [inventario, setInventario] = useState([]);
    const [filterInventario, setFilterInventario] = useState([]);

    const [currentItems,setCurrentItems] = useState([]);
    const [pageCount,setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    const cargarTipoPersonas = async()=>{
        try {
            const rp = await getInventariosRequest()
            setInventario(rp.data)
            setFilterInventario(rp.data)
        } catch (error) {
            console.error(error)
        }
    }

    const filtrado = (filter)=>{
       if(filter){ 
            setFilterInventario(filterInventario.filter(producto => producto.nombre.toLowerCase().includes(filter.toLowerCase() ) ) )
        }else{
            setFilterInventario(inventario)
        }
    }

    const borrarInventario = async(id)=>{
        try {
            const rp = await dltInventarioRequest(id)
            setInventario(filterInventario.filter(filinventario => filinventario.inventarioid !=id))
            setFilterInventario(filterInventario.filter(filinventario => filinventario.inventarioid !=id))
        } catch (error) {
            console.error(error)
        }
    }

    const handlePageClick = (e)=>{
        const newOffset = (e.selected * itemsPerPage) % filterInventario.length;
        setItemOffset(newOffset);
     }

     useEffect(()=>{
        cargarTipoPersonas()
     },[])

    useEffect(()=>{
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filterInventario.slice(itemOffset,endOffset));
        setPageCount(Math.ceil(filterInventario.length / itemsPerPage));
    },[itemOffset,itemsPerPage,filterInventario])

  return (
    <div className="h-full font-sans bg-cover bg-zinc-950">
            <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                <div className="w-full max-w-2xl -mt-48">
                    <div className="py-8"> 

                        <div className="my-2 flex justify-center mr-4 ml-4 p-1 sm:flex-row flex-col">
                            <p className="text-white text-center text-xl font-bold">Inventario</p>
                        </div>

                        <div className="my-2 flex justify-end mr-4 ml-4 p-1 bg-gray-700 rounded sm:flex-row flex-col">
                            
                            <div className="block relative">

                                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4 fill-current text-gray-500"
                                    >
                                        <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                                    </svg>
                                </span>

                                <input
                                placeholder="Filtrar"
                                onChange={(e)=>filtrado(e.currentTarget.value)}
                                className="appearance-none rounded-r rounded sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-gray-300 text-sm placeholder-gray-400 text-gray-900 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                                />
                            </div>

                            <div className="block relative ml-20 mt-1">
                                <Link to='/inventario/nuevo' className='px-3 py-1 text-white font-light tracking-wider bg-green-700 hover:bg-green-600 rounded text-lg -ml-10 mr-2'>Agregar</Link>                      
                            </div>

                        </div>

                        <div>
                            <section className="antialiased text-gray-600 px-4 mt-5 bg-cover rounded">
                                <div className="flex flex-col justify-center ">
                                    <div className="w-full  mx-auto bg-slate-300 shadow-lg rounded-sm border border-gray-200">
                                        <div className="p-3">
                                            <div className="overflow-x-auto">
                                                
                                                <table className="table-auto w-full">
                                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-700">
                                                        <tr>                          
                                                                <th className="p-2 whitespace-nowrap ">
                                                                    <div className="font-semibold text-left">
                                                                        ID
                                                                    </div>
                                                                </th>
                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        Nombre
                                                                    </div>
                                                                </th>  
                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        Cantidad
                                                                    </div>
                                                                </th> 
                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        Medida
                                                                    </div>
                                                                </th>                                                                
                                                                <th className="p-2 whitespace-nowrap">
                                                                    <div className="font-semibold text-left">
                                                                        Acciones
                                                                    </div>
                                                                </th>
                                                        </tr>
                                                    </thead>
                                                
                                                    <tbody className="text-sm divide-y-2 divide-gray-100">
                                                        {
                                                                currentItems.map((tipo,)=>(
                                                                    <tr key={tipo.inventarioid}>
                                                                        <td className="p-2 whitespace-nowrap">
                                                                            <div className="text-left">
                                                                                {tipo.inventarioid}
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap">
                                                                            <div className="text-left">
                                                                                {tipo.nombre}
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap">
                                                                            <div className="text-left">
                                                                                {tipo.cantidad}
                                                                            </div>
                                                                            
                                                                        </td>
                                                                        <td className="p-2 whitespace-nowrap">
                                                                            
                                                                            <div className="text-left">
                                                                                {tipo.tipounidad}
                                                                            </div>
                                                                        </td>
                                                                       
                                                                        <td className="p-2 whitespace-nowrap">
                                                                            <div className="text-right">                                                                              
                                                                                <Link to={`/inventario/edit/${tipo.inventarioid}`} className='px-3 py-1 text-white font-light tracking-wider bg-blue-600 hover:bg-blue-500 rounded text-xs -ml-10 mr-2'>Editar</Link>                                                                                                                                                            
                                                                                <button 
                                                                                className='px-3 py-1 text-white font-light tracking-wider bg-red-700 hover:bg-red-600 rounded text-xs -ml-1'
                                                                                onClick={()=>borrarInventario(tipo.inventarioid)}
                                                                                >
                                                                                    Eliminar
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                            ))
                                                        }
                                                        
                                                    </tbody>
                                                </table>
                                                <div className="w-full flex items-center justify-center mt-6">
                                                    <ReactPaginate 
                                                        breakLabel="..."
                                                        nextLabel="siguiente >"
                                                        onPageChange={handlePageClick}
                                                        pageRangeDisplayed={3}
                                                        pageCount={pageCount}
                                                        previousLabel="< anterior"
                                                        renderOnZeroPageCount={null}
                                                        containerClassName="list-none flex justify-center align-middle mb-5 text-sm gap-1"
                                                        pageLinkClassName="px-6 py-15 cursor-pointer rounded font-normal hover:bg-gray-600 hover:text-white"
                                                        previousClassName="px-6 py-15 cursor-pointer rounded font-normal hover:bg-gray-600 hover:text-white"
                                                        nextLinkClassName="px-6 py-15 cursor-pointer rounded font-normal hover:bg-gray-600 hover:text-white"
                                                        activeClassName="active: bg-gray-700 text-white"
                                                    />
                                                </div>
                                                <div className="w-full flex items-center justify-center">
                                                    {
                                                        filterInventario.length == 0 ?  
                                                        <div className='font-mono text-red-800 text-base mt-5 text-justify'> No hay nada por aquí... </div>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default InventarioView