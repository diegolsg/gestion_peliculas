import { axiosInstance } from "../helper/axios-config";

const getGenero = () => {
  return axiosInstance.get("genero", {
    header: {
      "Content-Type": "aplication/json"
    }
  });
};

const crearGenero = (data) => {
  return axiosInstance.post("genero",data, {
    header: {
      "Content-Type": "aplication/json",
    },
  });
};

const actualizarGenero = (generoId,data) => {
    return axiosInstance.put(`genero/${generoId}`,data, {
      header: {
        "Content-Type": "aplication/json",
      },
    });
  };

  export{
    getGenero,
    crearGenero,
    actualizarGenero
  }