<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);

let animationFrameId: number;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const parent = canvas.parentElement;
  if (!parent) return;

  let width = parent.offsetWidth;
  let height = parent.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  const particles: Particle[] = [];
  const particleCount = Math.floor((width * height) / 15000);
  
  const connectionDistance = 150;
  const speed = 0.5;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
    });
  }

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    
    const isDark = document.documentElement.classList.contains('dark');
    const colorRGB = isDark ? '245, 158, 11' : '30, 58, 138'; // Amber in dark, dark blue in light

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!p) continue;
      
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colorRGB}, 0.5)`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        if (!p2) continue;
        
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const opacity = 1 - distance / connectionDistance;
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          ctx.strokeStyle = `rgba(${colorRGB}, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    animationFrameId = requestAnimationFrame(render);
  };

  render();

  const handleResize = () => {
    width = parent.offsetWidth;
    height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);
  });
});
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none opacity-80 dark:opacity-50"
  />
</template>
