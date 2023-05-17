import fs from 'fs'
import esbuild from 'esbuild'
import { lessLoader } from 'esbuild-plugin-less'

const copyHTMLIndex = () => ({
  name: 'copyHTMLIndex',
  setup: (build) => build.onEnd(() => fs.cpSync('src/index.html', 'dist/index.html')),
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

await esbuild.build({
  minify: true,
  sourcemap: false,
  bundle: true,
  entryPoints: ['src/index.tsx'],
  outdir: 'dist/',
  plugins: [copyHTMLIndex(), copyAssets(), lessLoader()],
})
