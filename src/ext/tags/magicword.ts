import { type Tag, TagType } from "../../lib/companion";

export default function (tagThemes: any): Tag[] {
	return [
		{
			slug: "poi_magicword",
			tagType: TagType.PointOfInterest,
			niche: "AREA OF DEVELOPMENT",
			title: "M.A.G.I.C.W.O.R.D.",
			textTag: "Something <cy>malicious</cy> is brewing here.",
			icBuild: "dev.imlost_circ|#FFCC4D|0.75",
			modes: ["fabricating", "EFF_WAVE_SQUID", "EFF_DANGER"],
			weight: 1e3,
			priority: 1e3,
			timestamp: [[2026, 2, 8]],
			// TODO: use custom planet after fetch patching is implemented
			assignCondition: ({ planet }) => planet.is(237),
		},
		{
			slug: "env_slurping_navigator",
			tagType: 5,
			// priority: 30,
			weight: 1599,
			priority: 100,
			niche: "NAVIGATOR DETECTED",
			title: "THE SLURPING NAVIGATOR",
			theme: {
				main: {
					icon: {
						shape: "hexagon",
						opacity: 1,
						iconOpacity: 1,
						iconColor: "#C7C3AE",
						backOpacity: 0,
						backColor: "#272626",
						edgeOpacity: 0,
						edgeColor: "#C7C3AE",
						dropOpacity: 0.4,
						dropColor: "#272626",
					},
				},
			},
			textTag:
				"SLURP SLURP SLURP SLURP SLURP SLURP SLURP SLURP SLURP <cy>SLURP SLURP SLURP SLURP</cy> SLURP SLURP SLURP",
			icBuild: "dev.imlost_circ|0.7",
			assignCondition: ({ planet }) =>
				planet.is(212) && planet.hasEffectID(1333),
			states: [
				{
					condition: ({ planet }) => planet.isDefensive,
					override: () => ({
						textTag:
							"OH GOD OH FUCK OH RAAAUGHGHHRH RHUHGHURHG RHUGHRUG",
						modes: ["EFF_SOS"],
						theme: {
							main: {
								comp: {
									backColor: "#200803",
									backOpacity: 0.8,
									edgeColor: "#991E00",
									edgeOpacity: 1,
								},
							},
						},
					}),
				},
				{
					condition: ({ planet }) => !planet.isOurs,
					override: () => ({
						theme: tagThemes.poi_ghost,
						textTag:
							"Here lies what remains of a slurping Navigator, who once greedily consumed thousands of litres of E-711.",
					}),
				},
			],
		},
	];
}
