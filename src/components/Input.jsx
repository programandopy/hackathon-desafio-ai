import { useState } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import clsx from 'clsx';

const InputComponent = ({ onSearch }) => {
  const [promp, setPromp] = useState({
    full_name: '',
  });

  const handleChange = ({ target }) => {
    setPromp({
      ...promp,
      [target.name]: target.value
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();  // Prevent the form from submitting normally
    onSearch(promp.full_name);  // Call the onSearch function passed as prop
  };

  return (
    <div className="absolute top-4 left-4 w-full max-w-md px-4 z-20">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            name="full_name"
            value={promp.full_name}
            onChange={handleChange}
            placeholder='¿Qué estás buscando?'
            className={clsx(
              'block w-full z-10 rounded-lg border-none bg-white p-3 pr-10 text-sm text-black',
              'focus:outline-none focus:ring-2 focus:ring-blue-500'
            )}
          />
          <button 
            type='submit'
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <HiOutlineSearch className="text-gray-500 hover:text-gray-700" size={24} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputComponent;
