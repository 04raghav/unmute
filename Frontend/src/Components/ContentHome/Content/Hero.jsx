import React from "react";
import FeatureCard from "./FeatureCard";
import { Brain, Book, Dumbbell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero({ scrollToAI }) {
  const navigate = useNavigate();
 
  return (
    <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-8 lg:p-12 ">
      
      <FeatureCard
        className="w-60 h-60"
        title="AI Features"
        description="Intelligent insights and personalized recommendations to support your mental wellness journey."
        icon={Brain }
        color="ai"
        onClick={scrollToAI}
      />

      <FeatureCard
        className="w-60 h-60"
        title="Journaling"
        description="Private, secure journaling space to express your thoughts and track your emotional progress."
        icon={Book}
        color="journal"
        // onClick={() => navigate("/journal")} 
        onClick={() => {
        navigate("/journal");
        }}

      />

      <FeatureCard
        className="w-60 h-60"
        title="Exercise"
        description="Guided mental exercises, breathing techniques, and mindfulness practices for daily wellness."
        icon={Dumbbell}
        color="exercise"
      />

      <FeatureCard
        className="w-60 h-60"
        title="Personal"
        description="Connect with like-minded individuals in a safe, anonymous environment focused on healing."
        icon={User}
        color="personal"
        onClick={() => {
        navigate("/public");
        }}
      />

    </div>
  );
}
