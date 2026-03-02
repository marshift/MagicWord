import { defineExtension } from "../lib/define";

export default defineExtension({
	patches: [
		{
			find: /(?<=let .{1,3};const .{1,3}=\(\)=>.{1,3}\?\?\(.{1,3}=)Object\.freeze/g,
			replace: () =>
				`MagicWord.common['braille-${crypto.randomUUID()}']=Object.freeze`,
		},
	],
	manifest: {
		name: "braille",
		description: "exports aze's braille strings to the common registry",
		authors: ["Alyxia"],
	},
	core: true,
});
