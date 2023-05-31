import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import removeConsole from 'vite-plugin-remove-console';
export default defineConfig({
	define: {
		'process.env': {}
	},
	build: {
		reportCompressedSize: false,
		target: 'esnext',
		minify: 'esbuild'
	},
	plugins: [
		sveltekit(),
		removeConsole(),
		viteCompression({
			algorithm: 'brotliCompress',
			verbose: false,
			threshold: 512,
			compressionOptions: {
				level: 3
			}
		})
	]
});
