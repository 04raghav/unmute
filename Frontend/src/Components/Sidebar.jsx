import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Cpu, BookOpen,Dumbbell,User} from "lucide-react"; // Lucide icons

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    {
      path: "/features",
      label: "AI Features",
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      path: "/journal",
      label: "Journaling",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      path: "/exercise",
      label: "Exercise",
      icon: <Dumbbell className="w-6 h-6" />,
    },
    {
      path: "/public",
      label: "Personal",
      icon: <User className="w-6 h-6" />,
    },
  ];

  return (
    <div className="bg-gradient-to-b bg-zinc-950 text-white h-full w-64 p-6 flex flex-col border-r border-purple-800/40 shadow-lg">
      {/* Features Section */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">
          Features
        </h2>

        {links.map((link) => {
          const active = location.pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-4 py-3 px-4 rounded-lg text-lg font-medium transition-all duration-300
                ${
                  active
                    ? "bg-gradient-to-r from-fuchsia-700/20 to-purple-700/40 text-white shadow-md shadow-purple-900"
                    : "text-gray-300 hover:bg-purple-900/40 hover:text-white"
                }
              `}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
