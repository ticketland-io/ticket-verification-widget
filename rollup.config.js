import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin"
import parseStringifiedEnv from './build_config/env'
import path from 'path'
import stdLibBrowser from 'node-stdlib-browser'
import {
	handleCircularDependancyWarning
} from 'node-stdlib-browser/helpers/rollup/plugin'
import alias from '@rollup/plugin-alias'
import inject from '@rollup/plugin-inject'


const production = !process.env.ROLLUP_WATCH;

const envPath = path.join(__dirname, `./.env.${process.env.NODE_ENV}`)

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		https: true,
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/view/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
    inlineDynamicImports: true,
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			preferBuiltins: false,
			dedupe: ['svelte'],
		}),
		commonjs({
			// transformMixedEsModules: true,
      include: 'node_modules/**',
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		json(),
		replace({
      ...parseStringifiedEnv(envPath),
      preventAssignment: true
    }),
		alias({
			entries: stdLibBrowser
		}),
		inject({
			process: stdLibBrowser.process,
			Buffer: [stdLibBrowser.buffer, 'Buffer']
		}),
    optimizeLodashImports(),
	],
	onwarn: (warning, rollupWarn) => {
		handleCircularDependancyWarning(warning, rollupWarn);
	},
	watch: {
		clearScreen: false
	}
};
