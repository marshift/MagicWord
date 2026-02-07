import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import serve from "rollup-plugin-serve";
import userscript from "rollup-plugin-userscript";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
	input: "./src/index.ts",
	output: {
		format: "iife",
		file: `./dist/MagicWord.user.js`,
	},
	bundle: true,
	external: "es-module-shims",
	plugins: [
		typescript(),
		replace({
			values: { "__ES_MODULE_SHIMS_VERSION": JSON.stringify(pkg.dependencies["es-module-shims"]) },
			preventAssignment: true,
		}),
		userscript((meta) =>
			meta
				.replace("__VERSION", pkg.version)
				.replace("__AUTHOR", pkg.author)
				.replace("__LICENSE", pkg.license)
		),
		serve("./dist/"),
	],
});
