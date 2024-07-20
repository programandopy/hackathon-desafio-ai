import { useEffect, useState } from "react";
import MapComponent from "./components/Map.jsx";
import openaiService from "./services/openai.js";
const App = () => {
  let [places, setPlaces] = useState([]);

  const getPlaces = async (prompt) => {
    places = await openaiService.getPlacesAI(prompt);
    console.log(places);
    setPlaces(places);
  };

  useEffect(() => {
    getPlaces("Muestrame los 10 mejores lugares de tecnología en Encarnación");
  }, []);
  return (
    <>
      <div className="w-screen h-screen m-0 p-3 bg-slate-500">
        <MapComponent locations={places} />
      </div>
    </>
  );
};

export default App;
