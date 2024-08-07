<template>
  <div class="container">
    <div v-for="n in numSquares" :key="n" class="square"></div>
    <div class="button-container">
      <button class="start-button" @click="startAnimation(1)">Start 1</button>
      <button class="start-button" @click="startAnimation(10)">Start 10</button>
      <button class="start-button" @click="startAnimation(100)">Start 100</button>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  data() {
    return {
      numSquares: 0,
      startAnimationFlag: false
    };
  },
  methods: {
    startAnimation(num) {
      this.numSquares = num;
      this.startAnimationFlag = true;
      this.$nextTick(() => {
        this.animateSquares(1);
      });
    },
    animateSquares(attemptNumber) {
      const squares = document.querySelectorAll('.square');
      if (squares.length === 0) return;

      const screenWidth = window.innerWidth;
      const speed = 500; // Speed in pixels per second
      let start = null;
      let frameCount = 0;
      const startTime = performance.now();

      const animate = (timestamp) => {
        if (!start) {
          start = timestamp;
          console.log(`Animation started at: ${start}`);
        }
        frameCount++;
        const progress = timestamp - start;
        const distance = (progress / 1000) * speed; // Distance in pixels
        squares.forEach((square, index) => {
          square.style.transform = `translateX(${Math.min(distance, screenWidth - square.offsetWidth)}px)`;
          square.style.top = `${index * 60}px`; // Set vertical position
        });

        if (distance < screenWidth - squares[0].offsetWidth) {
          requestAnimationFrame(animate);
        } else {
          const endTime = performance.now();
          const totalTime = endTime - startTime;
          const averageFrameTime = totalTime / frameCount;
          console.log(`Attempt: ${attemptNumber}. Total animation time for ${this.numSquares} squares: ${totalTime} ms`);
          console.log(`Attempt: ${attemptNumber}. Average frame time: ${averageFrameTime} ms`);

          if (attemptNumber < 5) {
            setTimeout(() => this.animateSquares(attemptNumber + 1), 1000); // Delay before next attempt
          }
        }
      };

      requestAnimationFrame(animate);
    }
  }
};
</script>

<style>
.container {
  position: relative;
}

.square {
  width: 50px;
  height: 50px;
  background-color: red;
  position: absolute;
  left: 0;
}

.button-container {
  margin-top: 20px;
}

.start-button {
  margin-right: 10px;
  color: green;
}
</style>