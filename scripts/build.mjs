import fs from 'fs'
import esbuild from 'esbuild'
import { lessLoader } from 'esbuild-plugin-less'

const copyHTMLIndex = (sources = ['index.html']) => ({
  name: 'copyHTMLIndex',
  setup: (build) =>
    build.onEnd(() => sources.forEach((source) => fs.cpSync(`src/${source}`, `dist/${source}`))),
})

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
    minify: true,
    sourcemap: false,
    bundle: true,
    entryPoints: ['src/index.tsx'],
    outdir: 'dist/',
    plugins: [copyHTMLIndex(['index.html', '404.html']), copyAssets(), lessLoader()],
  }),
)

await Promise.all(builds)

console.log('Build finished.')
