import { useState, useEffect } from "react";
import MapComponent from "./components/Map.jsx";
import { Loading } from "./components/Loading.jsx";
import Chatbot from "./components/Chatbot.jsx";
import openaiService from "./services/openai.js";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPlaces([{ key: "1", location: { lat: -27.33056, lng: -55.86667 } }]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getPlaces = async (prompt) => {
    const parsedPlaces = await openaiService.getPlacesAI(prompt);
    console.log(parsedPlaces);
    setPlaces(parsedPlaces);
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
