import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importowanie ikon bezpośrednio
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Map = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [markerLayers, setMarkerLayers] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const greenLineRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startMemoryUsage, setStartMemoryUsage] = useState(0);
  const [endMemoryUsage, setEndMemoryUsage] = useState(0);

  useEffect(() => {
    // Fix Leaflet's default icon paths
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    const map = L.map('map').setView([52.4010, 16.9514], 13);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([52.4010, 16.9514]).addTo(map)
      .bindPopup('Centrum Wykładowe Politechniki Poznańskiej')
      .openPopup();

    // Obsługa kliknięć na mapie
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      addMarker(lat, lng);
    });

    // Obsługa kliknięcia prawym przyciskiem myszy na mapie
    map.on('contextmenu', (e) => {
      removeLastMarker();
    });

  }, []);

  const addMarker = (lat, lng) => {
    setMarkers((prevMarkers) => {
      const markerNumber = prevMarkers.length + 1;
      const newMarker = L.marker([lat, lng]).addTo(mapRef.current)
        .bindPopup(`Marker ${markerNumber} at ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
        .openPopup();

      // Dodanie numeru markera jako etykiety
      newMarker.bindTooltip(markerNumber.toString(), { permanent: true, direction: 'top' }).openTooltip();

      const newMarkers = [...prevMarkers, [lat, lng]];
      setMarkerLayers((prevLayers) => [...prevLayers, newMarker]);
      updatePolylines(newMarkers);

      return newMarkers;
    });
  };

  const removeLastMarker = () => {
    setMarkers((prevMarkers) => {
        if (prevMarkers.length === 0) return prevMarkers;

        // Usuń ostatni marker z mapy
        const lastMarkerLayer = markerLayers.pop();
        if (lastMarkerLayer) {
            mapRef.current.removeLayer(lastMarkerLayer);
        }

        // Usuń ostatni marker z listy markerów
        const newMarkers = prevMarkers.slice(0, -1);

        // Usuń ostatnią polilinię
        if (polylines.length > 0) {
            const lastPolyline = polylines.pop();
            if (lastPolyline) {
                mapRef.current.removeLayer(lastPolyline);
            }
        }

        // Aktualizuj polilinie
        updatePolylines(newMarkers);

        // Oblicz i wyświetl odległości
        calculateDistances(newMarkers);

        return newMarkers;
    });
  };

  const calculateDistances = (markers) => {
    // Obliczanie długości trasy całkowitej oraz każdej linii między dwoma markerami
    let totalDistance = 0;
    for (let i = 0; i < markers.length - 1; i++) {
        const pointA = L.latLng(markers[i]);
        const pointB = L.latLng(markers[i + 1]);
        const distance = pointA.distanceTo(pointB);
        totalDistance += distance;
        console.log(`Distance between marker ${i} and marker ${i + 1}: ${distance.toFixed(2)} meters`);
    }
    console.log(`Total distance: ${totalDistance.toFixed(2)} meters`);
  };

  const updatePolylines = (markers) => {
    // Usuń istniejące polilinie
    polylines.forEach(polyline => mapRef.current.removeLayer(polyline));
    setPolylines([]);

    let totalDistance = 0;

    // Iteruj przez wszystkie markery i obliczaj odległości między nimi
    for (let i = 1; i < markers.length; i++) {
      const newPolyline = L.polyline([markers[i - 1], markers[i]], { color: 'red' }).addTo(mapRef.current);
      setPolylines((prevPolylines) => [...prevPolylines, newPolyline]);

      const distance = mapRef.current.distance(markers[i - 1], markers[i]);
      console.log(`Długość linii między markerem ${i} a markerem ${i + 1}: ${distance.toFixed(2)} metrów`);
      totalDistance += distance;
    }

    // Usuń poprzednią zieloną linię, jeśli istnieje
    if (greenLineRef.current) {
      mapRef.current.removeLayer(greenLineRef.current);
    }

    // Dodaj nową zieloną linię łączącą pierwszy i ostatni marker
    if (markers.length > 1) {
      const newGreenLine = L.polyline([markers[0], markers[markers.length - 1]], { color: 'green', dashArray: '5, 10' }).addTo(mapRef.current);
      greenLineRef.current = newGreenLine;

      const greenDistance = mapRef.current.distance(markers[0], markers[markers.length - 1]);
      console.log(`Długość zielonej linii: ${greenDistance.toFixed(2)} metrów`);
      totalDistance += greenDistance;
    }

    console.log(`Całkowita długość trasy: ${totalDistance.toFixed(2)} metrów`);
  };

  const startMapTesting = () => {
    clearMemory(); // Clear memory before starting the test
  
    // Measure memory usage at the start
    const startMemory = measureMemoryUsage('start');
    setStartMemoryUsage(startMemory);
  
    // Record start time
    const start = performance.now();
    setStartTime(start);
  
    console.log('Map testing starts');
    const actions = [
      () => addMarker(54.39046863754263, 18.640354014690107), // Stadion Energa Gdańsk (Lechia Gdańsk)
      () => addMarker(52.22060312164592, 21.04142415644473), // Stadion Wojska Polskiego (Legia Warszawa)
      () => addMarker(50.0637794880158, 19.911793178349054), // Stadion Miejski im. Henryka Reymana (Wisła Kraków)
      () => addMarker(51.14515954264793, 16.942034947633704), // Stadion Miejski (Śląsk Wrocław)
      () => addMarker(53.10957407077707, 23.149644035635674), // Stadion Miejski (Jagiellonia Białystok)
      () => removeLastMarker(),
      () => mapRef.current.panTo([52.397797689636285, 16.858326340887153]), // Stadion Miejski (Lech Poznań)
      () => mapRef.current.setZoom(7),
      () => mapRef.current.setZoom(5),
      () => addMarker(51.7652388985917, 19.51171606268491), // Stadion Widzewa Łódź (Widzew Łódź)
      () => addMarker(53.43623290839202, 14.518838409359489), // Stadion Miejski im. Floriana Krygiera (Pogoń Szczecin)
      () => removeLastMarker()
    ];
  
    let index = 0;
    const interval = setInterval(() => {
      if (index < actions.length) {
        actions[index]();
        index++;
      } else {
        clearInterval(interval);
        console.log('Map testing ends');
  
        // Measure memory usage at the end
        const endMemory = measureMemoryUsage('end');
        setEndMemoryUsage(endMemory);
  
        // Record end time and calculate duration
        const end = performance.now();
        setEndTime(end);
  
        const memoryUsageDifference = endMemory - startMemory;
        console.log(`Map testing memory usage difference: ${memoryUsageDifference.toFixed(2)} MBs`);
        console.log(`Map testing duration: ${(end - start).toFixed(2)} milliseconds`);
      }
    }, 1000);
  };

  const clearMemory = () => {
    // Usuń wszystkie markery z mapy
    markerLayers.forEach(layer => mapRef.current.removeLayer(layer));
    setMarkerLayers([]);
    setMarkers([]);

    // Usuń polilinie z mapy
    if (polylines.length > 0) {
      polylines.forEach(polyline => mapRef.current.removeLayer(polyline));
      setPolylines([]);
    }

    // Usuń zieloną linię z mapy
    if (greenLineRef.current) {
      mapRef.current.removeLayer(greenLineRef.current);
      greenLineRef.current = null;
    }

    // Wymuś garbage collection (tylko w niektórych przeglądarkach)
    if (window.gc) {
      window.gc();
    }
  };

  const measureMemoryUsage = (stage) => {
    if (performance.memory) {
      const memoryUsage = performance.memory.usedJSHeapSize / 1048576; // Convert to MB
      console.log(`Memory Usage (${stage}): ${memoryUsage.toFixed(2)} MB`);
      return memoryUsage;
    } else {
      console.log('Memory monitoring is not supported in this browser.');
      return null;
    }
  };

  return (
    <div>
      <button onClick={startMapTesting}>Start map testing</button>
      <div id="map" style={{ height: '500px' }}></div>
    </div>
  );
};

export default Map;