import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import serve from "rollup-plugin-serve";
import userscript from "rollup-plugin-userscript";
import pkg from "./package.json" with { type: "json" };

const includeRegex = /\/\/ @include\(([^ \)]+)\)/;

export default defineConfig({
	input: "./src/index.ts",
	output: {
		format: "iife",
		file: `./dist/MagicWord.user.js`,
	},
	bundle: true,
	plugins: [
		typescript(),
		nodeResolve(),
		{
			name: "include",
			async transform(file) {
				let modified = false;

				while (true) {
					const match = file.match(includeRegex);
					if (match === null) break;
					const [comment, id] = match;

					const { code } = await this.resolve(id).then(this.load);
					if (code === null) this.error({
						code: comment,
						message: `Failed to get code for import ${id}`
					});

					file = file.replace(comment, code);
					modified = true;
				}

				if (modified) return file;
			},
		},
		userscript((meta) =>
			meta
				.replace("__VERSION", pkg.version)
				.replace("__AUTHOR", pkg.author)
				.replace("__LICENSE", pkg.license)
		),
		serve("./dist/"),
	],
});
