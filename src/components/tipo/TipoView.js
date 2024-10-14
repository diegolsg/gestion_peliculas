import React, { useState, useEffect } from 'react';
import { getTipo, crearTipo, actualizarTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

const TipoView = () => {
  const [valoresForm, setValoresForm] = useState({ nombre: '', descripcion: '' });
  const [tipos, setTipos] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState(null); // descripcion para el Tipo seleccionado
  const { nombre, descripcion } = valoresForm;

  const listarTipo = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      const resp = await getTipo();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listarTipo();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: selectedTipo ? 'Actualizando...' : 'Creando...',
      });
      Swal.showLoading();

      if (selectedTipo) {
        // Actualización
        const resp = await actualizarTipo(selectedTipo._id, valoresForm);
        const updatedTipos = tipos.map((tipo) =>
          tipo._id === selectedTipo._id ? resp.data : tipo
        );
        setTipos(updatedTipos);
        Swal.fire('Actualizado', 'Tipo actualizado correctamente', 'success');
      } else {
        // Creación
        const resp = await crearTipo(valoresForm);
        setTipos([...tipos, resp.data]);
        Swal.fire('Creado', 'Tipo creado correctamente', 'success');
      }

      // Reiniciar el formulario
      setValoresForm({ nombre: '', descripcion: '' });
      setSelectedTipo(null);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleSelectTipo = (tipo) => {
    setSelectedTipo(tipo);
    setValoresForm({
      nombre: tipo.nombre,
      descripcion: tipo.descripcion,
    });
  };

  return (
    <div className='container-fluid'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input
                required
                name='nombre'
                value={nombre}
                type='text'
                className='form-control'
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className='col-lg-4'>
          
            <div className='mb-3'>
              <label className='form-label'>Descripcion</label>
              <input
                required
                name='descripcion'
                value={descripcion}
                type='text'
                className='form-control'
                onChange={handleOnChange}
              />
              </div>
            
          </div>
        </div>
        <button className='btn btn-primary'>
          {selectedTipo ? 'Actualizar' : 'Guardar'}
        </button>
      </form>
      <table className='table'>
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>descripcion</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.length > 0 &&
            tipos.map((tipo, index) => (
              <tr key={tipo._id}>
                <th scope='row'>{index + 1}</th>
                <td>{tipo.nombre}</td>
                <td>{tipo.descripcion}</td>
                <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(tipo.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={() => handleSelectTipo(tipo)}
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export { TipoView };
