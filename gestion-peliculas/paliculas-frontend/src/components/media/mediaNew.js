import React, {useState,useEffect} from 'react'
import{getGenero} from '../../services/generoService';
import{getProductora} from '../../services/productoraService';
import{getDirector} from '../../services/directoService';
import{getTipo} from '../../services/tipoService';
import Swal from 'sweetalert2';
import { crearMedias } from '../../services/MediaService';

export const MediaNew = ({handleOpenModal,listarMedias}) => {

    const[directores, setDirectores ]= useState([]);
    const[productoras, setProductoras ]= useState([]);
    const[generos, setGeneros ]= useState([]);
    const[tipos, setTipos ]= useState([]);
    const[valoresForm, setValoresForm] = useState([]);
    const{serial='',titulo='',sinopsis='',anoEstreno='',imagenPortada='',urlPelicula='',genero,productora,tipo,director}= valoresForm

    const listarGenero = async ()=> {
        try {
            const {data} = await getGenero();
            setGeneros(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarGenero();
    },[]);

    const listarTipo = async ()=> {
        try {
            const {data} = await getTipo();
            setTipos(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarTipo();
    },[]);

    
    const listarProductora = async ()=> {
        try {
            const {data} = await getProductora();
            setProductoras(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarProductora();
    },[]);

    const listarDirector = async ()=> {
        try {
            const {data} = await getDirector();
            setDirectores(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarDirector();
    },[]);

    const handleOnChange = ({target}) => {
        const {name,value} = target;
        setValoresForm({...valoresForm,[name]:value});
    }

    const handleOnSumit = async (e) => {
        e.preventDefault();
        const media ={serial,titulo,sinopsis,anoEstreno,imagenPortada,urlPelicula,
            genero:{_id:genero},
            productora:{_id:productora},
            tipo:{_id:tipo},
            director:{_id:director}
        }
        console.log(media);
        try {
            Swal.fire({
                allowOutsideClick:false,
                text:'cargando...'
            });
            Swal.showLoading();
            const {data} = await crearMedias(media);
            handleOpenModal();
            listarMedias();
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };
    

  return (
    <div className='sidebar'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>NUEVA MEDIA</h3>
                        <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr/>
                    </div>
                </div>

                <form onSubmit={(e)=> handleOnSumit(e)}>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Serial</label>
                                <input type="text" name='serial'
                                value={serial}
                                onChange={e => handleOnChange(e)}
                                required
                                className='form-control'/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Titulo</label>
                                <input type="text" name='titulo'
                                value={titulo}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control'/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Sinopsis</label>
                                <input type="text" name='sinopsis'
                                value={sinopsis}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control'/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Año Estreno</label>
                                <input type="text" name='anoEstreno'
                                value={anoEstreno}
                                onChange={e => handleOnChange(e)}
                                required
                                className='form-control'/>    
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Imagen Portada</label>
                                <input type="text" name='imagenPortada'
                                value={imagenPortada}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control'/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Url Pelicula</label>
                                <input type="text" name='urlPelicula'
                                value={urlPelicula}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control'/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Director</label>
                                <select className="form-select"
                                 required
                                 name='director'
                                 value={director}
                                 onChange={e => handleOnChange(e)}>  
                                
                                <option value="">--SELECCIONE--</option>
                                    {
                                        directores.map(({_id,nombre})=>{
                                            return <option key={_id} value={_id}>{nombre}</option>
                                    })
                                }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Genero</label>
                                <select className="form-select"
                                required
                                name='genero'
                                value={genero}
                                onChange={e => handleOnChange(e)}> 
                                <option value="">--SELECCIONE--</option>
                                    {
                                        generos.map(({_id,nombre})=>{
                                            return <option key={_id} value={_id}>{nombre}</option>
                                    })
                                }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Productora</label>
                                <select className="form-select"
                                 required
                                 name='productora'
                                 value={productora}
                                 onChange={e => handleOnChange(e)}>  
                                
                                <option value="">--SELECCIONE--</option>
                                    {
                                        productoras.map(({_id,nombreProductora})=>{
                                            return <option key={_id} value={_id}>{nombreProductora}</option>
                                    })
                                }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Tipo</label>
                                <select className="form-select"
                                 required
                                 name='tipo'
                                 value={tipo}
                                 onChange={e => handleOnChange(e)}> 
                                <option value="">--SELECCIONE--</option>
                                    {
                                        tipos.map(({_id,nombre})=>{
                                            return <option key={_id} value={_id}>{nombre}</option>
                                    })
                                }
                                </select>
                            </div>
                        </div>
                    </div> 
                        <div className='row'>
                            <div className='col'>
                                <button  className="btn btn-primary">Guardar</button>
                            </div>
                            
                        </div>   
                </form>
            </div>
        </div>
      
    </div>
  )
}


