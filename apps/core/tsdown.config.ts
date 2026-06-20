import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    target: 'node18',
    tsconfig: 'tsconfig.json',
    treeshake: true,
    sourcemap: false,
    minify: true,
    entry: ['./server/scripts/runDbUpdate.ts'],
    dts: false,
    format: ['esm'],
    outDir: '.output/server/scripts',
    clean: false,
    failOnWarn: true,
  },
])
