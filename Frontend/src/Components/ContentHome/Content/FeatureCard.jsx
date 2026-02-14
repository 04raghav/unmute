import React from "react";
import { Card } from "@/Components/ui/Card"; // adjust path if needed

export default function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  className = "", 
  onClick, 
  variant = "default"
}) {
  const colorVariants = {
    ai: "from-green-600 via-green-900 to-green-900 hover:border-green-400",
    journal: "from-purple-600 via-purple-900 to-purple-900 hover:border-purple-400",
    exercise: "from-blue-600 via-blue-900 to-blue-900 hover:border-blue-400",
    personal: "from-indigo-950 via-purple-900 to-black hover:border-purple-900/90",
    silent: "from-fuchsia-800 via-purple-900 to-black hover:border-fuchsia-400",
    advice: "from-lime-700 via-lime-900 to-black hover:border-lime-400",
    hug: "from-indigo-800 via-indigo-900 to-black hover:border-indigo-400",
  };

  const iconColors = {
    ai: "text-feature-ai",
    journal: "text-feature-journal", 
    exercise: "text-feature-exercise",
    personal: "text-feature-personal"
  };

  const sizeVariants = {
    default: {
      icon: "h-12 w-12",
      title: "text-lg",
      description: "text-sm max-w-xs",
      spacing: "space-y-4"
    },
    large: {
      icon: "h-20 w-20",  
      title: "text-2xl",  
      description: "text-base max-w-sm",
      spacing: "space-y-6"
    }
  };

  const sizes = sizeVariants[variant];

  return (
    <Card
      onClick={onClick}  
      className={`
        group relative overflow-hidden cursor-pointer
        bg-gradient-to-br ${colorVariants[color]}
        border rounded-2xl p-6
        backdrop-blur-md bg-white/5
        hover:scale-[1.03] hover:-rotate-1 hover:translate-y-[-2px]
        hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]
        transition-all duration-500 ease-out
        ${className}
      `}
    >
      <div className={`h-full flex flex-col items-center justify-center text-center ${sizes.spacing}`}>
        
        {/* Icon with animated glow */}
        <div className="relative flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${iconColors[color]} bg-current animate-glow`} />
          <Icon className={`relative ${sizes.icon} ${iconColors[color]} group-hover:scale-110 transition-transform duration-300`} />
        </div>
        
        {/* Title with gradient hover effect */}
        <h3 className={`${sizes.title} font-semibold text-white 
                        group-hover:bg-gradient-to-r 
                        group-hover:from-purple-200 group-hover:to-pink-400 
                        group-hover:bg-clip-text group-hover:text-transparent 
                        transition-colors duration-500`}>
          {title}
        </h3>
        
        {/* Description */}
        <p className={`${sizes.description} text-gray-300 leading-relaxed`}>
          {description}
        </p>
      </div>
      
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
}
