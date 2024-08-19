import React, { useState, useEffect } from 'react';
import '../App.css';

const Animation = () => {
  const [numSquares, setNumSquares] = useState(0);
  const [startAnimationFlag, setStartAnimationFlag] = useState(false);

  useEffect(() => {
    if (startAnimationFlag) {
      const squares = Array.from(document.getElementsByClassName('square'));
      if (squares.length === 0) return;

      const screenWidth = window.innerWidth;
      const speed = 500; // Prędkość przesuwania w pikselach na sekundę

      const runAnimation = (attemptNumber) => {
        let start = null;
        let startTime = performance.now();
        let frameCount = 0;

        const animate = (timestamp) => {
          if (!start) {
            start = timestamp;
            console.log(`Animation started at: ${start}`);
          }
          frameCount++;
          const progress = timestamp - start;
          const distance = (progress / 1000) * speed; // Odległość przesunięcia w pikselach
          squares.forEach((square, index) => {
            square.style.transform = `translateX(${Math.min(distance, screenWidth - square.offsetWidth)}px)`;
            square.style.top = `${index * 60}px`; // Ustawienie pozycji pionowej
          });

          if (distance < screenWidth - squares[0].offsetWidth) {
            requestAnimationFrame(animate);
          } else {
            const endTime = performance.now();
            const totalTime = endTime - startTime;
            const averageFrameTime = totalTime / frameCount;
            console.log(`Attempt: ${attemptNumber}. Total animation time for ${numSquares} squares: ${totalTime} ms`);
            console.log(`Attempt: ${attemptNumber}. Average frame time: ${averageFrameTime} ms`);

            if (attemptNumber < 5) {
              setTimeout(() => runAnimation(attemptNumber + 1), 1000);
            }
          }
        };

        requestAnimationFrame(animate);
      };

      runAnimation(1);
      setStartAnimationFlag(false);
    }
  }, [startAnimationFlag, numSquares]);

  const startAnimation = (num) => {
    setNumSquares(num);
    setStartAnimationFlag(true);
  };

  return (
    <div className="container">
      {Array.from({ length: numSquares }).map((_, index) => (
        <div key={index} className="square"></div>
      ))}
      <div className="button-container">
        <button className="start-button" onClick={() => startAnimation(1)}>Start 1</button>
        <button className="start-button" onClick={() => startAnimation(10)}>Start 10</button>
        <button className="start-button" onClick={() => startAnimation(100)}>Start 100</button>
      </div>
    </div>
  );
};

export default Animation;