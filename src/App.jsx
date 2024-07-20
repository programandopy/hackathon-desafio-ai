import { useState } from 'react'
import MapComponent from './components/Map.jsx'
import InputComponent from './components/Input.jsx';

const App = () => {
  let [places, setPlaces] = useState([]);

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
