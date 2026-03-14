import { defineExtension } from "../lib/define";
import { waitForExport } from "../lib/util";

export default defineExtension({
	patches: [
		// {
		// 	find: /(.{1,3})=\[(?={id:\d+.*?gameplayEffectId)/g,
		// 	replace: (_, name) =>
		// 		// `${name}=[{id:999991,effectType:47,valueTypes:[0,0],values:[0,0],textType:"game_ModifierEffect"},`,
		// 		`${name}=[` + [
		// 			{
		// 				id: 999991,
		// 				effectType: 47,
		// 				valueTypes: [0, 0],
		// 				values: [0, 0],
		// 			},
		// 		].map(v => JSON.stringify(v)).join(",") + ",",
		// },
		{
			find: /(,(.{1,3})\[\2.mark_PlanetWarning=1240\]="mark_PlanetWarning"),/,
			replace: (_, orig, name) =>
				// `${orig},${name}[${name}.mw_TestEffect=999991]="mw_TestEffect",`,
				`${orig},`
				+ [
					["mw_SEAFSupport", 999991],
					["mw_MeleeDamage", 999992],
					["mw_DiverRegen", 999993],
					["mw_AdditionalPayout", 999994],
					["mw_AdditionalPayout_2", 999994_002],
					["mw_AdditionalPayout_3", 999994_003],
					["mw_ImpenetrableDefense", 999995],
					["mw_CrippledAttackSupply", 999996],
					["mw_AttackIncrease", 999997],
					["mw_HealthStamina", 999998],
					["mw_HealthStamina_2", 999998_002],
					["mw_HealthStamina_3", 999998_003],
					["mw_NoHealing", 999999],
					["mw_IntelScanners", 9999910],
					["mw_IntelHostility", 9999911],
					["mw_MultiplyPayoutBonus", 9999912],
					["mw_PayoutStandardized", 9999913],
					["mw_MarketPriceMult", 9999914],
					["mw_MarketPriceMult_2", 9999914_002],
					["mw_ItemCostByProgress", 9999915],
					["mw_ItemCostByProgress_2", 9999915_002],
					["mw_PlanetBody", 9999916],
					["mw_PlanetBody_2", 9999916_002],
					["mw_MissionIdOverride", 9999917],
					["mw_MissionIdOverride_2", 9999917_002],
					["mw_GameplayGeneric", 9999918],
					["mw_StratagemDisabled", 9999919],
					["mw_BoosterDisabled", 9999920],
					["mw_BoosterPermit", 9999921],
					["mw_HealthAmountMax", 9999922],
					["mw_WeaponMagCount", 9999923],
					["mw_WeaponMagCount_2", 9999923_002],
					["mw_WeaponAmmoCount", 9999924],
					["mw_WeaponAmmoCount_2", 9999924_002],
					["mw_StratGroupCooldown", 9999925],
					["mw_StratGroupCooldown_2", 9999925_002],
					["mw_OperationModToggle", 9999926],
					["mw_OperationModToggle_2", 9999926_002],
				]
					.map(v => `${name}[${name}.${v[0]}=${v[1]}]="${v[0]}"`)
					.join(",")
				+ ",",
		},
	],
	// exports: [{
	// 	find: /const (.{1,3})=(?=\[{id:\d,.*?textValues:\["(?:[\w\/]+)?","(?:[\w\/]+)?"\]}],.{1,3}=\[)/,
	// 	name: "effectList",
	// }],
	async post() {
		// const effectList = await waitForExport("effectList");
		// effectList.push({
		// 	id: 99999,
		// 	effectType: 47,
		// 	valueTypes: [0, 0],
		// 	values: [0, 0],
		// });
		// console.log(effectList);
		// const
	},

	manifest: {
		name: "custom effects",
		description: "...",
		authors: ["Alyxia"],
	},
	core: true,
});
