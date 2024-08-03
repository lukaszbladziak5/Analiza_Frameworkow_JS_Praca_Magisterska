import { Component, OnInit } from '@angular/core';
// Importuje moduły Component i OnInit z biblioteki Angular.

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
// Dekorator @Component definiuje metadane dla komponentu Angular.
// selector: 'app-animation' - określa nazwę selektora HTML dla tego komponentu.
// templateUrl: './animation.component.html' - ścieżka do pliku szablonu HTML dla tego komponentu.
// styleUrls: ['./animation.component.css'] - ścieżka do pliku CSS dla tego komponentu.

export class AnimationComponent implements OnInit {
// Definiuje klasę AnimationComponent, która implementuje interfejs OnInit.

  startTime: number;
  endTime: number;
  fps: number;
  // Deklaruje trzy właściwości: startTime, endTime i fps, wszystkie typu number.

  ngOnInit() {
    this.startAnimation();
  }
  // Metoda ngOnInit jest wywoływana po inicjalizacji komponentu.
  // Wywołuje metodę startAnimation.

  startAnimation() {
    const square = document.getElementById('square');
    // Pobiera element HTML o id 'square'.
    this.startTime = performance.now();
    // Ustawia startTime na bieżący czas w milisekundach.
    let start = null;
    // Deklaruje zmienną start i inicjalizuje ją jako null.
    const duration = 2000; // 2 seconds
    // Ustawia czas trwania animacji na 2000 milisekund (2 sekundy).

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      // Jeśli start jest null, ustawia go na bieżący znacznik czasu.
      const progress = timestamp - start;
      // Oblicza postęp animacji jako różnicę między bieżącym znacznikiem czasu a startem.
      const percentage = Math.min(progress / duration, 1);
      // Oblicza procent ukończenia animacji, ograniczając go do maksymalnie 1 (100%).
      square.style.transform = `translateX(${percentage * 100}%)`;
      // Ustawia transformację CSS elementu 'square', przesuwając go w poziomie o obliczony procent.

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        this.endTime = performance.now();
        this.calculateFPS();
      }
      // Jeśli postęp jest mniejszy niż czas trwania, wywołuje requestAnimationFrame z funkcją animate.
      // W przeciwnym razie ustawia endTime na bieżący czas i wywołuje metodę calculateFPS.
    };

    requestAnimationFrame(animate);
    // Rozpoczyna animację, wywołując requestAnimationFrame z funkcją animate.
  }

  calculateFPS() {
    const totalTime = this.endTime - this.startTime;
    // Oblicza całkowity czas trwania animacji jako różnicę między endTime a startTime.
    this.fps = 1000 / (totalTime / 60);
    // Oblicza liczbę klatek na sekundę (FPS) na podstawie całkowitego czasu trwania animacji.
    console.log(`Animation Time: ${totalTime}ms, FPS: ${this.fps}`);
    // Wypisuje w konsoli czas trwania animacji i liczbę klatek na sekundę.
  }
}
