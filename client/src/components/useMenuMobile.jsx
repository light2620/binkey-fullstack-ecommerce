import React from 'react'

import { IoClose } from "react-icons/io5";
import DropDownMenu from './dropdown';

const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full'>
        <button onClick={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
          <IoClose size={25}/>
        </button>
        <div>
           <DropDownMenu/>
        </div>
    </section>
  )
}

export default UserMenuMobile