import React from 'react'
import { useAppStore } from '@/Storage/store'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { LOGOUT_API } from '@/API/apicalls'

const ClickBar = () => {
  const Navigate = useNavigate()
  const user=useAppStore(state=>state.user)
  const logged = useAppStore(state => state.logged)
  const checkLoggedIn = useAppStore(state => state.checkLoggedIn)
  const clearUserData=useAppStore(state=>state.clearUserData)
  function doLogin() {
    Navigate('/auth')
  }
  async function doLogout() {
    try {
      const res = await axios.post(LOGOUT_API,{} ,{ withCredentials: true })
      if (res.status === 200) {
        clearUserData()
        checkLoggedIn(false);
        Navigate('/auth')
      }
    } catch (error) {
      if (res.status === 400) {
        alert("Can't Logout")
      } else if (res.status === 500) {
        alert("internal server error")
      }
      console.log("Logout: ", error)
    }
  }

  async function myProfileSetup(){
    Navigate('/profile')
  }

  return (
    <div className='flex flex-col justify-center items-start gap-2 py-4 px-6 
                    bg-purple-900/90 text-white rounded-lg shadow-lg 
                    w-48 animate-fade-in'>
      <button className="w-full text-left px-2 py-2 hover:bg-purple-700 rounded-md transition-all duration-200 cursor-pointer hover:scale-105"
      onClick={() => Navigate('/profile')}>
        My Profile
      </button>


      {
        logged ?
          <button className="w-full text-left px-2 py-2 hover:bg-purple-700 rounded-md transition-all duration-200 cursor-pointer hover:scale-105"
            onClick={e => doLogout()}
          >
            Logout
          </button>
          :
          <button className="w-full text-left px-2 py-2 hover:bg-purple-700 rounded-md transition-all duration-200 cursor-pointer hover:scale-105"
            onClick={e => doLogin()}
          >
            Login
          </button>

      }
    </div>
  )
}

export default ClickBar
