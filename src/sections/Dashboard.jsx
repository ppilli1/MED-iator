import React, { useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import taxCutImage from "../assets/taxCut.jpg";
import ParticlesBackground from "../components/ParticlesBackground";
import MEDiator from "../assets/MED-iator.png";
import { PROJECT1, PROJECT2 } from "../constants";
import { MdArrowOutward } from "react-icons/md";
import drmario from "../assets/drmario.webp"
import { PiPrescription } from "react-icons/pi";
import { MdOutlineLocalHospital } from "react-icons/md";



const Dashboard = () => {
  const [text, count] = useTypewriter({
    words: [
      "Hey there! Welcome to MED-iator!",
      "Providing medical feedback and accuracy to doctors and patients!",
      "Make sure your health is in the right hands!",
    ],
    loop: true,
    delaySpeed: 1000,
  });


  const handleClick_md = async () => {
    const response = await fetch('http://127.0.0.1:5161/MD', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  };

  const handleClick_or = async () => {
    try {
      const response = await fetch('http://localhost:5161/OR', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Since you're not sending any data, an empty body is fine.
      });

      if (response.ok) {
        console.log('Request sent successfully');
      } else {
        console.log('Failed to send request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white antialiased selection:bg-rose-300 selection:text-rose-800 hide-scrollbar">
      <div className="fixed top-0 -z-5 h-full w-full">
        <ParticlesBackground />
      </div>
      <div className="absolute -z-10 min-h-full w-full bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee]"></div>
      <div className="flex flex-col items-center justify-center mt-[120px]">
        <h1 className="text-5xl lg:text-4xl font-light tracking-tight px-10 mb-4">
          <span className="text-fuchsia-800">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
        <img
            src = {MEDiator}
            alt = "MED-iator"
            className = "rounded-full object-cover mx-auto h-24 w-24 z-10 border-[2px] border-fuchsia-800"
        />
      </div>
      <div className="flex flex-wrap mt-[100px]">
        <div className="w-1/3">
          <div className="ml-20 flex items-center justify-center relative top-[-150px]">
            {PROJECT1.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-3xl md:mx-auto sm:mx-20 border-[4px] border-blue-700 hover:shadow-2xl hover:shadow-blue-700 transition-shadow duration-300 ease-in-out"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className={project.imageClassName}
                />
                <PiPrescription className = "absolute inset-0 m-auto z-10 text-7xl text-white transition-opacity duration-300 group-hover:opacity-0 flex items-center justify-center"/>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 backdrop-blur-lg transition-opacity duration-300 hover:opacity-100">
                  <h3 className="2xl:text-2xl 2xl:mb-10 xl:text-md xl:mb-2 lg:text-lg lg:mb-6 md:text-[1.05rem] md:mb-4 sm:text-xl sm:mb-8 text-lg text-center font-light tracking-tight">
                    {project.name}
                  </h3>
                  <p className="p-4 2xl:text-[1.125rem] 2xl:mb-12 xl:text-sm xl:mb-4 lg:text-[1rem] lg:mb-8 md:text-[0.92rem] md:mb-6 sm:text-[1rem] sm:mb-10 text-sm mb-2 tracking-tight font-light">
                    {project.description}
                  </p>
                  <Link
                    to = "/MD"
                    className={project.buttonClassName}
                    onClick={handleClick_md}
                  >
                    <div className="z-10 flex items-center">
                      <span className="2xl:text-[1.125rem] xl:text-sm lg:text-[1rem] md:text-sm sm:text-[1rem] text-sm font-light tracking-tight">
                        Meds/Diagnosis
                      </span>
                      <MdArrowOutward />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className = "w-1/3">
            <div className = "flex items-center justify-center">
                <img
                    src = {drmario}
                    alt = "Dr. Mario"
                    className = "w-[360px] h-[480px] relative top-[-50px] z-10"
                />    
            </div> 
        </div>
        <div className="w-1/3">
          <div className="flex items-center justify-center mr-20 relative top-[-150px]">
            {PROJECT2.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-3xl md:mx-auto sm:mx-20 border-[4px] border-rose-800 hover:shadow-2xl hover:shadow-rose-800 transition-shadow duration-300 ease-in-out"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className={project.imageClassName}
                />
                <MdOutlineLocalHospital className = "absolute inset-0 m-auto z-10 text-7xl text-white transition-opacity duration-300 group-hover:opacity-0 flex items-center justify-center"/>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 backdrop-blur-lg transition-opacity duration-300 hover:opacity-100">
                  <h3 className="2xl:text-2xl 2xl:mb-10 xl:text-md xl:mb-2 lg:text-lg lg:mb-6 md:text-[1.05rem] md:mb-4 sm:text-xl sm:mb-8 text-lg text-center font-light tracking-tight">
                    {project.name}
                  </h3>
                  <p className="p-4 2xl:text-[1.125rem] 2xl:mb-12 xl:text-sm xl:mb-4 lg:text-[1rem] lg:mb-8 md:text-[0.92rem] md:mb-6 sm:text-[1rem] sm:mb-10 text-sm mb-2 font-light tracking-tight">
                    {project.description}
                  </p>
                  <Link
                    to = "/OR"
                    className={project.buttonClassName}
                    onClick={handleClick_or}
                  >
                    <div className="z-10 flex items-center">
                      <span className="2xl:text-lg xl:text-sm lg:text-[1rem] md:text-sm sm:text-[1rem] text-sm font-light tracking-tight">
                        Operation Room
                      </span>
                      <MdArrowOutward />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
