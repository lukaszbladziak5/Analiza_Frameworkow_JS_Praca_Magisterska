import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private router: Router) {}

  navigateToRendering() {
    this.router.navigate(['/rendering']);
  }

  navigateToAnimation() {
    this.router.navigate(['/animation']);
  }

  navigateToMap() {
    this.router.navigate(['/map']);
  }

  navigateToServer() {
    this.router.navigate(['/server']);
  }
  
}
