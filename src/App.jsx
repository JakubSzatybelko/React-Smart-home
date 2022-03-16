import SmartDevice from "./smartDevice";
import React from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import InfomationPanel from "./InfromationPanel";
import { useState,useEffect } from "react";
import useWindowDimensions from "./Fuctions/GetWindowDimensions";

function App() {

  const [ShownPanel, setShownPanel]=useState("none");
  const [SelectedDevice, setSelectedDevice]=useState({});
  const { height, width } = useWindowDimensions();
  const [SmartDevices,setSmartDevices]=useState([]);

  useEffect(()=>{
  fetch("/MockAPI/smartDevicesAPI.json")
  .then(res => res.json())
  .then((result) => {
    setSmartDevices(result)
      })},[])

  const GetCaruselSize=()=>{
      if(width<350) return 1
      if(width<500) return 1.5
      if(width<770) return 2.5
      if(width<1000) return 3.5
      return 5.5
  }

  return (
    <div className="container text-center">

      <h1>Smart Home💡</h1>
      <h3 className="mb-5">Your devices</h3>
      <InfomationPanel SelectedData={SelectedDevice} hideFunction={()=>setShownPanel("none")} hidden={ShownPanel}/>
      
      
      {SmartDevices.length?
      <Carousel
        show={GetCaruselSize()}
        slide={3} 
        swiping={true}
        responsive={true} 
        dynamic={true} 
        infinite={true}
        rightArrow={<h1 style={{lineHeight:"4",fontSize:"4rem"}}>&rarr;</h1>} 
        leftArrow={<h1  style={{lineHeight:"4",fontSize:"4rem"}}>&larr;</h1>}
        >

      {SmartDevices.map(item=>
      <SmartDevice
        key={item.id} 
        selectFuction={()=>{setSelectedDevice(item);setShownPanel("")}}
        Data={item}
        />)}

      </Carousel>:null}
    
    </div>
  );
}

export default App;
