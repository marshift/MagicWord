import typescript from "@rollup/plugin-typescript";
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from "rolldown";
import serve from "rollup-plugin-serve";
import userscript from "rollup-plugin-userscript";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
	input: "./src/index.ts",
	output: {
		format: "iife",
		file: `./dist/MagicWord.user.js`,
		codeSplitting: false,
	},
	plugins: [
		typescript(),
		nodeResolve(),
		userscript((meta) =>
			meta
				.replace("__VERSION", pkg.version)
				.replace("__AUTHOR", pkg.author)
				.replace("__LICENSE", pkg.license)
		),
		serve("./dist/"),
	],
});
