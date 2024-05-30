import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';

// Fungsi untuk menentukan ikon marker berdasarkan signalStatus
const getMarkerIcon = (signalStatus) => {
  let iconUrl, iconColor;
  switch (signalStatus) {
    case 'bagus':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
      iconColor = 'green';
      break;
    case 'sedang':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png';
      iconColor = 'yellow';
      break;
    case 'buruk':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
      iconColor = 'red';
      break;
    default:
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png';
      iconColor = 'blue';
  }

  return L.icon({
    iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const MarkerClusterGroup = ({ markers }) => {
  const map = useMap();
  useEffect(() => {
    const markerClusterGroup = L.markerClusterGroup();
    map.addLayer(markerClusterGroup);
    markers.forEach(markerData => {
      const marker = L.marker(markerData.position, { icon: getMarkerIcon(markerData.signalStatus) }); // Gunakan ikon berdasarkan signalStatus
      marker.bindPopup(markerData.popupContent);
      marker.bindTooltip(markerData.tooltipContent);
      markerClusterGroup.addLayer(marker);
    });
    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [markers, map]);
  return null;
};

const MapsPage = () => {
  const [markers, setMarkers] = useState([]);
  const position = [-6.4179132, 106.738124]; // Center coordinates for the map

  const fetchData = async () => {
    try {
      const response = await axios.get('https://firm-hopefully-dolphin.ngrok-free.app/swmdepok/lokasi/', {
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        withCredentials: false,
      });
      const allData = response.data.data;
      console.log(response.data)
      const formattedData = allData.map(item => ({
        position: [parseFloat(item.latitude || 0), parseFloat(item.longitude || 0)],
        popupContent: item.serial_number,
        tooltipContent: ` ${item.serial_number} <br /> Longitude: ${parseFloat(item.longitude || 0).toFixed(6)} <br /> Latitude: ${parseFloat(item.latitude || 0).toFixed(6)} `,
        signalStatus: item.signalStatus.toLowerCase(), // Ubah signalStatus menjadi huruf kecil
      }));
      setMarkers(formattedData);
      console.log(`Number of markers fetched: ${formattedData.length}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-lg border m-10 h-[90%] flex flex-col border-shadow-2xl overflow-x-scroll lg:overflow-hidden">
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
        <MarkerClusterGroup markers={markers} />
      </MapContainer>
    </div>
  );
};

export default MapsPage;