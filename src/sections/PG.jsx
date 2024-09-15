import React from 'react'

const PatientGame = () => {
  return (
    <div className="w-screen h-screen">
      <iframe src='https://my.spline.design/jumpdomi-70e6fbb39579c9c6e73db201aa5c0b22/' frameborder='0' width='100%' height='100%'></iframe>
    </div>
    // <iframe src='https://my.spline.design/jumpdomi-70e6fbb39579c9c6e73db201aa5c0b22/' frameBorder='0' width='100%' height='100%'></iframe>

  )
}

export default PatientGame

// import React, { useState } from 'react';
// import Spline from '@splinetool/react-spline';

// function PG() {
//   const [dynamicText, setDynamicText] = useState('Initial Information');

//   // This function runs once the scene is fully loaded
//   const handleLoad = (spline) => {
//     // Find the object in the Spline scene by its name
//     const textObject = spline.findObjectByName('PostOpInfo');

//     // Update the text content dynamically
//     if (textObject) {
//       textObject.text = dynamicText;  // Update the text
//     }
//   };

//   return (
//     <>
//       <Spline
//         scene="https://discord.com/channels/@me/750700242940461167/1284728817960878141"
//         onLoad={handleLoad}
//       />
//       <input
//         type="text"
//         value={dynamicText}
//         onChange={(e) => setDynamicText(e.target.value)}
//         placeholder="Update the Spline Textbox"
//       />
//     </>
//   );
// }

// export default PG;