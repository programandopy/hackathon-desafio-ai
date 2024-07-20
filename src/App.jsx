import { useEffect, useState } from 'react'
import MapComponent from './components/Map.jsx'

import InputComponent from './components/Input.jsx';

import OpenAI from 'openai';


const App = () => {
  let [places, setPlaces] = useState([]);
  //   key: "Hotel Savoy",
  //   description: "Hotel ubicado en la Avda Costanera / Padre Bolik, con una excelente vista al río y cómodas instalaciones. Teléfono: 0982 3600751.",
  //   location: { "lat": -27.3216808, "lng": -55.8700276 },
  //   type: "Alojamiento",
  //   address: "Avda Costanera / Padre Bolik"
  // },
 
  // {
  //   key: "De la Costa Hotel",
  //   description: "Hotel situado en la Avda Francia, en el Paseo Gastronómico, ideal para disfrutar de la gastronomía local. Teléfono: 0985 142363.",
  //   location: { "lat": -27.334355600000002, "lng": -55.87199081254272 },
  //   type: "Alojamiento",
  //   address: "Avda Francia – Paseo Gastronómico"
  // },]); 

  console.log(import.meta.env.VITE_OPENAI_API_KEY)
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true},
  );
  
  let context = `Eres un asistente de turismo que se encarga de encontrar lugares turísticos
  o de interés unicamente de la ciudad de Encarnación, Paraguay.
  Cada lugar debe ser devuelto en una lista de objetos JSON con las siguientes propiedades: [
    {
        "key: "Nombre del lugar",
        "type": "Comida",
        "description": "Una breve descripción del lugar y por qué fue incluido en la lista.",
        "address": "Dirección del lugar",
        "location": { "lat": valor_numérico, "lng": valor_numérico }
    }
], necesito que la respuesta sea unicamente el JSON sin texto incial ni al final`

  async function callOpenAI() {
    console.log("llamando")
    const response = await openai.chat.completions.create({
      model:"gpt-4o-mini",
      messages:[{role: "user", content: context}],
    }
  );
    console.log(`Respuesta desde GPT: ${response.choices[0]}`);
    console.log(response.choices[0].message.content);
    console.log(JSON.parse(response.choices[0].message.content));

    setPlaces(JSON.parse(response.choices[0].message.content));

  }

  useEffect(() => {
    callOpenAI();
  }, []);

  return (
    <>
      <div className="w-screen relative h-screen m-0 p-3 bg-slate-500">
        <InputComponent />
        <MapComponent locations={places} />
      </div>
    </>
  );
};

export default App;
