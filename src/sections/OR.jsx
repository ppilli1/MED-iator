import React from 'react'
import ParticlesBackground from '../components/ParticlesBackground'

const OR = () => {
  return (
    <div className = "relative min-h-screen overflow-y-scroll no-scrollbar text-white antialiased selection:bg-rose-300 selection:text-rose-800">
      <div className="fixed top-0 z-0 h-full w-full">
        <ParticlesBackground />
      </div>
      <div className="absolute -z-10 min-h-full w-full bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee]"></div>
      <div className="flex items-start justify-center">
        <h3 className="uppercase tracking-[20px] text-fuchsia-800 text-2xl mt-[120px] ml-6">
          Operation Room
        </h3>
      </div>
    </div>
  )
}

export default OR