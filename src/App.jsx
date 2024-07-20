import { useEffect, useState } from 'react';
import MapComponent from './components/Map.jsx';
import InputComponent from './components/Input.jsx';
import OpenAI from 'openai';

const App = () => {
  let [places, setPlaces] = useState([]);
  let [searchQuery, setSearchQuery] = useState('');

  console.log(import.meta.env.VITE_OPENAI_API_KEY);
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const context = `Eres un asistente de turismo que se encarga de encontrar lugares turísticos
  o de interés unicamente de la ciudad de Encarnación, Paraguay.
  Cada lugar debe ser devuelto en una lista de objetos JSON con las siguientes propiedades: [
    {
        "key: "Nombre del lugar",
        "type": "Comida",
        "description": "Una breve descripción del lugar y por qué fue incluido en la lista.",
        "address": "Dirección del lugar",
        "location": { "lat": valor_numérico, "lng": valor_numérico }
    }
], necesito que la respuesta sea unicamente el JSON sin texto inicial ni al final`;

  async function callOpenAI(query) {
    console.log("Llamando a OpenAI con la consulta:", query);
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: context + ` "${query}"` }],
    });

    console.log(`Respuesta desde GPT: ${response.choices[0]}`);
    const placesJSON = response.choices[0].message.content;

    setPlaces(JSON.parse(placesJSON));
  }

  useEffect(() => {
    if (searchQuery) {
      callOpenAI(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-screen h-screen relative m-0 p-0 bg-slate-500">
      <InputComponent onSearch={handleSearch} />
      <MapComponent locations={places} />
    </div>
  );
};

export default App;
