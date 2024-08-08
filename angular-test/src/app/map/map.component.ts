import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  private map: L.Map;
  private markers: L.Marker[] = [];
  private polylines: L.Polyline[] = [];
  private greenLine: L.Polyline;
  private startTime: number;
  private endTime: number;
  private startMemoryUsage: number;
  private endMemoryUsage: number;

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

  private initMap(): void {
    this.map = L.map('map').setView([52.397797689636285, 16.858326340887153], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.addMarker(lat, lng);
    });

    this.map.on('contextmenu', (e: L.LeafletMouseEvent) => {
      this.removeLastMarker();
    });
  }

  private addMarker(lat: number, lng: number): void {
    const markerNumber = this.markers.length + 1;
    const newMarker = L.marker([lat, lng]).addTo(this.map)
      .bindPopup(`Marker ${markerNumber} at ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
      .openPopup();

    newMarker.bindTooltip(markerNumber.toString(), { permanent: true, direction: 'top' }).openTooltip();

    this.markers.push(newMarker);
    this.updatePolylines();
  }

  private removeLastMarker(): void {
    const lastMarker = this.markers.pop();
    if (lastMarker) {
      this.map.removeLayer(lastMarker);
      this.updatePolylines();
    }
  }

  private updatePolylines(): void {
    this.polylines.forEach(polyline => this.map.removeLayer(polyline));
    this.polylines = [];

    let totalDistance = 0;

    for (let i = 1; i < this.markers.length; i++) {
      const latlngs = [this.markers[i - 1].getLatLng(), this.markers[i].getLatLng()];
      const polyline = L.polyline(latlngs, { color: 'red' }).addTo(this.map);
      this.polylines.push(polyline);

      totalDistance += this.map.distance(latlngs[0], latlngs[1]);
    }

    if (this.greenLine) {
      this.map.removeLayer(this.greenLine);
    }

    if (this.markers.length > 1) {
      const latlngs = [this.markers[0].getLatLng(), this.markers[this.markers.length - 1].getLatLng()];
      this.greenLine = L.polyline(latlngs, { color: 'green', dashArray: '5, 10' }).addTo(this.map);
    }

    console.log(`Całkowita długość trasy: ${totalDistance.toFixed(2)} metrów`);
  }

  startMapTesting(): void {
    this.clearMemory();

    this.startMemoryUsage = this.measureMemoryUsage('start');
    this.startTime = performance.now();

    console.log('Map testing starts');
    const actions = [
      () => this.addMarker(54.39046863754263, 18.640354014690107),
      () => this.addMarker(52.22060312164592, 21.04142415644473),
      () => this.addMarker(50.0637794880158, 19.911793178349054),
      () => this.addMarker(51.14515954264793, 16.942034947633704),
      () => this.addMarker(53.10957407077707, 23.149644035635674),
      () => this.removeLastMarker(),
      () => this.map.panTo([52.397797689636285, 16.858326340887153]),
      () => this.map.setZoom(7),
      () => this.map.setZoom(5),
      () => this.addMarker(51.7652388985917, 19.51171606268491),
      () => this.addMarker(53.43623290839202, 14.518838409359489),
      () => this.removeLastMarker()
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < actions.length) {
        actions[index]();
        index++;
      } else {
        clearInterval(interval);
        this.endMemoryUsage = this.measureMemoryUsage('end');
        this.endTime = performance.now();
        console.log(`Test completed in ${(this.endTime - this.startTime).toFixed(2)} ms`);
        console.log(`Memory usage: ${((this.endMemoryUsage - this.startMemoryUsage) / 1048576).toFixed(2)} MB`);
      }
    }, 1000);
  }

  private clearMemory(): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];

    this.polylines.forEach(polyline => this.map.removeLayer(polyline));
    this.polylines = [];

    if (this.greenLine) {
      this.map.removeLayer(this.greenLine);
      this.greenLine = null;
    }

    if (window.gc) {
      window.gc();
    }
  }

  private measureMemoryUsage(stage: string): number {
    if (performance.memory) {
      const memoryUsage = performance.memory.usedJSHeapSize;
      console.log(`Memory usage at ${stage}: ${(memoryUsage / 1048576).toFixed(2)} MB`);
      return memoryUsage;
    } else {
      console.log('Memory measurement is not supported in this browser.');
      return 0;
    }
  }
}