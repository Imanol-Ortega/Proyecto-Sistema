/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { dltFacturaCompraRequest, getCompraRequest } from "../api/facturacompra.api";


function FacturaCompraView() {

    const [compra, setCompra] = useState([]);
    const [filterCompra, setFilterCompra] = useState([]);

    const [seleccion,setSeleccion] = useState(1)
    const [currentItems,setCurrentItems] = useState([]);
    const [pageCount,setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    const cargarCompra = async()=>{
        try {
            const rp = await getCompraRequest();
            setCompra(rp.data)
            setFilterCompra(rp.data)
        } catch (error) {
            console.error(error)
        }
    }

    const filtrado = (filter)=>{
       if(filter){ 
            if(seleccion == 1){
                
                setFilterCompra(filterCompra.filter(producto => producto.timbrado.toString().includes(filter)))
            }
            else if(seleccion == 2){
                setFilterCompra(filterCompra.filter(producto => producto.proveedor.toLowerCase().includes(filter.toLowerCase() ) ) )
            }
        }else{
            setFilterCompra(compra)
        }
    }

    const convertirFecha = (fecha)=>{
        const date = new Date(fecha);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
    }

    const borrarInventario = async(id)=>{
        try {
            const rp = await dltFacturaCompraRequest(id);
            setCompra(filterCompra.filter(filcompra => filcompra.compraid !=id))
            setFilterCompra(filterCompra.filter(filinventario => filinventario.compraid !=id))
        } catch (error) {
            console.error(error)
        }
    }

    const handlePageClick = (e)=>{
        const newOffset = (e.selected * itemsPerPage) % filterCompra.length;
        setItemOffset(newOffset);
     }

     useEffect(()=>{
        cargarCompra()
     },[])

    useEffect(()=>{
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filterCompra.slice(itemOffset,endOffset));
        setPageCount(Math.ceil(filterCompra.length / itemsPerPage));
    },[itemOffset,itemsPerPage,filterCompra])

  return (
    <div className="h-full font-sans bg-cover bg-zinc-950">
    <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-4xl -mt-48">
            <div className="py-8"> 

                <div className="my-2 flex justify-center mr-4 ml-4 p-1 sm:flex-row flex-col">
                    <p className="text-white text-center text-xl font-bold">Factura Compra</p>
                </div>

                <div className="my-2 flex justify-end mr-4 ml-4 p-1 bg-gray-700 rounded sm:flex-row flex-col">
                    <div className="block relative mr-5">

                                <label className='text-base text-white mr-3'>Filtrar por : </label>

                                <select 
                                name="opcion" 
                                className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white text-sm" 
                                value={seleccion}
                                onChange={(e)=>setSeleccion(e.currentTarget.value)}
                                >
                                    <option value="1">Timbrado</option>
                                    <option value="2">Proveedor</option>
                                </select>    
                                
                            </div>
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
                        <Link to='/facturacompra/nuevo' className='px-3 py-1 text-white font-light tracking-wider bg-green-700 hover:bg-green-600 rounded text-lg -ml-10 mr-2'>Agregar</Link>                      
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
                                                                Timbrado
                                                            </div>
                                                        </th>  
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">
                                                                Proveedor
                                                            </div>
                                                        </th> 
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">
                                                                Fecha
                                                            </div>
                                                        </th>   
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left">
                                                                Total
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
                                                        currentItems.map((tipo)=>(
                                                            <tr key={tipo.compraid}>
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">
                                                                        {tipo.compraid}
                                                                    </div>
                                                                </td>
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">
                                                                        {tipo.timbrado}
                                                                    </div>
                                                                </td>
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">
                                                                        {tipo.proveedor}
                                                                    </div>
                                                                </td>
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-left">
                                                                        {convertirFecha(tipo.fecha)}
                                                                    </div>
                                                                    
                                                                </td>
                                                                <td className="p-2 whitespace-nowrap">
                                                                    
                                                                    <div className="text-left">
                                                                        {tipo.total}GS
                                                                    </div>
                                                                </td>
                                                               
                                                                <td className="p-2 whitespace-nowrap">
                                                                    <div className="text-right">
                                                                        <button 
                                                                        className='px-3 py-1 text-white font-light tracking-wider bg-red-700 hover:bg-red-600 rounded text-xs -ml-1'
                                                                        onClick={()=>{
                                                                            borrarInventario(tipo.compraid)
                                                                        }}
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
                                                filterCompra.length == 0 ?  
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

export default FacturaCompraView