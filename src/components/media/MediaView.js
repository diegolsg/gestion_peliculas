import React, {useEffect,useState} from 'react';
import { getMedias } from '../../services/MediaService';
import { MediaNew } from './mediaNew';
import { MediaCard } from './mediaCards';



const MediaView = (props) => {

  const[medias, setMedias] = useState([]);
  const [openModal, setOpenModal] = useState(false); 
  const listarMedias = async()=> {
    try {
      const{data} = await getMedias();
      console.log(data);
      setMedias(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    listarMedias();
  },[]);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className = "container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          medias.map((media)=>{
           return <MediaCard key ={media._id} media = {media}/>
  
        })
      }
      
      </div>
      {
        openModal ? <MediaNew
        handleOpenModal ={handleOpenModal}
        listarMedias = {listarMedias}/> :
        <button className="btn btn-primary agr" onClick={handleOpenModal}>
              <i className="fa-solid fa-plus"></i>
        </button>
      }
      
    </div>
  )
}

export{
     MediaView
}
