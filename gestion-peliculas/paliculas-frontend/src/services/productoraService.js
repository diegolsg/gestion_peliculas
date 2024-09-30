import { axiosInstance } from "../helper/axios-config";

const getProductora = () => {
  return axiosInstance.get("productora", {
    header: {
      "Content-Type": "aplication/json"
    }
  });
};

const crearProductora = (data) => {
  return axiosInstance.post("productora",data, {
    header: {
      "Content-Type": "aplication/json",
    },
  });
};

const actualizarProductora = (data,productoraId) => {
    return axiosInstance.put(`productora/${productoraId}`,data, {
      header: {
        "Content-Type": "aplication/json",
      },
    });
  };

  export{
    getProductora,
    crearProductora,
    actualizarProductora
  }