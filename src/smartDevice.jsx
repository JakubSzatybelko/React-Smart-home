import React from 'react';
import DevicePicture from './Fuctions/DevicePicture';
import ConnectionColor from './Fuctions/ConnecionColor';
const smartDevice = (props) => {

    return (
        <div onClick={props.selectFuction}>
            <div className='selector'>
                <div><h6>{props.Data.name}</h6></div>
                <div>{props.Data.type}</div>
                <img className='img-fluid'
                 src={DevicePicture(props.Data.type)} alt="" />
                <div style={{color:ConnectionColor(props.Data.connectionState)}}>{props.Data.connectionState}</div>
            </div>
        </div>
    );
};

export default smartDevice;