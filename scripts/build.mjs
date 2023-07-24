import fs from 'fs'
import process from 'process'
import esbuild from 'esbuild'
import { lessLoader } from 'esbuild-plugin-less'

const prod = process.argv.includes('--production')

const copyAssets = () => ({
  name: 'copyAssets',
  setup: (build) =>
    build.onEnd(() =>
      fs
        .readdirSync('assets')
        .forEach((asset) => fs.cpSync(`assets/${asset}`, `dist/${asset}`, { recursive: true })),
    ),
})

const builds = []

builds.push(
  esbuild.build({
    minify: prod,
    sourcemap: !prod,
    bundle: true,
    entryPoints: ['src/index.tsx'],
    outdir: 'dist/',
    plugins: [copyAssets(), lessLoader()],
  }),
)

await Promise.all(builds)

console.log('Build finished.')
