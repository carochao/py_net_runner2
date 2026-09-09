import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {fileURLToPath} from 'url';
import {defineConfig} from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      command === 'build' && {
        name: 'remove-main-script',
        transformIndexHtml(html: string) {
          return html.replace(/<script type="module" src="\/src\/main\.tsx"><\/script>/g, '');
        }
      }
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true,
    },
  };
});
