import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MAKE_CONNECT_REQUEST, CHECK_CONNECTION_REQUEST } from "@/API/apicalls";
import { useAppStore } from "@/Storage/store";

const UserProfile = () => {
  const { id: ventID } = useParams(); // dynamic ID from URL
  const [connections, setconnections] = useState("")
  //   const [connectionId, setconnectionId] = useState()
  //   const fillVentId=()=>{
  //      let allIds=connections.map((conn)=>(conn.id))
  //      console.log(allIds);
  //   }

  const userId = useAppStore((state) => state.user); // keep naming consistent


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    // console.log(userId.connections)
    // setconnections(userId.connections)
    // fillVentId()
    const checkConnection = async () => {
      try {
        console.log(userId, ventID)
        const checkConnection = await axios.post(CHECK_CONNECTION_REQUEST, { ventId: userId.ventId, othId: ventID },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          })
        if (checkConnection.status === 200) {
          console.log(checkConnection.data)
          if (checkConnection.data.status === "No Connection") {
            setconnections("Connect")
          } else {
            setconnections(checkConnection.data.status)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    checkConnection()
  }, [userId, ventID])

  const sendRequest = async (targetVentId) => {
    try {
      setLoading(true);
      console.log(userId)
      const response = await axios.post(
        MAKE_CONNECT_REQUEST,
        { ventId: userId.ventId, othId: targetVentId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage("✅ Request Sent!");
        setconnections("Pending")
      }
    } catch (error) {
      setMessage("❌ Error sending request: " + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
          User Profile
        </h2>
        <p className="mt-4 text-gray-600">
          <span className="font-semibold text-gray-800">User ID:</span> {ventID}
        </p>

        {connections === "Connect" ? (
          <button
            onClick={() => sendRequest(ventID)}
            disabled={loading}
            className="mt-6 w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-xl shadow hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Connect"}
          </button>
        ) : (
          <button
            disabled
            className="mt-6 w-full px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-xl shadow cursor-default"
          >
            {connections}
          </button>
        )}

        {message && (
          <p
            className={`mt-4 text-sm font-medium ${message.startsWith("✅")
                ? "text-green-600"
                : "text-red-600"
              }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );

};

export default UserProfile;
