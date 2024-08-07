import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importowanie ikon bezpośrednio
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Map = () => {
  const mapRef = useRef();
  const [markers, setMarkers] = useState([]);
  const [markerLayers, setMarkerLayers] = useState([]);
  const [polyline, setPolyline] = useState(null);
  const [greenLine, setGreenLine] = useState(null);

  useEffect(() => {
    // Fix Leaflet's default icon paths
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    // Inicjalizacja mapy
    const map = L.map('map').setView([52.397797689636285, 16.858326340887153], 13);
    mapRef.current = map;

    // Dodanie warstwy tile
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Obsługa kliknięć na mapie
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      addMarker(lat, lng);
    });

    // Obsługa prawego przycisku myszy na mapie
    map.on('contextmenu', () => {
      removeLastMarker();
    });

  }, []);

  const addMarker = (lat, lng) => {
    const markerNumber = markers.length + 1;
    console.log(markerNumber);
    const newMarker = L.marker([lat, lng]).addTo(mapRef.current)
      .bindPopup(`Marker ${markerNumber} at ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
      .openPopup();

    // Dodanie numeru markera jako etykiety
    newMarker.bindTooltip(markerNumber.toString(), { permanent: true, direction: 'top' }).openTooltip();

    setMarkers([...markers, [lat, lng]]);
    setMarkerLayers([...markerLayers, newMarker]);

    updatePolylines(mapRef.current);
    calculateDistances();
  };

  const removeLastMarker = () => {
    if (markers.length > 0) {
      // Usuń ostatni marker z mapy
      const lastMarkerLayer = markerLayers.pop();
      mapRef.current.removeLayer(lastMarkerLayer);

      // Usuń ostatni marker z listy markerów
      markers.pop();

      setMarkers([...markers]);
      setMarkerLayers([...markerLayers]);

      updatePolylines(mapRef.current);
      calculateDistances();
    }
  };

  const updatePolylines = (map) => {
    // Aktualizuj czerwoną polilinię
    if (polyline) {
      map.removeLayer(polyline);
    }
    if (markers.length > 0) {
      const newPolyline = L.polyline(markers, { color: 'red' }).addTo(map);
      setPolyline(newPolyline);
    }

    // Aktualizuj zieloną przerywaną linię
    if (greenLine) {
      map.removeLayer(greenLine);
    }
    if (markers.length > 1) {
      const newGreenLine = L.polyline([markers[markers.length - 1], markers[0]], {
        color: 'green',
        dashArray: '5, 10'
      }).addTo(map);
      setGreenLine(newGreenLine);
    }
  };

  const calculateDistances = () => {
    // Obliczanie długości trasy całkowitej oraz każdej linii między dwoma markerami
    let totalDistance = 0;
    for (let i = 0; i < markers.length; i++) {
      const pointA = L.latLng(markers[i]);
      const pointB = L.latLng(markers[(i + 1) % markers.length]);
      const distance = pointA.distanceTo(pointB);
      totalDistance += distance;
      console.log(`Distance between marker ${i} and marker ${(i + 1) % markers.length}: ${distance.toFixed(2)} meters`);
    }
    console.log(`Total distance: ${totalDistance.toFixed(2)} meters`);
  };

  return (
    <div>
      <button onClick={() => console.log('Start map testing')}>Start map testing</button>
      <div id="map" style={{ height: '500px' }}></div>
    </div>
  );
};

export default Map;