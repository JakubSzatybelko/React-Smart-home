import React, { useEffect } from 'react';
import interact from 'interactjs';
import { useState } from "react";
import DevicePicture from "./Fuctions/DevicePicture";


const InfomationPanel = (props) => {

  const [SmartDeviceDetails,setSmartDevicesDetails]=useState([]);
  useEffect(()=>{
    var Name=""
    if (!props.SelectedData.type)return
    if (props.SelectedData.type==="bulb") Name="/MockAPI/SmartBulbAPI.json"
    if (props.SelectedData.type==="outlet") Name="/MockAPI/SmartOutletAPI.json"
    if (props.SelectedData.type==="temperatureSensor") Name="/MockAPI/SmartTemperatureSensorAPI.json"
    fetch(Name)
  .then(res => res.json())
  .then((result) => {
    setSmartDevicesDetails(result)
      })},[props.SelectedData.type])

 let Properties= Object.entries(SmartDeviceDetails).map((item)=>
  <tr key={item[0]}>
  <th scope="row">{item[0]}:</th>
  <td>{item[1].toString()}</td>
  </tr>)
  
    const [positionDarag, setpositionDarag]=useState({ x: 0, y: 0 });
    const [positionMove, setpositionMove]=useState({ x: 0, y: 0 });
    
    interact('.draggable').resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
          move: function (event) {
            let { x, y } = event.target.dataset

            x = (parseFloat(x) || 0) + event.deltaRect.left
            y = (parseFloat(y) || 0) + event.deltaRect.top

            setpositionMove({x:x,y:y})

            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              transform: `translate(${positionDarag.x+positionMove.x}px, ${positionDarag.y+positionMove.y}px)`
            })
            Object.assign(event.target.dataset, { x, y })
          }
        }
      }).draggable({
        listeners: {
          move (event) {
            setpositionDarag({x:positionDarag.x += event.dx,y:positionDarag.y += event.dy})
            event.target.style.transform =
              `translate(${positionDarag.x+positionMove.x}px, ${positionDarag.y+positionMove.y}px)`
          },
        }
      })

    return (
        <div style={{display:props.hidden,height:"0px"}}>
        <div className='pt-5 col-6'>
            <div className="card bg-light mb-3 draggable resizable" style={{overflowY:"auto",zIndex:10,minWidth:"305px"}}>
                <div className="card-header">
                      <img style={{maxWidth:"200px"}} className='img-fluid pl-5' src={DevicePicture(props.SelectedData.type)} alt="pic" />
                    <span onClick={props.hideFunction} className='float-right btn btn-outline-secondary'>X</span>
                </div>
                <div className="card-body">
                    <h4 className="card-title text-capitalize">{props.SelectedData.name}</h4>
                    <div className='col-12'>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Type</th>
                              <th scope="col">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Properties}
                          </tbody>
                        </table>
                      </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default InfomationPanel;