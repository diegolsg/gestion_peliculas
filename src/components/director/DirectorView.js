import React, { useState, useEffect } from 'react';
import { getDirector, crearDirector, actualizarDirector, eliminarDirector } from '../../services/directoService';
import Swal from 'sweetalert2';
const moment = require('moment');

const DirectorView = () => {
  const [valoresForm, setValoresForm] = useState({ nombre: '', estado: '' });
  const [directores, setDirectores] = useState([]);
  const [editingId, setEditingId] = useState(null); // Para saber si estamos editando

  const { nombre, estado } = valoresForm;

  // Listar directores
  const listarDirector = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getDirector();
      setDirectores(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listarDirector();
  }, []);

  // Manejar cambios en el formulario
  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  // Crear o actualizar director
  const handleSaveDirector = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();

      if (editingId) {
        // Si hay un ID de edición, actualizamos
        const resp = await actualizarDirector(editingId, valoresForm);
        const updatedDirectores = directores.map((director) =>
          director._id === editingId ? resp.data : director
        );
        setDirectores(updatedDirectores);
        setEditingId(null); // Reseteamos la edición
      } else {
        // Si no hay edición, creamos un nuevo director
        const resp = await crearDirector(valoresForm);
        setDirectores([...directores, resp.data]);
      }

      setValoresForm({ nombre: '', estado: '' }); // Reseteamos el formulario
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  // Cargar datos del director para editar
  const handleEditDirector = (director) => {
    setValoresForm({ nombre: director.nombre, estado: director.estado });
    setEditingId(director._id);
  };

  // Eliminar director
  const handleEliminarDirector = async (id) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Eliminando...',
      });
      Swal.showLoading();
      await eliminarDirector(id);
      setDirectores(directores.filter(director => director._id !== id));
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  return (
    <div className='container-fluid'>
      <form onSubmit={handleSaveDirector}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input required name='nombre' value={nombre} type='text' className='form-control' onChange={handleOnChange} />
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='mb-3'>
              <label className='form-label'>Estado</label>
              <select required name='estado' value={estado} className='form-select' onChange={handleOnChange}>
                <option value=''>--SELECCIONE--</option>
                <option value='Activo'>Activo</option>
                <option value='Inactivo'>Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <button className='btn btn-primary'>{editingId ? 'Actualizar' : 'Guardar'}</button>
      </form>

      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.length > 0 && directores.map((director, index) => (
            <tr key={director._id}>
              <th scope='row'>{index + 1}</th>
              <td>{director.nombre}</td>
              <td>{director.estado}</td>
              <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(director.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <button 
                  type='button' 
                  className='btn btn-secondary' 
                  onClick={() => handleEditDirector(director)}
                >
                  Actualizar
                </button>
                <button 
                  type='button' 
                  className='btn btn-danger' 
                  onClick={() => handleEliminarDirector(director._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { DirectorView };
