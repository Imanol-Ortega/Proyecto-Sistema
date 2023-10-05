
import {Form,Formik} from 'formik'
import { usePersonas } from '../context/PersonasProvider'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function PersonasForm() {
    
    const {postPersonaRequest,updPersonasRequest} = usePersonas();
    const [personas,setPersonas] = useState({
        "nombres": "",
        "apellidos":"",
        "telefono":"",
        "direccion":"",
        "nrodocumento":0,
        "email":"",
        "tipodocumentoid":0,
        "tipopersonaid":0,

    });
    const params = useParams();

    
    return (
        <div>
            <Formik
                    initialValues={personas}
                    enableReinitialize = {true}
                    onSubmit={async(values)=>{
                        if (params.id){
                            await updPersonasRequest(params.id,values);
                        }else{
                            await postPersonaRequest(values);
                            window.location.replace('/')
                        }
                        setPersonas({
                            "nombres": "",
                            "apellidos":"",
                            "telefono":"",
                            "direccion":"",
                            "nrodocumento":0,
                            "email":"",
                            "tipodocumentoid":0,
                            "tipopersonaid":0,
                        })
                    }}
                >
                {({handleChange,handleSubmit,values,isSubmitting})=>(
                    <div className='container ml-auto mr-auto flex items-center justify-center'>
                        <div className='w-full md:w-1/2'>
                            <Form onSubmit={handleSubmit} className='bg-white px-8 pt-6 pb-8 mb-4'>
                                <h1 className='text-gray-700 text-xl font-bold uppercase text-center'>{
                                    params.id ? "Editando Persona": "Creando Persona"
                                    }
                                </h1>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Nombres</label>
                                <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                type="text" 
                                name='nombres' 
                                placeholder='Ingrese sus nombres' 
                                onChange={handleChange} 
                                values={values.nombres}/>
                                
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Apellidos</label>
                                <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                type="text" 
                                name='apellidos' 
                                placeholder='Ingrese sus apellidos' 
                                onChange={handleChange} 
                                values={values.apellidos}/>

                                <label className='block text-gray-700 text-sm font-bold mb-2'>Telefono</label>
                                <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                type="text" 
                                name='telefono' 
                                placeholder='Ingrese su telefono' 
                                onChange={handleChange} 
                                values={values.telefono}/>

                                <label className='block text-gray-700 text-sm font-bold mb-2'>Direccion</label>
                                <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                type="text" 
                                name='direccion' 
                                placeholder='Ingrese su direccion' 
                                onChange={handleChange} 
                                values={values.direccion}/>

                                <label className='block text-gray-700 text-sm font-bold mb-2'>Nro Documento</label>
                                <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                type="number" 
                                name='nrodocumento' 
                                placeholder='Ingrese su Nro de documento' 
                                onChange={handleChange} 
                                values={values.nrodocumento}/>

                                <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                                <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                type="text" 
                                name='email' 
                                placeholder='Ingrese su Email' 
                                onChange={handleChange} 
                                values={values.email}/>

                                <label className='block text-gray-700 text-sm font-bold mb-2'>Tipo documento</label>
                                <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                type="number" 
                                name='tipodocumentoid' 
                                placeholder='Ingrese su tipo de documento' 
                                onChange={handleChange} 
                                values={values.tipodocumentoid}/>

                                <label className='block text-gray-700 text-sm font-bold mb-2'>Tipo persona</label>
                                <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                type="number" 
                                name='tipopersonaid' 
                                placeholder='Ingrese su tipo de persona' 
                                onChange={handleChange} 
                                values={values.tipopersonaid}/>

                                
                                <button 
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4'
                                type='Submit' 
                                disabled = {isSubmitting}>{isSubmitting ? "Guardando...":"Guardar"}</button>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default PersonasForm


/*useEffect(()=>{
        const loadPersona = async()=>{
            if(params.id){
                const response = await getPersonaRequest(params.id);
                console.log(response.nombres)
                setPersonas({
                    "nombres":response.nombres,
                    "apellidos":response.apellidos,
                    "telefono":response.telefono,
                    "direccion":response.direccion,
                    "nrodocumento":response.nrodocumento,
                    "email":response.email,
                    "tipodocumentoid":response.tipodocumentoid,
                    "tipopersonaid":response.tipodocumentoid,
                });
            }
        }
        loadPersona();
    },[getPersonaRequest,params.id]) */