import React, { useState, useEffect } from 'react';
import { getGenero, crearGenero, actualizarGenero } from '../../services/generoService';
import Swal from 'sweetalert2';
const moment = require('moment');

const GeneroView = () => {
  const [valoresForm, setValoresForm] = useState({ nombre: '', estado: '', descripcion: '' });
  const [generos, setGeneros] = useState([]);
  const [generoId, setGeneroId] = useState(null); // para manejar la actualización

  const { nombre, estado, descripcion } = valoresForm;

  const listarGenero = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      const resp = await getGenero();
      setGeneros(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listarGenero();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleCrearGenero = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...',
      });
      Swal.showLoading();

      if (generoId) {
        // Actualización
        await actualizarGenero(generoId, valoresForm);
        Swal.fire('Actualizado!', 'El género fue actualizado correctamente.', 'success');
      } else {
        // Creación
        const resp = await crearGenero(valoresForm);
        setGeneros([...generos, resp.data]); // añade el nuevo género a la lista
        Swal.fire('Creado!', 'El género fue creado correctamente.', 'success');
      }

      setValoresForm({ nombre: '', estado: '', descripcion: '' });
      setGeneroId(null); // reinicia el id para la próxima operación
      listarGenero();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleEditGenero = (genero) => {
    setValoresForm({ nombre: genero.nombre, estado: genero.estado, descripcion: genero.descripcion });
    setGeneroId(genero._id); // define el id del género a editar
  };

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearGenero(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input required name='nombre' value={nombre} type='text' className='form-control' onChange={handleOnChange} />
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='mb-3'>
              <label className='form-label'>Descripcion</label>
              <input required name='descripcion' value={descripcion} type='text' className='form-control' onChange={handleOnChange} />
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
        <button className='btn btn-primary'>{generoId ? 'Actualizar' : 'Guardar'}</button>
      </form>
      <table className='table'>
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Estado</th>
            <th scope='col'>Descripción</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.length > 0 &&
            generos.map((genero, index) => {
              return (
                <tr key={genero._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{genero.nombre}</td>
                  <td>{genero.estado}</td>
                  <td>{genero.descripcion}</td>
                  <td>{moment(genero.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                  <td>{moment(genero.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                  <td>
                    <button className='btn btn-secondary' onClick={() => handleEditGenero(genero)}>
                      Actualizar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export { GeneroView };
