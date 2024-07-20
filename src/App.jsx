import { useEffect, useState } from "react";
import MapComponent from "./components/Map.jsx";
import InputComponent from "./components/Input.jsx";
import OpenAI from "openai";
import Sidebar from "./components/Sidebar.jsx";
import ToggleButton from "./components/ToggleButton.jsx"; // Importa el nuevo componente

const App = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [arrowClic, setArrowClic] = useState(false);

  console.log(import.meta.env.VITE_OPENAI_API_KEY);
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const context = `
  Eres un asistente de turismo que se encarga de encontrar lugares turísticos o de interés únicamente de la ciudad de Encarnación, Paraguay. 
  Cada lugar debe ser devuelto en una lista de objetos JSON con las siguientes propiedades:
  [
    {
      "key": "Nombre del lugar",
      "type": "Comida",
      "description": "Una breve descripción del lugar y por qué fue incluido en la lista.",
      "address": "Dirección del lugar",
      "location": { "lat": valor_numérico, "lng": valor_numérico }
    }
  ];
  Necesito que la respuesta sea únicamente el JSON sin texto inicial ni final.
  `;

  async function callOpenAI(query) {
    try {
      console.log("Llamando a OpenAI con la consulta:", query);
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: context },
          { role: "user", content: query },
        ],
      });

      if (!response.choices || response.choices.length === 0) {
        throw new Error("No se recibieron respuestas válidas de OpenAI.");
      }
      const placesJSON = response.choices[0].message.content;
      console.log("Respuesta desde GPT:", placesJSON);

      try {
        const places = JSON.parse(placesJSON);
        setPlaces(places);
        setError(null);
      } catch (parseError) {
        console.error("Error al parsear el JSON:", parseError);
        throw new Error(
          "Error al procesar la respuesta. Por favor, inténtelo de nuevo."
        );
      }
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error) {
    if (error.response) {
      console.error("Error en la respuesta de OpenAI:", error.response.data);
      setError({
        message:
          "Error en la respuesta del servicio de OpenAI. Por favor, inténtelo de nuevo.",
        details: error.response.data,
      });
    } else if (error.request) {
      console.error("Error en la solicitud a OpenAI:", error.request);
      setError({
        message:
          "No se pudo conectar con el servicio de OpenAI. Por favor, verifique su conexión a internet y vuelva a intentarlo.",
        details: error.request,
      });
    } else {
      console.error("Error inesperado:", error.message);
      setError({
        message: "Ocurrió un error inesperado. Por favor, inténtelo de nuevo.",
        details: error.message,
      });
    }
  }

  useEffect(() => {
    if (searchQuery) {
      callOpenAI(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setPlaces([]);
    setSearchQuery(query);
    setTriggerSearch(true);
  };

  const handleToggleSidebar = () => {
    setArrowClic(!arrowClic);
  };

  return (
    <div className="w-screen h-screen relative m-0 p-0 bg-slate-500">
      <InputComponent
        onSearch={handleSearch}
        handleToggleSidebar={handleToggleSidebar}
      />
      <Sidebar
        places={places}
        triggerSearch={triggerSearch}
        error={error}
        arrowClic={arrowClic}
      />
      <ToggleButton
        handleToggleSidebar={handleToggleSidebar}
        arrowClic={arrowClic}
      />{" "}
      {/* Agrega el botón aquí */}
      <MapComponent locations={places} />
    </div>
  );
};

export default App;
