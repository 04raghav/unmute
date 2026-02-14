import React, { useState, useEffect } from "react";
import Nav from "../components/Nav"; // adjust the path to where your Nav is
import axios from "axios";
import { SIGNUP_API, LOGIN_API } from "@/API/apicalls";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/Storage/store";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [ventId, setventId] = useState("");
  const [connections, setconnections] = useState([])
  const [pass, setpass] = useState("");
  const [repass, setrepass] = useState("")
  const navigate = useNavigate();
  const logged = useAppStore(state => state.logged);
  const checkLoggedIn = useAppStore(state => state.checkLoggedIn)
  const setUserData=useAppStore(state=>state.setUserData)
  
  const generateVentid = () => {
    const number = Math.floor(Math.random() * 100009);
    const v_id = `VENT_${number}`
    setventId(v_id)
  }
  useEffect(() => {
    if (!isLogin) {
      generateVentid();
    }
  }, [isLogin]);

  const userLogs = async () => {
    if (pass.trim() === "" || ventId.trim() === "") {
      alert("fill the form first");
      return;
    }
    if (!isLogin) {
      if (pass !== repass && !isLogin) {
        alert("Passwords do not match");
        return;
      }
      //api call for signup will be made here
      try {
        const req = await axios.post(SIGNUP_API,
          { ventId, pass },
          { withCredentials: true }
        )
        if (req.status === 201) {
          setUserData({ ventId: ventId, connections:req.data.user.connections});
          
          checkLoggedIn(true);
          alert("Signup Done");
          navigate('/preferences');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
            alert("Server error");
          } else if (error.response.status === 400) {
            alert("User already exists. Change VENT_ID");
          }
        }
        console.log("signup: ", error)
      }
    } else {
      try {
        const req = await axios.post(LOGIN_API,
          { ventId, pass },
          { withCredentials: true }
        )
        if (req.status === 200) {
          checkLoggedIn(true);
         setUserData({ ventId: ventId, connections:req.data.user.connections});
         console.log(req.data.user.connections)
          alert("Login Done");
          navigate('/')
        }

      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
            alert("Server error");
          } else if (error.response.status === 404) {
            alert("NO User  exists. Change VENT_ID");
          } else if (error.response.status === 401) {
            alert("Incorrect VENT_ID or Password");
          }
        }
        console.log("login: ", error)

      }
      //api call for login willbe made here
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-purple-950 to-black text-white">


      {/* Auth Card Section */}
      <div className="flex-grow flex items-center justify-center pt-24">
        <div className="bg-black/70 backdrop-blur-lg border border-purple-600 rounded-xl shadow-lg p-8 w-full max-w-md">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-6 text-purple-350">
            {isLogin ? "Welcome Back!" : "Join UNMUTE"}
          </h2>
          <p className="text-center text-gray-400 mb-8">
            {isLogin
              ? "Login to continue expressing yourself anonymously."
              : "Create an account to start your journey with us."}
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Vent ID"
              className="p-3 rounded-md bg-purple-800/30 border border-purple-500/50 focus:outline-none focus:border-purple-400"
              value={ventId}
              onChange={(e) => setventId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-md bg-purple-800/30 border border-purple-500/50 focus:outline-none focus:border-purple-400"
              value={pass}
              onChange={(e) => setpass(e.target.value)}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="p-3 rounded-md bg-purple-800/30 border border-purple-500/50 focus:outline-none focus:border-purple-400"
                value={repass}
                onChange={(e) => setrepass(e.target.value)}
              />
            )}
            <button className="bg-purple-600 hover:bg-purple-500 transition rounded-md p-3 font-semibold"
              onClick={(e) => {
                e.preventDefault();
                userLogs();
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Switch Auth Mode */}
          <div className="text-center mt-6 text-sm text-gray-400">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-purple-400 hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-purple-400 hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
