import React, { useState,useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";
import { LogOut, Home } from "lucide-react";
import { useAppStore } from "@/Storage/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ACCEPT_CONNECTION_REQUEST } from "@/API/apicalls";

const MyProfile = () => {
  const user = useAppStore((state) => state.user);
  const [showPending, setShowPending] = useState(false);
  const [changeState, setchangeState] = useState(false)
  const [loadingId, setLoadingId] = useState(null);

  const navigate = useNavigate();

  const sendAcceptRequest = async (acceptedId) => {
    try {
      const response = await axios.post(
        ACCEPT_CONNECTION_REQUEST,
        { userVentId: user.ventId, acceptedVentId: acceptedId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedConnections = user.connections.map((conn) =>
          conn.ventId === acceptedId ? { ...conn, status: "accepted" } : conn
        );

        useAppStore.setState((state) => ({
          user: {
            ...state.user,
            connections: [...updatedConnections],
          },
        }));
      } else {
        console.log("There is some issue in response");
      }
    } catch (err) {
      console.error("Accept error:", err);
    }finally{
      setLoadingId(false)
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0f2e] to-black text-white">
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-50 p-2 rounded-full 
                 hover:text-purple-200 bg-zinc-800 border border-purple-500 
                 text-white shadow-lg transition cursor-pointer"
      >
        <Home size={22} />
      </button>

      {/* Profile Header */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-6">
          <Avatar className="w-28 h-28">
            <AvatarImage src="/panda.png" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">{user.ventId}</h2>
              <Button size="sm" variant="outline" className="bg-purple-700 text-white">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>

            <div className="flex gap-6 mt-3 text-gray-300">
              <span>
                <b>{user.connections?.length || "0"}</b> Connections
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-400">
              🌙 Healing in silence | Anonymous soul | Mental wellness seeker
            </p>
          </div>
        </div>
      </div>

      {/* Accepted Requests */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <h3 className="text-lg font-semibold mb-2">Accepted Requests</h3>
        {user.connections?.filter((f) => f.status === "connected").length > 0 ? (
          <div className="space-y-2">
            {user.connections
              .filter((f) => f.status === "connected")
              .map((friend) => (
                <Card
                  key={friend.id}
                  className="bg-zinc-900 border border-zinc-700 text-white"
                >
                  <CardContent className="p-3 flex justify-between items-center">
                    <span
                      onClick={() => navigate(`/user/profile/${friend.ventId}`)}
                      className="hover:underline cursor-pointer font-medium"
                    >
                      {friend.ventId}
                    </span>
                    <Button
                      size="sm"
                      className="bg-purple-700 text-white"
                      onClick={() => alert(`Make private room with ${friend.ventId}`)}
                    >
                      Make Private Room
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <p className="text-gray-400">No accepted requests</p>
        )}
      </div>

      {/* Pending Requests */}
      <div className="max-w-4xl mx-auto px-4 mt-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Pending Requests</h3>
          <Button
            size="sm"
            className="bg-purple-700 text-white"
            onClick={() => setShowPending((prev) => !prev)}
          >
            {showPending ? "Hide" : "Show"}
          </Button>
        </div>

        {showPending && (
          <div className="space-y-2">
            {user.connections
              .filter((f) => f.status === "requested")
              .map((friend) => (
                <Card
                  key={friend.id}
                  className="bg-zinc-900 border border-zinc-700 text-white"
                >
                  <CardContent className="p-3 flex justify-between items-center">
                    <span
                      onClick={() => navigate(`/user/profile/${friend.ventId}`)}
                      className="hover:underline cursor-pointer font-medium"
                    >
                      {friend.ventId}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-700 hover:text-fuchsia-950 transition-all duration-200 ease-in-out cursor-pointer"
                      onClick={() => {
                        if(loadingId===null){
                          setLoadingId(friend.ventId)
                          sendAcceptRequest(friend.ventId)
                        }
                      }}
                      disabled={loadingId === friend.ventId}
                    >
                      {loadingId!==null? "Wait...":"Accept"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
