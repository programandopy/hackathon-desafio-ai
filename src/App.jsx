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
      <div className="App h-screen flex flex-col bg-gradient-to-r from-blue-400 to-green-600">
        <header className="bg-gradient-to-r from-darkblue-500 to-green-700 text-white p-4">
          <h1 className="text-center text-2xl">
            Bienvenidos a la Guía Turística
          </h1>
        </header>
        <div className="flex flex-1">
          <div className="w-2/3 p-4">
            <MapComponent />
          </div>
          <div className="w-1/3 p-4">
            <Chatbot />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
