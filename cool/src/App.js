import React,{useRef} from 'react'
import * as tf from "@tensorflow/tfjs"
import * as facemesh from "@tensorflow-models/facemesh"
import './App.css';
import Webcam from "react-webcam"
import Header from './components/header/Header';
import Foot from './components/header/footer/Foot';

function App() {
  const wcRef =useRef(null);
  const cvRef =useRef(null);

  const runMesh = async() =>{
    const net =await facemesh.load({
       inputResolution:{width:640,height:480},scale:0.8,
    })
    setInterval(()=>{
      detect(net)
    },100)
  }
  const detect =async(net) =>{
    if(typeof wcRef.current !=="undefined" && wcRef.current !== null && wcRef.current.video.readyState === 4)
    {
      const video = wcRef.current.video;
      const vheight = wcRef.current.video.videoHeight;
      const vwidth =wcRef.current.video.videoWidth;
      wcRef.current.video.height=vheight;
      wcRef.current.video.width=vwidth;
      cvRef.current.video.height=vheight;
      cvRef.current.video.width=vwidth;
      const face = await net.estimateFaces(video)
      console.log(face)
    }
    runMesh();
  }
  return (
    <div className="App">
      <Header/>
      <div className='came'>
        <Webcam ref={wcRef} 
                style={{
                  height:"60vh",
                  width:"100%",
                  position:"absolute"
                }}
         />
        <canvas ref={cvRef} 
                style={{
                  height:"480",
                  width:"640",
                  position:"absolute"
                }}
         />
         </div>
        <Foot/>
    </div>
  );
}

export default App;
