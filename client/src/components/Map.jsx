import React, { useState, useRef } from 'react';
// import useSwr from"swr";
import GoogleMapReact from 'google-map-react';
// import useSupercluster from"use-supercluster";
import {
  GoogleMap,
  useLoadScript
} from '@react-google-maps/api';
import '../styles.css';
const libraries = ['places'];
const center = {
  lat: 29.951439,
  lng: -90.081970
};
const mapContainerStyle = {
  width: '50vw',
  height: '50vh'
};
const Map = () => {
  //1)map setup
  //2)load and format data
  //3)get clusters
  //4)render map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries
  });
  if (loadError) { return 'Error loading maps'; }
  if (!isLoaded) { return 'Loading Maps'; }

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        center={ center }
        zoom={10}
      >
        {/*markers*/}
      </GoogleMap>
    </div>
  );
};

export default Map;