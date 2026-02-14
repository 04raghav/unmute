import React from 'react'
import Nav from '@/Components/Nav'
import { useAppStore } from '@/Storage/store'
import { v4 as uuidv4 } from 'uuid';


const Private = () => {
    const user=useAppStore(state=>state.user)
    const id = uuidv4();
    console.log(id);

  return (
    
        <div className='h-[100vh] w-full bg-indigo-950 flex flex-col gap-12 justify-center items-center'>
           <div>
                 <Nav />
           </div>
            <div className='bg-zinc-950 mt-5 text-white w-5/6 h-4/5'>
              {user.ventId} Private Room     id: {id}
            </div>
        </div>
    
  )
}

export default Private