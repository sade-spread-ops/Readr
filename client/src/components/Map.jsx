import React, { useState, useRef } from 'react';
// import useSwr from"swr";
import GoogleMapReact from 'google-map-react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
// import useSupercluster from"use-supercluster";
import '../styles.css';
import SearchBox from './SearchBox.jsx';
const libraries = ['places'];

const Map = () => {
  const {} = useLoadScript({
    googelMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) { return 'Error loading maps'; }
  if (!isLoaded) { return 'Loading Maps'; }
  //1)map setup
  //2)load and format data
  //3)get clusters
  //4)render map

  return (
    <div style={{ height: '50vh', width: '50%' }}>
      <GoogleMapReact
        mapContainerStyle={mapContainerStyle}
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 29.951439, lng: -90.081970 }}
        defaultZoom={10}
      >
        {/*markers*/}
      </GoogleMapReact>
      
    </div>
  );
};

export default Map;