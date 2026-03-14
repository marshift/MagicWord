import { getApi } from "./lib/api";
import { applyPatches, runPostHooks } from "./lib/patcher";

async function init() {
	window.stop(); // stophack!
	window.MagicWord = getApi();

	const newDocument = await fetch(document.location.href.split("#")[0]).then((res) => res.text())
		.then((t) => new DOMParser().parseFromString(t, "text/html"));

	const oldRoot = document.documentElement;
	const newRoot = newDocument.documentElement;

	for (const attr of oldRoot.attributes) oldRoot.removeAttributeNode(attr);
	for (const attr of newRoot.attributes) oldRoot.setAttributeNode(attr.cloneNode() as Attr);
	oldRoot.replaceChildren(...newRoot.children);

	const origFetch = window.fetch;
	window.fetch = async (input, init) => {
		let responseData = null;
		if (input instanceof Request) return await origFetch(input, init);
		// console.log(input, init);\

		// if (input.toString().includes("live/planets/267/7days.json")) {
		// 	return new Response(JSON.stringify({
		// 		timestampUtc: new Date().toISOString(),
		// 		data: [{
		// 			owner: 6,
		// 			health: 2000000,
		// 			regenPerSecond: 5.5555554 * 20,
		// 			players: 3,
		// 			timestampUtc: new Date().toISOString(),
		// 		}, {
		// 			owner: 6,
		// 			health: 1000000,
		// 			regenPerSecond: 5.5555554 * 20,
		// 			players: 1,
		// 			timestampUtc: new Date(new Date().setMinutes(new Date().getMinutes() - 15)).toISOString(),
		// 		}, {
		// 			owner: 6,
		// 			health: 500000,
		// 			regenPerSecond: 5.5555554 * 20,
		// 			players: 5,
		// 			timestampUtc: new Date(new Date().setMinutes(new Date().getMinutes() - 30)).toISOString(),
		// 		}],
		// 	}));
		// }

		if (input.toString().includes("/api/hell-divers-2-api/get-api-data-live")) {
			const res = await origFetch(input, init);
			// const data = await res.clone().json();

			await res.clone().json().then((data) => {
				responseData = data;
			});

			const position = {
				x: -0.900,
				y: -0.3,
			};
			// responseData.warStatus.planetStatus[responseData.warStatus.planetStatus.length] = {
			const AQUILA_STATUS_ID = responseData.warStatus.planetStatus.push({
				// index: 267,
				index: responseData.warStatus.planetStatus.length,
				owner: 6,
				health: 2000000,
				// regenPerSecond: 5.54,
				regenPerSecond: 5.5555554 * 20,
				players: 3,
				position,
			});
			// responseData.warInfo.planetInfos[responseData.warInfo.planetInfos.length] = {
			const AQUILA_INFO_ID = responseData.warInfo.planetInfos.push({
				// index: 267,
				index: responseData.warInfo.planetInfos.length,
				settingsHash: 939299113,
				planetNameId32: 0,
				position,
				waypoints: [],
				sector: 0,
				maxHealth: 2000000,
				disabled: false,
				initialOwner: 6,
			});

			const ARGENTIS_STATUS_ID = responseData.warStatus.planetStatus.push({
				index: responseData.warStatus.planetStatus.length,
				owner: 6,
				health: 2000000,
				regenPerSecond: 2,
				players: 0,
				position: {
					x: position.x + 0.05,
					y: position.y + 0.04,
				},
			});

			const ARGENTIS_INFO_ID = responseData.warInfo.planetInfos.push({
				index: responseData.warInfo.planetInfos.length,
				settingsHash: 563995798,
				planetNameId32: 0,
				position: {
					x: position.x + 0.05,
					y: position.y + 0.04,
				},
				waypoints: [],
				sector: 0,
				maxHealth: 2000000,
				disabled: false,
				initialOwner: 6,
			});

			[
				{
					id: 999991,
					effectType: 20,
					valueTypes: [0, 0],
					values: [0, 0],
				},
				{
					id: 999992,
					effectType: 29,
					valueTypes: [0, 2],
					values: [0, 100],
				},
				{
					id: 999993,
					effectType: 33,
					valueTypes: [0, 2],
					values: [0, 100],
				},
				{
					id: 999994,
					effectType: 45,
					valueTypes: [16, 2],
					values: [3481751602, 0],
				},
				{
					id: 999994_002,
					effectType: 45,
					valueTypes: [16, 2],
					values: [3481751602, -100],
				},
				{
					id: 999994_003,
					effectType: 45,
					valueTypes: [16, 2],
					values: [3481751602, 100],
				},
				{
					id: 999995,
					effectType: 47,
					valueTypes: [0, 0],
					values: [0, 0],
				},
				{
					id: 999996,
					effectType: 48,
					valueTypes: [0, 0],
					values: [0, 0],
				},
				{
					id: 999997,
					effectType: 49,
					valueTypes: [0, 0],
					values: [0, 0],
				},
				{
					id: 999998,
					effectType: 51,
					valueTypes: [2, 2],
					values: [0, 0],
				},
				{
					id: 999998_002,
					effectType: 51,
					valueTypes: [2, 2],
					values: [-10, -10],
				},
				{
					id: 999998_003,
					effectType: 51,
					valueTypes: [2, 2],
					values: [10, 10],
				},
				{
					id: 999999,
					effectType: 52,
					valueTypes: [0, 0],
					values: [0, 0],
				},
				{
					id: 9999910,
					effectType: 54,
					valueTypes: [0, 0],
					values: [0, 0],
				},
				{
					id: 9999911,
					effectType: 55,
					valueTypes: [0, 0],
					values: [0, 0],
				},
				{
					id: 9999912,
					effectType: 59,
					valueTypes: [10, 2],
					values: [540020798, 100],
				},
				{
					id: 9999913,
					effectType: 60,
					valueTypes: [16, 1],
					values: [540020798, 29],
				},
				{
					id: 9999914,
					effectType: 67,
					valueTypes: [16, 2],
					values: [0, 100],
				},
				{
					id: 9999914_002,
					effectType: 67,
					valueTypes: [16, 2],
					values: [0, -100],
				},
				{
					id: 9999915,
					effectType: 68,
					valueTypes: [4, 1],
					values: [99, 50],
				},
				{
					id: 9999915_002,
					effectType: 68,
					valueTypes: [4, 1],
					values: [99, -50],
				},
				{
					id: 9999916,
					effectType: 70,
					valueTypes: [14, 0],
					values: [1, 0],
				},
				{
					id: 9999916_002,
					effectType: 70,
					valueTypes: [14, 0],
					values: [2, 0],
				},
				{
					id: 9999917,
					effectType: 75,
					valueTypes: [16, 15],
					values: [3721430753, 1],
				},
				{
					id: 9999917_002,
					effectType: 75,
					valueTypes: [16, 15],
					values: [3721430753, -1],
				},
				{
					id: 9999918,
					effectType: 78,
					valueTypes: [1, 1],
					values: [29, 69],
				},
				{
					id: 9999919,
					effectType: 81,
					valueTypes: [4, 1],
					// One True Flag
					values: [3722314010, 0],
				},
				{
					id: 9999920,
					effectType: 82,
					valueTypes: [4, 1],
					// Experimental Infusion
					values: [3912131454, 0],
				},
				// DOESN'T DISPLAY
				{
					id: 9999921,
					effectType: 83,
					valueTypes: [4, 0],
					// Vitality Enhancement
					values: [1110686504, 0],
				},
				{
					id: 9999922,
					effectType: 84,
					valueTypes: [16, 1],
					values: [0, 50],
				},
				{
					id: 9999923,
					effectType: 85,
					valueTypes: [16, 1],
					values: [1, 50],
				},
				{
					id: 9999923_002,
					effectType: 85,
					valueTypes: [16, 1],
					values: [-1, -50],
				},
				{
					id: 9999924,
					effectType: 86,
					valueTypes: [16, 1],
					values: [1, 50],
				},
				{
					id: 9999924_002,
					effectType: 86,
					valueTypes: [16, 1],
					values: [-1, -50],
				},
				{
					id: 9999925,
					effectType: 91,
					valueTypes: [16, 0],
					values: [2097152, 150],
				},
				{
					id: 9999925_002,
					effectType: 91,
					valueTypes: [16, 0],
					values: [32768, -150],
				},
				{
					id: 9999926,
					effectType: 93,
					valueTypes: [16, 15],
					values: [2838432079, 1],
				},
				{
					id: 9999926_002,
					effectType: 93,
					valueTypes: [16, 15],
					values: [-2838432079, 0],
				},
			].forEach(v => {
				responseData.galacticWarEffects.push(v);
				responseData.warStatus.planetActiveEffects.push({
					index: ARGENTIS_STATUS_ID - 1,
					galacticEffectId: v.id,
				});
			});

			responseData.warStatus.campaigns.push({
				id: 99999,
				planetIndex: AQUILA_STATUS_ID - 1,
				type: 0,
				count: 0,
				race: 5,
			});
			responseData.warStatus.campaigns.push({
				id: 999991,
				planetIndex: ARGENTIS_STATUS_ID - 1,
				type: 0,
				count: 0,
				race: 5,
			});

			return new Response(JSON.stringify(responseData));
		} else {
			return await origFetch(input, init);
		}
	};

	window.esmsInitOptions = {
		shimMode: true,
		nativePassthrough: false,
		source: async (url, fetchOpts, parent, defaultSourceHook) => {
			const mod = await defaultSourceHook(url, fetchOpts, parent);
			if (mod.type === "js" && typeof mod.source === "string") {
				mod.source = applyPatches(mod.source);
				mod.source = (mod.source as string).replace(/export\{([^}]+)\}/g, (match, inner: string) => {
					const names = inner.split(",").map((part: string) => part.split(/\s+as\s+/));
					return match + `\nMagicWord.exportCache["${url}"] = { ${names.map(v => `${v[1]}: ${v[0]}`).join(',')} }`;
				});
			}
			return mod;
		},
	};

	// @ts-expect-error es-module-shims is technically not a module
	await import("es-module-shims");
	await import("./lib/fetch");
	for (const script of document.querySelectorAll<HTMLScriptElement>("script:not([type])")) {
		const scriptShim = document.createElement("script");
		scriptShim.textContent = script.textContent.replaceAll("import(", "importShim(");

		for (const attr of script.attributes) scriptShim.setAttribute(attr.name, attr.value);
		script.replaceWith(scriptShim);
	}

	runPostHooks();
}

// Wait for one single "event cycle" so that `window.stop()` does not break Chromium. What the fuck.
setTimeout(init);
