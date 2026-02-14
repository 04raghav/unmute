import React, { useRef } from "react";
import Hero from "./Content/Hero";
import AiBlocks from "./Content/AiBlocks";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Heart, Shield, Users } from "lucide-react";
import { Cpu, Bot, Brain, MessageSquareHeart } from "lucide-react";

export default function Content() {
  const discoverRef = useRef(null);
  const aiRef = useRef(null);

  const scrollToDiscover = () => discoverRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToAI = () => aiRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="flex flex-col text-white w-full">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-15 px-2 
                        bg-gradient-to-b from-purple-900/10 via-zinc-950 to-black overflow-hidden">

        {/* Purple Gradient Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/30 to-transparent pointer-events-none" />

        {/* Floating Calm Icons in Background */}
        <Shield className="absolute top-52 left-16 text-purple-500/20 w-10 h-10 animate-float-slow" />
        <Heart className="absolute bottom-16 right-20 text-pink-400/20 w-10 h-10 animate-float-delayed" />
        <Users className="absolute top-24 right-32 text-indigo-400/20 w-10 h-10 animate-float-slow" />

        <h1 className="relative text-4xl md:text-6xl font-bold mt-8 leading-snug animate-fade-in text-amber-100">
          Express Yourself <br />
          Anonymously with <br />
          <span className="block bg-gradient-to-r from-purple-400 via-pink-600 to-purple-300 
                          bg-clip-text text-transparent animate-gradient-x">
            UNMUTE!
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-2xl text-gray-300 leading-relaxed animate-slide-up">
          A safe space for mental wellness, anonymous journaling, and personal growth — 
          powered by AI that listens, comforts, and empowers.
        </p>

        <button
          className="mt-5 text-lg font-medium rounded-full px-8 py-3 
                    bg-purple-700/70 hover:bg-purple-600 transition shadow-xl hover:shadow-purple-500/40 
                    animate-pop cursor-pointer"
          onClick={scrollToDiscover}
        >
          Start Your Journey
        </button>
      </section>


      {/* Features Section */}
      <section className="py-5 px-6 bg-zinc-900/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.15),transparent_40%)]" />
        <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto relative z-10">
          {[
            { icon: Shield, label: "100% Anonymous" },
            { icon: Heart, label: "Mental Health Focused" },
            { icon: Users, label: "Supportive Community" },
          ].map(({ icon: Icon, label }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-purple-800/30 
                         backdrop-blur-md shadow-lg hover:scale-105 transition transform animate-float-slow"
            >
              <Icon className="text-purple-400" size={26} />
              <span className="text-lg font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Discover Section */}
      <section ref={discoverRef} className="py-20 px-6 bg-gradient-to-b from-black to-zinc-900 text-center relative overflow-hidden">
        {/* Calm Icons Floating Around */}
        <Heart className="absolute top-10 left-10 text-purple-500/30 w-12 h-12 animate-float-delayed" />
        <Users className="absolute bottom-20 right-12 text-pink-400/20 w-14 h-14 animate-float-slow" />
        <Shield className="absolute top-36 left-2/3 text-indigo-400/20 w-16 h-16 animate-float-delayed" />

        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Discover your Path to <span className="text-purple-300">Wellness</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Tools, resources, and a safe community — all designed to help you let out emotions and grow.
        </p>
        <Hero scrollToAI={scrollToAI} />
      </section>

      {/* AI Section */}
      <section 
        ref={aiRef} 
        className="py-12 px-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-center relative overflow-hidden"
      >
        {/* Elegant Floating Icons */}
        <Cpu className="absolute top-16 left-1/4 text-purple-500 opacity-30 animate-float-slow" size={40} />
        <Bot className="absolute top-40 right-12 text-indigo-400 opacity-25 animate-float-slow" size={38} />
        <MessageSquareHeart className="absolute bottom-32 left-12 text-purple-300 opacity-30 animate-float-delayed" size={42} />

        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            AI
          </span>{" "}
          That Cares
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          The only AI that sits with you in silence, speaks when needed, and hugs without words.
        </p>

        <AiBlocks />
      </section>
    </main>
  );
}
