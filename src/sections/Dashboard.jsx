import React, { useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import taxCutImage from "../assets/taxCut.jpg";
import ParticlesBackground from "../../components/ParticlesBackground";

const Dashboard = () => {
  const [text, count] = useTypewriter({
    words: [
      "< Hey there! Welcome to TaxCut! />",
      "Minimize taxes and maximize recovery/aid!",
      "Navigate the labyrinth of tax codes!",
    ],
    loop: true,
    delaySpeed: 1000,
  });

  return (
    <div className="relative min-h-screen overflow-y-scroll no-scrollbar text-white antialiased selection:bg-rose-300 selection:text-rose-800">
      <div className="fixed top-0 z-0 h-full w-full">
        <ParticlesBackground />
      </div>
      <div className="absolute -z-10 h-full w-full bg-gradient-to-r from-blue-200 to-cyan-200"></div> 
    </div>
  );
};

export default Dashboard;
