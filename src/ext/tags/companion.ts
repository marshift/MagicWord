import { type Tag, TagType } from "../../lib/companion";
import { waitForExport } from "../../lib/util";

export default async function(): Promise<Tag[]> {
	const tagThemes = await waitForExport("tagThemes");
	const Colours = MagicWord.findByObjectKeys("diver_yellow")[0];

	return [
		{
			slug: "poi_companion",
			tagType: TagType.PointOfInterest,
			title: "C.O.M.P.A.N.I.O.N.",
			niche: "MAJOR APP OF INTEREST",
			icBuild: "card.wing_left|#FFE710|0.35|-39,-5;card.wing_right|#FFE710|0.35|39,-5;campaign.priority|#FFE710|0.4",
			theme: {
				main: {
					comp: {
						headColor: Colours.diver_yellow,
						edgeColor: Colours.diver_yellow_D1,
						edgeOpacity: 0.8,
					},
				},
			},
			priority: 11,
			weight: 0,
			assignCondition: ({ planet }) => planet.is(2),
		},
		{
			slug: "env_lost",
			tagType: TagType.EnvCondition,
			title: "LOST",
			niche: "NAVIGATION CONDITION",
			textTag: "oh god <cy>how did i get here</cy> i am not good with computer",
			icBuild: "dev.imlost_face|0.9",
			theme: tagThemes.envcon,
			priority: 11,
			assignCondition: ({ planet }) => planet.is(2),
		},
	];
}
