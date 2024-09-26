import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

import './MyMap.css';

const MyMap = (props) => {
    const {center, zoom} = props;
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    

    return (
     
        <div className={`map ${props.className}`} style={props.style}>
            <APIProvider apiKey={API_KEY}>
                <Map
                // style={{width: '100vw', height: '100vh'}}
                defaultCenter={center}
                defaultZoom={zoom}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                />
                <Marker position={center} />
            </APIProvider>
        </div>
    )
}

export default MyMap;