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

	window.esmsInitOptions = {
		shimMode: true,
		nativePassthrough: false,
		source: async (url, fetchOpts, parent, defaultSourceHook) => {
			const mod = await defaultSourceHook(url, fetchOpts, parent);
			if (mod.type === "js" && typeof mod.source === "string") {
				mod.source = applyPatches(mod.source);
				mod.source = (mod.source as string).replace(/export\{([^}]+)\};/g, (match, inner) => {
					const names = inner.split(",").map((part: string) => part.split(/\s+as\s+/)[0].trim());
					return match + `\nMagicWord.exportCache["${url}"] = { ${names.join(", ")} }`;
				});
			}
			return mod;
		},
	};

	// @ts-expect-error es-module-shims is technically not a module
	await import("es-module-shims");
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
