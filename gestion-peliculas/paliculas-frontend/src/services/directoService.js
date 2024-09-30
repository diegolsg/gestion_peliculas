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

const actualizarDirector = (data,directorId) => {
    return axiosInstance.put(`director/${directorId}`,data, {
      header: {
        "Content-Type": "aplication/json",
      },
    });
  };
  export{
    getDirector,
    crearDirector,
    actualizarDirector
  }