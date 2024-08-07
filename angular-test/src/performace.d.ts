// src/performance.d.ts
interface MemoryInfo {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
  }
  
  interface Performance {
    memory: MemoryInfo;
  }