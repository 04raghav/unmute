import React from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Content from "../Components/ContentHome/Content";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-zinc-900">
      <Nav />

      <div className="flex-1">
        <Content />
      </div>

      <Footer />
    </div>
  );
}
