import { defineConfig } from "rolldown";
import serve from "rollup-plugin-serve";
import pkg from "./package.json" with { type: "json" };

const USERSCRIPT_BANNER = `
// ==UserScript==
// @name        Magic Word
// @match       https://helldiverscompanion.com/*
// @version     ${pkg.version}
// @author      ${pkg.author}
// @license     ${pkg.license}
// @grant       none
// @inject-into page
// @run-at      document-start
// ==/UserScript==
`.trim();

export default defineConfig({
	input: "./src/index.ts",
	output: {
		format: "iife",
		file: `./dist/MagicWord.user.js`,
		codeSplitting: false,
		postBanner: USERSCRIPT_BANNER,
	},
	plugins: [
		serve("./dist/"),
	],
});
