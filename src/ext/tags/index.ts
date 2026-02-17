import type { Tag } from "../../lib/companion";
import { defineExtension } from "../../lib/define";
import { waitForExport } from "../../lib/util";
import companion from "./companion";
import magicword from "./magicword";

export default defineExtension({
	patches: [
		{
			find: /(return\[)(?=\.\.\..{1,3}\(\),)/g,
			replace: (_, orig) => `${orig}...$self.tags,`,
		},
	],
	exports: [{
		name: "tagThemes",
		find: /const (.{1,3})=(?=.{1,3}\({style_undefined:)/,
	}],

	tags: [] as Tag[],
	async post() {
		const tagThemes = await waitForExport("tagThemes");

		this.tags.push(
			...companion(tagThemes),
			...magicword(tagThemes),
		);
	},

	manifest: {
		name: "PlanetTags",
		authors: ["Alyxia"],
		description: "Adds to the list of planet tags",
	},
	core: true,
});
