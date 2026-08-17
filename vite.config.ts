import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const hmrDisabled = process.env.DISABLE_HMR === 'true';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      // HMR is disabled in AI Studio via the DISABLE_HMR env var. File watching is
      // turned off alongside it to prevent flickering during agent edits.
      hmr: !hmrDisabled,
      watch: hmrDisabled ? null : {},
    },
    build: {
      target: 'es2022',
      cssMinify: 'lightningcss' as const,
      // Split the animation and icon layers out of the app bundle so the
      // above-the-fold shell can be parsed without waiting on them.
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['motion'],
            icons: ['lucide-react'],
          },
        },
      },
    },
  };
});
