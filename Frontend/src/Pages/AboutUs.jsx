// AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, Brain, MessageCircle, Feather, Star, Laugh, UserX, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  const floatingIcons = [
    { icon: Heart, color: "text-pink-400", size: 50, top: "20%", left: "10%", duration: 8 },
    { icon: MessageCircle, color: "text-blue-400", size: 45, top: "35%", left: "85%", duration: 10 },
    { icon: UserX, color: "text-gray-400", size: 55, top: "60%", left: "15%", duration: 12 },
    { icon: Feather, color: "text-emerald-400", size: 40, top: "75%", left: "80%", duration: 14 },
    { icon: Star, color: "text-yellow-400", size: 35, top: "50%", left: "50%", duration: 18 },
    { icon: Laugh, color: "text-purple-400", size: 42, top: "15%", left: "70%", duration: 9 },
    ];


  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-gray-900 overflow-hidden text-white">
       {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-50 p-2 rounded-full 
                  bg-purple-900 hover:bg-purple-600 text-white shadow-lg transition cursor-pointer"
      >
        <Home size={22} />
      </button>

      {/* Floating Emotion Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0], rotate: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: item.duration, ease: "easeInOut" }}
          className={`absolute ${item.color} opacity-30`}
          style={{ top: item.top, left: item.left }}
        >
          <item.icon size={item.size} />
        </motion.div>
      ))}
      

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-19">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 text-transparent bg-clip-text"
        >
          About <span className="text-white">Us</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 max-w-3xl text-lg text-gray-300 leading-relaxed"
        >
          Your identity is yours — private and protected.  
          What matters here is your <span className="text-purple-300 font-semibold">emotions</span>,  
          your stories, and your journey.  
          We built this space to listen, not to judge.
        </motion.p>
      </section>

      {/* Values Cards */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-8 py-20">
        {[
          { icon: Users, title: "Community Without Faces", desc: "You’re never alone. Be heard, without needing to reveal who you are." },
          { icon: Brain, title: "Emotional Support", desc: "AI trained not just to answer, but to listen and empathize." },
          { icon: Heart, title: "Human Effort", desc: "Every detail is crafted with love, so your heart feels lighter here." },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="backdrop-blur-xl bg-gradient-to-b from-zinc-900/80 to-black/60 border border-gray-700 rounded-3xl shadow-lg p-10 flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <card.icon size={55} className="text-purple-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-white">{card.title}</h3>
            <p className="text-gray-400">{card.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Call To Action */}
      <section className="relative z-10 text-center py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-gray-100"
        >
          Vent Freely. Heal Gently.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 max-w-2xl mx-auto text-gray-400"
        >
          This is your safe space — where emotions flow freely,  
          and anonymity is respected above all else.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(139,92,246,0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg"
        onClick={() => {
          navigate("/");
        }}
        >
          Share Your Story
          
        </motion.button>
      </section>
    </div>
  );
}
