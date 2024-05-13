import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { plugin as markdown, Mode } from 'vite-plugin-markdown'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    markdown({
      mode: [Mode.VUE],
    }),
  ],

  server: {
    watch: {
      ignored: ['!src/entries/**/*.md'],
    },
  },

  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        404: fileURLToPath(new URL('./404.html', import.meta.url)),
      },
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
