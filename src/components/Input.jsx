import { useState } from 'react'
import { Input, Description, Label, Field } from '@headlessui/react'
import { HiOutlineSearch } from "react-icons/hi";
import clsx from 'clsx'

const InputComponent = () => {

  const [promp, setPromp] = useState({
    full_name: '',
  })

  const handleChange = ({ target }) => {
    setPromp({
      ...promp,
      [target.name]: target.value
    })
  }

  const handleSearch = () => {
    console.log(promp.full_name)
  }

  return (
    <div className="w-full max-w-md px-4">
      <form onSubmit={handleSearch}>
        <Field>
          <Input
            name="full_name"
            value={promp.full_name}
            onChange={handleChange}
            placeholder='Que estas buscando?'
            className={clsx(
              'mt-3 block w-full z-100 rounded-lg border-none bg-white p-3 text-sm/6 text-black',
              'focus:outline-none data-[focus]:outline-2 datqa-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
        </Field>
        <button type='submit'><HiOutlineSearch /></button>
      </form>
    </div>
  )
}

export default InputComponent
