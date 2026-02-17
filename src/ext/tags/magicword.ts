import { type Tag, TagType } from "../../lib/companion";

export default function(tagThemes: any): Tag[] {
	return [
		{
			slug: "poi_magicword",
			tagType: TagType.PointOfInterest,
			niche: "AREA OF DEVELOPMENT",
			title: "M.A.G.I.C.W.O.R.D.",
			textTag: "Something <cy>malicious</cy> is brewing here.",
			icBuild: "dev.imlost_circ|#FFCC4D|0.75",
			modes: [
				"fabricating",
				"EFF_WAVE_SQUID",
				"EFF_DANGER",
			],
			weight: 1e3,
			priority: 1e3,
			timestamp: [[2026, 2, 8]],
			// TODO: use custom planet after fetch patching is implemented
			assignCondition: ({ planet }) => planet.is(237),
		},
	];
}
