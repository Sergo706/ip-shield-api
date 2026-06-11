<template>
  <svg
    class="w-full max-w-[500px] mx-auto drop-shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient
        id="centerGlow"
        cx="0.5"
        cy="0.5"
        r="0.5"
      >
        <stop
          offset="0%"
          stop-color="currentColor"
          class="text-emerald-500"
          stop-opacity="0.25"
        />
        <stop
          offset="100%"
          stop-color="currentColor"
          class="text-emerald-500"
          stop-opacity="0"
        />
      </radialGradient>
              
      <linearGradient
        id="shieldGradient"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          offset="0%"
          stop-color="currentColor"
          class="text-emerald-300"
        />
        <stop
          offset="100%"
          stop-color="currentColor"
          class="text-emerald-600"
        />
      </linearGradient>

      <filter
        id="neonGlow"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <feGaussianBlur
          stdDeviation="3"
          result="blur"
        />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Background Ambient Glow -->
    <circle
      cx="250"
      cy="250"
      r="180"
      fill="url(#centerGlow)"
    />

    <!-- Outer Orbit Rings -->
    <circle
      cx="250"
      cy="250"
      r="200"
      stroke="currentColor"
      class="text-emerald-500/20 origin-center animate-[spin_40s_linear_infinite]"
      stroke-width="1"
      stroke-dasharray="2 6"
    />
    <circle
      cx="250"
      cy="250"
      r="160"
      stroke="currentColor"
      class="text-emerald-500/30"
      stroke-width="1"
    />

    <!-- Moving Data Packets (Outer) -->
    <g class="origin-center animate-[spin_20s_linear_infinite]">
      <circle
        cx="250"
        cy="50"
        r="5"
        fill="currentColor"
        class="text-amber-400"
        filter="url(#neonGlow)"
      />
      <circle
        cx="50"
        cy="250"
        r="3"
        fill="currentColor"
        class="text-emerald-400"
        filter="url(#neonGlow)"
      />
      <circle
        cx="391"
        cy="391"
        r="6"
        fill="currentColor"
        class="text-primary-400"
        filter="url(#neonGlow)"
      />
    </g>
            
    <!-- Moving Data Packets (Inner) -->
    <g class="origin-center animate-[spin_15s_linear_infinite_reverse]">
      <circle
        cx="250"
        cy="90"
        r="4"
        fill="currentColor"
        class="text-emerald-300"
        filter="url(#neonGlow)"
      />
      <circle
        cx="136"
        cy="363"
        r="3"
        fill="currentColor"
        class="text-white"
        filter="url(#neonGlow)"
      />
    </g>

    <!-- Static Network Connections -->
    <path
      d="M250 140L250 90"
      stroke="currentColor"
      class="text-emerald-500/40"
      stroke-dasharray="4 4"
    />
    <path
      d="M170 170L136 136"
      stroke="currentColor"
      class="text-emerald-500/40"
      stroke-dasharray="4 4"
    />
    <path
      d="M330 170L364 136"
      stroke="currentColor"
      class="text-emerald-500/40"
      stroke-dasharray="4 4"
    />
    <path
      d="M160 250L90 250"
      stroke="currentColor"
      class="text-emerald-500/40"
      stroke-dasharray="4 4"
    />
    <path
      d="M340 250L410 250"
      stroke="currentColor"
      class="text-emerald-500/40"
      stroke-dasharray="4 4"
    />

    <!-- Core Shield Graphic -->
    <g class="animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">
      <!-- Glass Backdrop -->
      <path
        d="M250 140L170 175V250C170 305 205 350 250 375C295 350 330 305 330 250V175L250 140Z"
        fill="currentColor"
        class="text-emerald-950/60"
        stroke="url(#shieldGradient)"
        stroke-width="3"
        stroke-linejoin="round"
      />
              
      <!-- Shield Internal Grid / Geometry -->
      <path
        d="M250 140V375"
        stroke="currentColor"
        class="text-emerald-500/30"
        stroke-width="1.5"
      />
      <path
        d="M170 250H330"
        stroke="currentColor"
        class="text-emerald-500/30"
        stroke-width="1.5"
      />
              
      <!-- Checkmark / Core Geometry -->
      <path
        d="M210 260L240 290L290 220"
        stroke="currentColor"
        class="text-emerald-400"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="url(#neonGlow)"
      />
              
      <!-- Node Intersections -->
      <circle
        cx="250"
        cy="250"
        r="3"
        fill="currentColor"
        class="text-white"
      />
      <circle
        cx="210"
        cy="260"
        r="4"
        fill="currentColor"
        class="text-amber-400"
      />
      <circle
        cx="240"
        cy="290"
        r="4"
        fill="currentColor"
        class="text-amber-400"
      />
      <circle
        cx="290"
        cy="220"
        r="4"
        fill="currentColor"
        class="text-amber-400"
      />
    </g>
  </svg>
</template>