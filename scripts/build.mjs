import fs from 'fs'
import process from 'process'
import esbuild from 'esbuild'
import { lessLoader } from 'esbuild-plugin-less'

const prod = process.argv.includes('--production')

const copyAssets = () => ({
  name: 'copyAssets',
  /** @type {(build: esbuild.PluginBuild) => void | Promise<void>} */
  setup: (build) =>
    build.onEnd(() => {
      if (fs.existsSync('assets'))
        fs.readdirSync('assets').forEach((asset) =>
          fs.cpSync(`assets/${asset}`, `dist/${asset}`, { recursive: true }),
        )
    }),
})

const cleanDist = () => ({
  name: 'cleanDist',
  /** @type {(build: esbuild.PluginBuild) => void | Promise<void>} */
  setup: (build) =>
    build.onStart(() => {
      if (fs.existsSync('dist'))
        fs.readdirSync('dist').forEach((file) => fs.rmSync(`dist/${file}`, { recursive: true }))
    }),
})

await Promise.all([
  esbuild.build({
    minify: prod,
    sourcemap: !prod,
    bundle: true,
    entryPoints: ['src/index.tsx'],
    outdir: 'dist/',
    logLevel: 'info',
    plugins: [copyAssets(), cleanDist(), lessLoader()],
  }),
])
