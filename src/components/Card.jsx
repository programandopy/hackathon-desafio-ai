import { HiLocationMarker } from "react-icons/hi";

const Card = ({ nombre, tipo, direccion, descripcion }) => {
  return (
    <div className="max-w-sm rounded-lg border-2 overflow-hidden shadow-lg m-4 hover:border-2 hover:border-sky-500">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-blue-700">{nombre}</div>
        <div className="font-bold text-slate-500 text-sm mb-2">{tipo}</div>
        <p className="text-gray-700 text-base">{descripcion}</p>
        <div className="flex gap-2 items-center font-bold text-slate-700 text-sm">
          <HiLocationMarker />
          {direccion}
        </div>
      </div>
    </div>
  );
};

export default Card;
