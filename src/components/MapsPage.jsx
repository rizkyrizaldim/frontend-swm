import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapsPage = () => {
  const [markers, setMarkers] = useState([]);
  const position = [-6.4179132, 106.738124]; // Koordinat pusat peta

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jaguar-neat-dingo.ngrok-free.app/swmdepok/lokasi/', {
        headers: {
          'Accept': 'application/json',
          "ngrok-skip-browser-warning": "true",
        },
        withCredentials: false,
      });
      const allData = response.data.data;
      // console.log(allData)
      const formattedData = allData.map(item => ({
        position: [parseFloat(item.latitude || 0), parseFloat(item.longitude || 0)],
        name: item.serial_number,
      }));

      setMarkers(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-lg border m-10 h-[90%] flex flex-col bordershadow-2xl overflow-x-scroll lg:overflow-hidden">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers markers={markers}/>
      </MapContainer>
    </div>
  );
};

const arr = [];
const Markers = ({markers}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const updateIndex = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % markers.length)
    }

    const timeoutId = setTimeout(updateIndex, 500);

    return () => clearTimeout(timeoutId)
  }, [currentIndex, markers.length])
  markers[currentIndex]?.position ? arr.push(markers[currentIndex]) : ""

  console.log(arr)
  return (
    <>
      {/* {markers.map((marker, index) => (
        {index === currentIndex && (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.name}</Popup>
            <Tooltip>
              {marker.name} <br />
              Longitude: {marker.position[1].toFixed(6)} <br />
              Latitude: {marker.position[0].toFixed(6)}
            </Tooltip>
          </Marker>
        )}
      ))} */}

      {
        arr.map(item => (
          <Marker position={item.position }>
            <Popup>{item.name}</Popup>
            <Tooltip>
              {item.name} <br />
              Longitude: {item.position[1].toFixed(6) || 0} <br />
              Latitude: {item.position[0].toFixed(6) || 0}
            </Tooltip>
          </Marker> 
        ))
          
      }
    </>
  )
}

export default MapsPage;
