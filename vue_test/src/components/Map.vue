<template>
    <div>
        <button @click="startMapTesting">Start map testing</button>
        <div id="map" style="height: 500px;"></div>
    </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import L from 'leaflet';

    // Importowanie ikon bezpośrednio
    import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
    import markerIcon from 'leaflet/dist/images/marker-icon.png';
    import markerShadow from 'leaflet/dist/images/marker-shadow.png';

    export default {
        name: 'Map',
        data() {
            return {
            markers: [],
            markerLayers: [],
            polyline: null,
            greenLine: null,
            map: null,
            monitoringInterval: null,
            startTime: null,
            endTime: null,
            startMemoryUsage: 0,
            endMemoryUsage: 0,
            tilesToLoad : 0,
            tilesLoaded : 0
            };
        },
        mounted() {
            delete L.Icon.Default.prototype._getIconUrl;

            L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIcon2x,
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
            });

            this.map = L.map('map').setView([52.397797689636285, 16.858326340887153], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            // Dodanie obsługi kliknięcia na mapie
            this.map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            this.addMarker(lat, lng);
            });

            // Dodanie obsługi prawego przycisku myszy na mapie
            this.map.on('contextmenu', (e) => {
            this.removeLastMarker();
            });
        },
        methods: {
            updatePolylines(map) {
            // Aktualizuj czerwoną polilinię
            if (this.polyline) {
                map.removeLayer(this.polyline);
            }
            if (this.markers.length > 0) {
                this.polyline = L.polyline(this.markers, { color: 'red' }).addTo(map);
            }

            // Aktualizuj zieloną przerywaną linię
            if (this.greenLine) {
                map.removeLayer(this.greenLine);
            }
            if (this.markers.length > 1) {
                this.greenLine = L.polyline([this.markers[this.markers.length - 1], this.markers[0]], {
                color: 'green',
                dashArray: '5, 10'
                }).addTo(map);
            }
            },
            calculateDistances() {
            // Obliczanie długości trasy całkowitej oraz każdej linii między dwoma markerami
            let totalDistance = 0;
            for (let i = 0; i < this.markers.length; i++) {
                const pointA = L.latLng(this.markers[i]);
                const pointB = L.latLng(this.markers[(i + 1) % this.markers.length]);
                const distance = pointA.distanceTo(pointB);
                totalDistance += distance;
                console.log(`Distance between marker ${i} and marker ${(i + 1) % this.markers.length}: ${distance.toFixed(2)} meters`);
            }
            console.log(`Total distance: ${totalDistance.toFixed(2)} meters`);
            },
            startMapTesting() {
                this.clearMemory();
                this.measureMemoryUsage('start');

                this.startTime = performance.now();

                console.log('Map testing starts');
                const actions = [
                    () => this.addMarker(54.39046863754263, 18.640354014690107), // Stadion Energa Gdańsk (Lechia Gdańsk)
                    () => this.addMarker(52.22060312164592, 21.04142415644473), // Stadion Wojska Polskiego (Legia Warszawa)
                    () => this.addMarker(50.0637794880158, 19.911793178349054), // Stadion Miejski im. Henryka Reymana (Wisła Kraków)
                    () => this.addMarker(51.14515954264793, 16.942034947633704), // Stadion Miejski (Śląsk Wrocław)
                    () => this.addMarker(53.10957407077707, 23.149644035635674), // Stadion Miejski (Jagiellonia Białystok)
                    () => this.removeLastMarker(),
                    () => this.map.panTo([52.397797689636285, 16.858326340887153]), // Stadion Miejski (Lech Poznań)
                    () => this.map.setZoom(7),
                    () => {
                    this.map.setZoom(5);
                    setTimeout(() => {
                        const tileLoadStartTime = performance.now();
                        console.log('Tile load starts');

                        this.map.eachLayer((layer) => {
                            if (layer instanceof L.TileLayer) {
                                layer.on('tileloadstart', () => {
                                    this.tilesToLoad++;
                                });
                                layer.on('tileload', () => {
                                    this.tilesLoaded++;
                                        if (this.tilesLoaded === this.tilesToLoad) {
                                            const tileLoadEndTime = performance.now();
                                            console.log(`Tile load duration: ${(tileLoadEndTime - tileLoadStartTime).toFixed(2)} milliseconds`);
                                        }
                                });
                            }
                        });
                    }, 0);
                    },
                    () => this.addMarker(51.7652388985917, 19.51171606268491), // Stadion Widzewa Łódź (Widzew Łódź)
                    () => this.addMarker(53.43623290839202, 14.518838409359489), // Stadion Miejski im. Floriana Krygiera (Pogoń Szczecin)
                    () => this.removeLastMarker()
                ];

                let index = 0;
                const interval = setInterval(() => {
                    if (index < actions.length) {
                    actions[index]();
                    index++;
                    } else {
                    clearInterval(interval);
                    console.log('Map testing ends');

                    this.measureMemoryUsage('end');

                    this.endTime = performance.now();
                    const memoryUsageDifference = this.endMemoryUsage - this.startMemoryUsage;
                    const performanceDuration = this.endTime - this.startTime;
                    console.log(`Map testing memory usage difference: ${memoryUsageDifference.toFixed(2)} MBs`);
                    console.log(`Map testing duration: ${performanceDuration.toFixed(2)} milliseconds`);
                    }
                }, 1000);
            },
            addMarker(lat, lng) {
            const markerNumber = this.markers.length + 1;
            const newMarker = L.marker([lat, lng]).addTo(this.map)
                .bindPopup(`Marker ${markerNumber} at ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
                .openPopup();

            // Dodanie numeru markera jako etykiety
            newMarker.bindTooltip(markerNumber.toString(), { permanent: true, direction: 'top' }).openTooltip();

            this.markers.push([lat, lng]);
            this.markerLayers.push(newMarker);

            this.updatePolylines(this.map);
            this.calculateDistances();
            },
            removeLastMarker() {
            if (this.markers.length > 0) {
                // Usuń ostatni marker z mapy
                const lastMarkerLayer = this.markerLayers.pop();
                this.map.removeLayer(lastMarkerLayer);

                // Usuń ostatni marker z listy markerów
                this.markers.pop();

                this.updatePolylines(this.map);
                this.calculateDistances();
            }
            },
            clearMemory() {
            // Usuń wszystkie markery z mapy
            this.markerLayers.forEach(layer => this.map.removeLayer(layer));
            this.markerLayers = [];
            this.markers = [];

            // Usuń polilinie z mapy
            if (this.polyline) {
                this.map.removeLayer(this.polyline);
                this.polyline = null;
            }
            if (this.greenLine) {
                this.map.removeLayer(this.greenLine);
                this.greenLine = null;
            }

            // Wymuś garbage collection (tylko w niektórych przeglądarkach)
            if (window.gc) {
                window.gc();
            }
            },
            measureMemoryUsage(stage) {
            if (performance.memory) {
                const memoryUsage = performance.memory.usedJSHeapSize / 1048576;
                console.log(`Memory Usage (${stage}): ${memoryUsage.toFixed(2)} MB`);
                if (stage === 'start') {
                this.startMemoryUsage = memoryUsage;
                } else if (stage === 'end') {
                this.endMemoryUsage = memoryUsage;
                }
                return memoryUsage;
            } else {
                console.log('Memory monitoring is not supported in this browser.');
                return null;
            }
            }
        }
    };
</script>

<style scoped>
    @import '~leaflet/dist/leaflet.css';
</style>