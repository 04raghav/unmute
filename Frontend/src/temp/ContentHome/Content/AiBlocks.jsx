import React from "react";
import FeatureCard from "./FeatureCard";
import { BookOpen,HandHeart} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
 
  return (
    <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 p-8 lg:p-10 place-items-center">
      
      <FeatureCard
        className="w-80 h-80"
        title="Advice"
        description="When the silence feels heavy, let AI offer gentle words of guidance and clarity."
        icon={BookOpen}
        color="advice"
        variant="large"
        onClick={() => navigate("/vent")}
      />


      <FeatureCard
        className="w-80 h-80"
        title="Hug reaction"
        description="Because sometimes, words aren't enough — all you need is the warmth of a hug."
        icon={HandHeart}
        color="hug"
        variant="large"
        onClick={() => navigate("/vent")}
      />



    </div>
  );
}
