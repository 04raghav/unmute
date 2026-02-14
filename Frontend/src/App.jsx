import { useState,useEffect } from 'react'
import './App.css'
import Home from './Pages/Home'
import AuthPage from './Pages/AuthPage'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { useAppStore } from './Storage/store'
import axios from 'axios'
import { VERIFY_API } from "@/API/apicalls";
import FlippingBook from "./components/FlippingBook"
import Public from './Pages/Public'
import Preference from "./Pages/Preference"
import MyProfile from './Pages/MyProfile'
import AboutUs from './Pages/AboutUs'
import Private from './Pages/Private'
import VentAI from './Pages/VentAI'

import UserProfile from './Pages/UserProfile'

import Journal from './Pages/Journal'
import MoodAnalytics from './Pages/MoodAnalytics'





function App() {
  const logged = useAppStore(state => state.logged);
  const setLogged = useAppStore(state => state.checkLoggedIn);
  const setUserData=useAppStore(state=>state.setUserData);


  const checkToken = async () => {
    try {
      const res = await axios.get(VERIFY_API, {
        withCredentials: true, // important: sends cookie
      });
      if (res.data.valid) {
        setLogged(true); // update Zustand store
        setUserData({ ventId: res.data.ventId, connections:res.data.connections });
        // console.log(res.data)
      } else {
        setLogged(false);
        clearUserData();
        
      }
    } catch (err) {
      setLogged(false);
      console.log("Token check failed", err.response?.data);
    }
  };

  useEffect(() => {
    checkToken(); // call on app load
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/auth'} element={<AuthPage />} />
          <Route path={"/journal"} element={<ProtectedRoute component={Journal} />} />
          <Route path={"/mood-analytics"} element={<ProtectedRoute component={MoodAnalytics} />} />
          <Route path={'/public'} element={<ProtectedRoute component={Public} />} />
          <Route path={"/preferences"} element={<Preference />} />
          <Route path={"/profile"} element={<MyProfile />} />
          <Route path={'/private'} element={<Private/>} />
          <Route path={"/about"} element={<AboutUs/>} />
          <Route path={"/vent"} element={<ProtectedRoute component={VentAI} />} />
          <Route path={`/user/profile/:id`} element={ <ProtectedRoute component={UserProfile}  /> }  />
          <Route path={'*'} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
{/* <Route path="/" element={<ProtectedRoute component={Home} />} /> */}

export default App;

function ProtectedRoute({ component: Component }) {
  const logged = useAppStore(state => state.logged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate("/auth");
    }
  }, [logged, navigate]);

  // Only render the component if logged in
  return logged ? <Component /> : null;
}


