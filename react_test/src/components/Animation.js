import React, { useEffect } from 'react';

const Animation = () => {
  useEffect(() => {
	startAnimation();
  }, []);

  const startAnimation = () => {
	const square = document.getElementById('square');
	const startTime = performance.now();
	let start = null;
	const duration = 2000; // 2 seconds

	const animate = (timestamp) => {
	  if (!start) start = timestamp;
	  const progress = timestamp - start;
	  const percentage = Math.min(progress / duration, 1);
	  square.style.transform = `translateX(${percentage * 100}%)`;

	  if (progress < duration) {
		requestAnimationFrame(animate);
	  } else {
		const endTime = performance.now();
		calculateFPS(startTime, endTime);
	  }
	};

	requestAnimationFrame(animate);
  };

  const calculateFPS = (startTime, endTime) => {
	const totalTime = endTime - startTime;
	const fps = 1000 / (totalTime / 60);
	console.log(`Animation Time: ${totalTime}ms, FPS: ${fps}`);
  };

  return <div id="square" className="square"></div>;
};

export default Animation;