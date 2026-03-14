import { type Tag, TagType } from "../../lib/companion";
import { waitForExport } from "../../lib/util";

export default async function(): Promise<Tag[]> {
	const tagThemes = await waitForExport("tagThemes");
	const genUpdateText = await waitForExport("genUpdateText");

	return [
		{
			slug: "poi_magicword",
			tagType: TagType.PointOfInterest,
			niche: "AREA OF DEVELOPMENT",
			title: "M.A.G.I.C.W.O.R.D.",
			icBuild: "dev.imlost_circ|#FFCC4D|0.75",
			modes: ["fabricating", "EFF_WAVE_SQUID", "EFF_DANGER"],
			weight: 1e3,
			priority: 1e3,
			timestamp: [[2026, 2, 8]],
			// TODO: use custom planet after fetch patching is implemented
			assignCondition: ({ planet }) => planet.is(267),

			textTag: `Something <cy>malicious</cy> is brewing here.
			<img:/news/victory4.webp:>
			<imgpo:po_sesatcom2:>
			<imgpo:testtest:>
			<imgpo:/news/victory4.webp:>
			<imgop:po_sesatcom2:>
			<imgop:testtest:>
			<imgop:/news/victory4.webp:>

			${
				genUpdateText([
					{
						timestamp: [
							[2026, 1, 2],
							[2026, 1, 7],
						],
						text:
							"To perform the inaugural <cy>test fire</cy> of the Star of Peace, a vast <cy>supply of E-711</cy> needed to be secured for conversion to Dark Fluid. A barely sufficient supply was harvested from Hive World Omicron.",
					},
					{
						timestamp: [
							[2026, 1, 8],
							[2026, 1, 14],
						],
						text:
							"Heat generation by the test fire would require mitigation & dispersion. <cy>Iridium was harvested</cy> from the remains of a pair of Automaton detachments who failed to seize K & Mox from us.",
					},
					{
						timestamp: [[2026, 1, 18]],
						text:
							"The Star of Peace preemptively <cy>annihilated Automaton-occupied Penta</cy>, winning the vote over Hive World Zagon Prime & Valmox.",
					},
					{
						timestamp: [[2026, 1, 20]],
						text:
							"The Star of Peace returned to Pandora Base to undergo an extensive structural <cy>rebuild</cy>, after sustaining damages to primary systems during the test fire.",
					},
				])
			}
			`,
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
					comp: {
						backColor: "#0A0B0C",
						backOpacity: 0.8,
						edgeColor: "#C7C3AE",
						edgeOpacity: 0.4,
					},
					icon: {
						shape: "hexagon",
						opacity: 1,
						iconOpacity: 1,
						iconColor: "#C7C3AE",
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
						niche: "NAVIGATOR REMAINS",
						modes: ["neutralized"],
						textTag:
							"Here lies what remains of a slurping Navigator, who once greedily consumed thousands of litres of E-711.",
					}),
				},
			],
		},
	];
}
