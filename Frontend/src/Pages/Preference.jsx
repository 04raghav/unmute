import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "@/components/ContentHome/Content/FeatureCard";
import {Heart,Moon,Dumbbell,Music,Film,Brush,Mountain,Gamepad2,Utensils,} from "lucide-react";
import axios from "axios";
import { PREFERENCE_API } from "@/API/apicalls"; 
import { useAppStore } from "@/Storage/store"; // for user/session state

export default function Preference() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const logged = useAppStore((state) => state.logged);

  const preferences = [
    {
      id: "mental",
      title: "Mental Wellness",
      description: "Focus on mental clarity and mindfulness.",
      icon: Heart,
      color: "ai",
    },
    {
      id: "sleep",
      title: "Sleep",
      description: "Calm your mind and rest better.",
      icon: Moon,
      color: "journal",
    },
    {
      id: "fitness",
      title: "Exercise",
      description: "Stay active with guided routines.",
      icon: Dumbbell,
      color: "exercise",
    },
    {
      id: "food",
      title: "Food",
      description: "Discover comfort through mindful eating.",
      icon: Utensils,
      color: "personal",
    },
    {
      id: "music",
      title: "Music",
      description: "Discover calm through music therapy.",
      icon: Music,
      color: "advice",
    },
    {
      id: "movies",
      title: "Movies",
      description: "Find comfort in cinema & stories.",
      icon: Film,
      color: "hug",
    },
    {
      id: "art",
      title: "Art",
      description: "Express yourself creatively.",
      icon: Brush,
      color: "silent",
    },
    {
      id: "nature",
      title: "Nature",
      description: "Reconnect with the outdoors.",
      icon: Mountain,
      color: "exercise",
    },
    {
      id: "gaming",
      title: "Gaming",
      description: "Escape and engage with fun.",
      icon: Gamepad2,
      color: "personal",
    },
  ];

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

    const handleContinue = async () => {
        try {
        // map selected IDs to preference titles
        const selectedTitles = preferences
            .filter((pref) => selected.includes(pref.id))
            .map((pref) => pref.title);

        // send preferences to backend
        const res = await axios.post(
            PREFERENCE_API,
            { likes: selectedTitles }, 
            { withCredentials: true }    // send cookies/session
        );

        if (res.status === 200) {
            console.log("Preferences saved:", res.data);
            navigate("/"); // redirect to home
        }
        } catch (err) {
        console.error("Error saving preferences", err);
        alert("Could not save preferences. Try again.");
        }
    };


  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-purple-900/30 text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">
        Choose Your Preferences
      </h1>
      <p className="text-lg text-gray-300 mb-10 max-w-xl text-center">
        Select up to <span className="text-purple-300 font-bold">three</span>{" "}
        interests to personalize your UNMUTE experience.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
        {preferences.map((pref) => (
          <div
            key={pref.id}
            onClick={() => toggleSelect(pref.id)}
            className={`transition-transform duration-300 cursor-pointer ${
              selected.includes(pref.id)
                ? "scale-105 ring-4 ring-purple-400 rounded-2xl"
                : ""
            }`}
          >
            <FeatureCard
              title={pref.title}
              description={pref.description}
              icon={pref.icon}
              color={pref.color}
            />
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <button
        disabled={selected.length === 0}
        className={`mt-10 px-6 py-3 rounded-xl font-semibold text-lg transition-colors ${
          selected.length > 0
            ? "bg-purple-700 hover:bg-purple-600 text-white"
            : "bg-gray-600 text-gray-400 cursor-not-allowed"
        }`}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}
