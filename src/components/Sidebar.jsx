import { useEffect, useState } from 'react'
import Skeleton from './Skeleton'
import Card from './Card';
import { HiMenu } from "react-icons/hi";
import './sidebar.css'
import { HiOutlineXCircle } from "react-icons/hi";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Sidebar = ({ places, triggerSearch, error, handleToggleSidebar, arrowClic }) => {
  const [filteredPlaces, setFilteredPlaces] = useState([]);
 
  const [localTriggerSearch, setLocalTriggerSearch] = useState(triggerSearch)
  
  useEffect(() => {
    setFilteredPlaces(places);
    setLocalTriggerSearch(triggerSearch)

  }, [places, triggerSearch])
  console.log(error)
  return (
    <>
      <div className={triggerSearch
        ? "sidebar absolute w-full max-w-lg h-screen bg-white z-10 pt-32 pl-4 pr-4"
        : "sidebar absolute w-full max-w-lg h-screen bg-white z-10 pt-32 pl-4 pr-4"}>
        {error && <HiOutlineXCircle className='text-red-500 w-full text-center text-4xl'/>}
        {error && <span className="text-lg text-red-500">{error?.details}</span>}
        {filteredPlaces.length > 0 && <span className="text-lg ml-4">Resultados de la Busqueda</span>}
        {filteredPlaces.length <= 0 && localTriggerSearch && <Skeleton />}
        {
          filteredPlaces.map((place, index) => (
            <Card
              key={index}
              nombre={place.key}
              tipo={place.type}
              direccion={place.address}
              descripcion={place.description}
            />
          ))
        }
        <button className='toggle_sidebar' onClick={handleToggleSidebar}>
            {
              arrowClic ? <IoIosArrowForward /> :  <IoIosArrowBack />
            }
        </button>
      </div>
    </>
  )
}

export default Sidebar
