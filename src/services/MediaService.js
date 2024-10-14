import { axiosInstance } from "../helper/axios-config";

const getMedias = () => {
  return axiosInstance.get("media", {
    header: {
      "Content-Type": "aplication/json"
    }
  });
};

const getMediaPorId =(mediaId)=>{
  return axiosInstance.get(`media/${mediaId}`,{
    header: {
      "Content-Type": "aplication/json",
    },
  });
}

const crearMedias = (data) => {
  return axiosInstance.post("media",data, {
    header: {
      "Content-Type": "aplication/json",
    },
  });
};

const actualizarMedias = (mediaId,data) => {
    return axiosInstance.put(`media/${mediaId}`,data, {
      header: {
        "Content-Type": "aplication/json",
      },
    });
  };
  export{
    getMedias,
    crearMedias,
    actualizarMedias,
    getMediaPorId
  }