import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {
  squares: number[] = [];
  startTime: number;
  endTime: number;
  fps: number;

  ngOnInit() {}

  startAnimation(numSquares: number) {
    this.squares = Array(numSquares).fill(0);
    setTimeout(() => this.runAnimation(1, numSquares), 0);
  }

  runAnimation(attemptNumber: number, numSquares: number) {
    const squares = Array.from(document.getElementsByClassName('square'));
    if (squares.length === 0) return;

    const screenWidth = window.innerWidth;
    const speed = 500; // Prędkość przesuwania w pikselach na sekundę
    let start: number | null = null;
    let startTime = performance.now();
    let frameCount = 0;

    const animate = (timestamp: number) => {
      if (!start) {
        start = timestamp;
        console.log(`Animation started at: ${start}`);
      }
      frameCount++;
      const progress = timestamp - start;
      const distance = (progress / 1000) * speed; // Odległość przesunięcia w pikselach
      squares.forEach((square, index) => {
        const squareElement = square as HTMLElement;
        squareElement.style.transform = `translateX(${Math.min(distance, screenWidth - squareElement.offsetWidth)}px)`;
        squareElement.style.top = `${index * 60}px`; // Ustawienie pozycji pionowej
      });

      if (distance < screenWidth - (squares[0] as HTMLElement).offsetWidth) {
        requestAnimationFrame(animate);
      } else {
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        const averageFrameTime = totalTime / frameCount;
        console.log(`Attempt: ${attemptNumber}. Total animation time for ${numSquares} squares: ${totalTime} ms`);
        console.log(`Attempt: ${attemptNumber}. Average frame time: ${averageFrameTime} ms`);

        if (attemptNumber < 5) {
          setTimeout(() => this.runAnimation(attemptNumber + 1, numSquares), 1000);
        }
      }
    };

    requestAnimationFrame(animate);
  }
}