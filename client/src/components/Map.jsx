import React, { useState, useRef, useEffect } from 'react';
// import useSwr from"swr";
import GoogleMapReact from 'google-map-react';
// import useSupercluster from"use-supercluster";
import {
  GoogleMap,
  useLoadScript,
  setMap
} from '@react-google-maps/api';
import '../styles.css';
const libraries = ['places'];
const center = {
  lat: 29.951439,
  lng: -90.081970
};
const mapContainerStyle = {
  padding: '4rem',
  width: '50vw',
  height: '50vh'
};


let service;
let infowindow;
let map;

const Map = () => {

  const initialize = () => {
    
    const superdome = new google.maps.LatLng(center.lat, center.lng);
  
    map = new google.maps.Map(document.getElementById('map'), {
      padding: '4rem',
      mapContainerStyle: mapContainerStyle,
      width: '50vw',
      height: '50vh',
      center: superdome,
      zoom: 10
    });
  
    const request = {
      location: superdome,
      radius: '24140.16',
      type: ['book_store']
    };
  
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  };
  
  const callback = (results, status) => {
    console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  };
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
  // const [stores, setStores] = React.useState([]);
  // initialize();
  const createMarker = (place) => {
    const placeLoc = place.geometry.location;
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
  
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  };
  return (
    <div id='map' style={{paddingTop: '6rem', width: '50vw', height: '50vh'}}>
      <GoogleMap
        padding={'4rem'}
        mapContainerStyle={mapContainerStyle}
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        center={ center }
        zoom={10}
        onTilesLoaded={initialize}
      >
        {/*markers*/}
      </GoogleMap>
    </div>
  );
};

export default Map;