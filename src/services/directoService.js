import { axiosInstance } from "../helper/axios-config";

const getDirector = () => {
  return axiosInstance.get("director", {
    header: {
      "Content-Type": "aplication/json"
    }
  });
};

const crearDirector = (data) => {
  return axiosInstance.post("director",data, {
    header: {
      "Content-Type": "aplication/json",
    },
  });
};

const actualizarDirector = (directorId,data) => {
    return axiosInstance.put(`director/${directorId}`,data, {
      header: {
        "Content-Type": "aplication/json",
      },
    });
  };

  const eliminarDirector = (data,directorId) => {
    return axiosInstance.delete(`director/${directorId}`,data, {
      header: {
        "Content-Type": "aplication/json",
      },
    });
  };
  export{
    getDirector,
    crearDirector,
    actualizarDirector,
    eliminarDirector
  }