import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  private map: L.Map;
  private markers: L.LatLng[] = [];
  private markerLayers: L.Layer[] = [];
  private polyline: L.Polyline;
  private greenLine: L.Polyline;
  private startTime: number;
  private endTime: number;
  private startMemoryUsage: number = 0;
  private endMemoryUsage: number = 0;
  private monitoringInterval: any;

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([52.397797689636285, 16.858326340887153], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.addMarker(lat, lng);
    });

    this.map.on('contextmenu', () => {
      this.removeLastMarker();
    });
  }

  private addMarker(lat: number, lng: number): void {
    const marker = L.marker([lat, lng]).addTo(this.map);
    this.markers.push(L.latLng(lat, lng));
    this.markerLayers.push(marker);
    this.updatePolylines();
  }

  private removeLastMarker(): void {
    if (this.markerLayers.length > 0) {
      const lastMarker = this.markerLayers.pop();
      this.map.removeLayer(lastMarker);
      this.markers.pop();
      this.updatePolylines();
    }
  }

  private updatePolylines(): void {
    if (this.polyline) {
      this.map.removeLayer(this.polyline);
    }
    if (this.markers.length > 0) {
      this.polyline = L.polyline(this.markers, { color: 'red' }).addTo(this.map);
    }

    if (this.greenLine) {
      this.map.removeLayer(this.greenLine);
    }
    if (this.markers.length > 1) {
      this.greenLine = L.polyline([this.markers[this.markers.length - 1], this.markers[0]], {
        color: 'green',
        dashArray: '5, 10'
      }).addTo(this.map);
    }
  }

  private calculateDistances(): void {
    let totalDistance = 0;
    for (let i = 0; i < this.markers.length; i++) {
      const pointA = L.latLng(this.markers[i]);
      const pointB = L.latLng(this.markers[(i + 1) % this.markers.length]);
      const distance = pointA.distanceTo(pointB);
      totalDistance += distance;
      console.log(`Distance between marker ${i} and marker ${(i + 1) % this.markers.length}: ${distance.toFixed(2)} meters`);
    }
    console.log(`Total distance: ${totalDistance.toFixed(2)} meters`);
  }

  public startMapTesting(): void {
    this.clearMemory();
    this.measureMemoryUsage('start');
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
      () => this.removeLastMarker(),
    ];

    actions.forEach((action, index) => {
      setTimeout(action, index * 1000);
    });

    setTimeout(() => {
      this.calculateDistances();
      this.endTime = performance.now();
      this.measureMemoryUsage('end');
      console.log(`Map testing ends. Duration: ${(this.endTime - this.startTime).toFixed(2)} ms`);
    }, actions.length * 1000);
  }

  private measureMemoryUsage(type: 'start' | 'end'): void {
    if (performance.memory) {
      if (type === 'start') {
        this.startMemoryUsage = performance.memory.usedJSHeapSize;
      } else {
        this.endMemoryUsage = performance.memory.usedJSHeapSize;
        console.log(`Memory usage: ${(this.endMemoryUsage - this.startMemoryUsage) / 1024 / 1024} MB`);
      }
    }
  }

  private clearMemory(): void {
    if (window.gc) {
      window.gc();
    }
  }
}