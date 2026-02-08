import "./meta.js?userscript-metadata";
import { getApi } from "./lib/api";
import { applyPatches } from "./lib/patcher";

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
			if (mod.type === "js" && typeof mod.source === "string") mod.source = applyPatches(mod.source);
			return mod;
		},
	};

	await import(`https://esm.sh/es-module-shims@${__ES_MODULE_SHIMS_VERSION}`);
	for (const script of document.querySelectorAll<HTMLScriptElement>("script:not([type])")) {
		const scriptShim = document.createElement("script");
		scriptShim.textContent = script.textContent.replaceAll("import(", "importShim(");

		for (const attr of script.attributes) scriptShim.setAttribute(attr.name, attr.value);
		script.replaceWith(scriptShim);
	}
}

// Wait for one single "event cycle" so that `window.stop()` does not break Chromium. What the fuck.
setTimeout(init);
