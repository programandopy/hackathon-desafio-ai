import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import Card from "./Card";
import { HiOutlineXCircle } from "react-icons/hi";
import "./sidebar.css";
import logo from "../assets/ppylogo.png";

const Sidebar = ({ places, triggerSearch, error, arrowClic }) => {
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [localTriggerSearch, setLocalTriggerSearch] = useState(triggerSearch);

  useEffect(() => {
    setFilteredPlaces(places);
    setLocalTriggerSearch(triggerSearch);
  }, [places, triggerSearch]);

  console.log(error);

  return (
    <div
      className={`sidebar ${
        arrowClic ? "toggle" : ""
      } absolute w-full max-w-lg h-screen bg-white z-10 pt-32 pl-4 pr-4`}
    >
      {error && (
        <HiOutlineXCircle className="text-red-500 w-full text-center text-4xl" />
      )}
      {error && <span className="text-lg text-red-500">{error?.details}</span>}
      {filteredPlaces.length > 0 && (
        <span className="text-lg ml-4">Resultados de la Busqueda</span>
      )}
      {filteredPlaces.length <= 0 && localTriggerSearch && <Skeleton />}
      {filteredPlaces.length <= 0 && !localTriggerSearch && (
        <div className="flex w-full justify-center items-center flex-col ">
          <img src={logo} className="opacity-50 w-1/2" />
          <p className="text-gray-600">
            Por favor escriba una consulta para comenzar la busqueda.
          </p>
        </div>
      )}
      {filteredPlaces.map((place, index) => (
        <Card
          key={index}
          nombre={place.key}
          tipo={place.type}
          direccion={place.address}
          descripcion={place.description}
          location={place.location}
        />
      ))}
    </div>
  );
};

export default Sidebar;
