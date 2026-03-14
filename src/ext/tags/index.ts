import type { Tag } from "../../lib/companion";
import { defineExtension } from "../../lib/define";
import companion from "./companion";
import magicword from "./magicword";

export default defineExtension({
	tags: [] as Tag[],

	patches: [
		// exports
		{
			find: /const (.{1,3})=(?=.{1,3}\({style_undefined:)/,
			replace: (_, orig) => `const ${orig}=MagicWord.common['tagThemes']=`,
		},
		{
			find: /function (.{1,5})\(.{1,2},.{1,2}\)(?={return .{1,2}?.{1,2}\.filter\(.{1,2}=>.{1,2}\.text\.length)/,
			replace: (_, name) => `MagicWord.common['genUpdateText'] = ${name}; ${_}`,
		},

		// Add to the tag registry
		{
			find: /(return\[)(?=\.\.\..{1,3}\(\),)/g,
			replace: (_, orig) => `${orig}...$self.tags,`,
		},
	],

	async post() {
		this.tags.push(...(await companion()), ...(await magicword()));
	},

	manifest: {
		name: "PlanetTags",
		authors: ["Alyxia"],
		description: "Adds to the list of planet tags",
	},
	core: true,
});
