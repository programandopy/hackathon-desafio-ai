import { useState } from 'react'
import MapComponent from './components/Map.jsx'
import Chatbot from './components/Chatbot.jsx';

const App = () => {
  let [places, setPlaces] = useState([]);

  return (
    <div className="App h-screen flex flex-col">
      <header className="bg-gradient-to-r from-darkblue-500 to-green-700 text-white p-4">
        <h1 className="text-center text-2xl">Bienvenidos a la Perla del Paraguay</h1>
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
  );
};

export default App;