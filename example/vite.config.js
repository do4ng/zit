import vite from 'vite';

export default vite.defineConfig({
  base: '.',
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});
