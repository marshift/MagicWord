import { defineExtension } from "../lib/define";

export default defineExtension({
	// TODO: Directly "vibe-ported" from Alyxia's uBlock rules. Clean this up!
	patches: [
		// Allows writing to the debug fields.
		// Mainly to fix page TestWIP page switching as it needs a writable field.
		{
			// previously lockedFieldDEV
			find: /(.)\.lfD/gi,
			replace: "$1.nF"
		},
		{
			// previously lockedFieldV3
			find: /(.)\.lfV3/gi,
			replace: "$1.nF"
		},

		// NOTE: Currently broken
		...(window.localStorage.getItem("ENABLE_V3") === "true" ? [
			{
				find: /"_fl",!1/i,
				replace: "\"_fl\",!0"
			},
			{
				find: /function h\((.{1,2},.{1,2})\){return .{1,2}\[\d+\]\?0:1}/gi,
				replace: "function h($1){return 1}"
			}
		] : []),

		// Debug Key
		{
			find: /"_dk",""/i,
			replace: "\"_dk\",\"8228\"",
		},

		// Debug Level
		{
			find: /"_dl",0/i,
			replace: "\"_dl\",4",
		},

		// Either of these enable "SUPER"
		{
			find: /"_dm",!1/i,
			replace: "\"_dm\",!0",
		},
		{
			find: /"_wm",!1/i,
			replace: "\"_wm\",!0",
		},

		{
			find: /"_debugEenabled",!1/i,
			replace: "\"_debugEenabled\",!0",
		},
		{
			find: /"_enableStacks",!1/i,
			replace: "\"_enableStacks\",!0",
		},

		{
			find: /"DEV",!1/i,
			replace: "\"DEV\",!0",
		},
		{
			find: /"V3",!1/i,
			replace: "\"V3\",!0",
		},
		{
			find: /"PROD",!0/i,
			replace: "\"PROD\",!1",
		},

		{
			find: /"dlevel",-1/i,
			replace: "\"dlevel\",1",
		},

		// AUG 21 2025: war between the coughing bomb and the hydrogen baby
		{
			find: /on:!1/i,
			replace: "on:!0",
		},
		{
			find: /on1:!1/i,
			replace: "on1:!0",
		},
		{
			find: /on2:!1/i,
			replace: "on2:!0",
		},

		// (disabled) on3
		// ||helldiverscompanion.com^_app^*.js$replace=/on3:!1/on3:!0/i

		{
			find: /on4:!1/i,
			replace: "on4:!0",
		},

		{
			find: /is1:!1/i,
			replace: "is1:!0",
		},
		{
			find: /is2:!1/i,
			replace: "is2:!0",
		},
		{
			find: /is3:!1/i,
			replace: "is3:!0",
		},
		{
			find: /is4:!1/i,
			replace: "is4:!0",
		},

		{
			find: /lvl:-1/i,
			replace: "lvl:4",
		},

		// the war is won
		{
			find: /(.{1,2})=(.{1,2})\(\[(.*?)\],\(\[(.*?)\]\)=>\((.*?){(.{1,2}):.*?\(`.*?`\)}\),{.{1,2}"(.*?)"}\)/gi,
			replace: "$1=$2([$3],([$4])=>({$6:\"$7\"}))",
		},

		// don't really remember but here for a reason i think
		{
			find: /=(.{1,3})\.slice\(0,3\)/i,
			replace: "=$1",
		},

		// war 3
		// AH AH AH block, some bitflip magic is used so I can't just turn 0 to 1
		{
			find: /function (.{1,2})\((.{1,2},.{1,2})\){return 0}return~/i,
			replace: "function $1($2){return 1}return",
		},

		// smugcat on #testwip is layout 1, needs to use layout 0
		{
			find: /function l\((.{1,2},.{1,2})\){return 1}/i,
			replace: "function l($1){return 0}"
		},

		// re-enable console logs
		{
			find: /static cli\((.{1,2}),\.\.\.(.{1,2})\){/i,
			replace: "static cli($1,...$2){console.log(...$2);",
		},

		// show the debug planet effects and metatables
		{
			find: /const (.{1,2})=(.{1,2})=>.{1,2}\?\?-1/g,
			replace: "const $1=$2=>$2<0?1:$2",
		},
		// show forcibly disabled planet tags
		{
			find: /(.{1,2})\.tagType=(.{1,2})\.Hidden/g,
			replace: (_, tag, tagTypes) => `${tag}.tagType=${tagTypes}.OpParameter`,
		},

		// TODO: Move to a separate extension for common exports
		{
			find: /const (.{1,3})=(?=class .{1,3}{static now)/,
			replace: (_, name) => `const ${name}=MagicWord.common['utils']=`
		},
		{
			find: /const (.{1,3})=(?=class .{1,3}{static enableSound)/,
			replace: (_, name) => `const ${name}=MagicWord.common['sound']=`
		},

		// Optionally disable the (potentially) slow FTL map layer
		...(localStorage.getItem("DISABLE_FTL_LAYER") === "true"
			? [
					{
						find: /\(.{1,2}=.{1,2}\.getSource\("ftls"\)\)==null\|\|.{1,2}\.setData\(.{1,2}\)/g,
						replace: "(void 0)",
					},
				]
			: []),
	],
	manifest: {
		name: "dev",
		description: "hi aze",
		authors: ["Alyxia", "marshift"],
	},
});
