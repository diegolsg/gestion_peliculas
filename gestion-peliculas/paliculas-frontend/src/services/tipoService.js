import { axiosInstance } from "../helper/axios-config";

const getTipo = () => {
  return axiosInstance.get("tipo", {
    header: {
      "Content-Type": "aplication/json"
    }
  });
};

const crearTipo = (data) => {
  return axiosInstance.post("tipo",data, {
    header: {
      "Content-Type": "aplication/json",
    },
  });
};

const actualizarTipo = (data,tipoId) => {
    return axiosInstance.put(`tipo/${tipoId}`,data, {
      header: {
        "Content-Type": "aplication/json",
      },
    });
  };

  export{
    getTipo,
    crearTipo,
    actualizarTipo
  }