// src/components/Animation.vue
<template>
  <div id="square" class="square"></div>
</template>

<script>
export default {
  mounted() {
    this.startAnimation();
  },
  methods: {
    startAnimation() {
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
          this.calculateFPS(startTime, endTime);
        }
      };

      requestAnimationFrame(animate);
    },
    calculateFPS(startTime, endTime) {
      const totalTime = endTime - startTime;
      const fps = 1000 / (totalTime / 60);
      console.log(`Animation Time: ${totalTime}ms, FPS: ${fps}`);
    }
  }
};
</script>

<style>
.square {
  width: 50px;
  height: 50px;
  background-color: red;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 2s linear;
}
</style>