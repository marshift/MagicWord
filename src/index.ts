import { getApi } from "./lib/api";
import { applyPatches, runPostHooks } from "./lib/patcher";

async function init() {
	// stophack alternative that doesn't break Chromium
	const observer = new MutationObserver((mutations) => {
		for (const mut of mutations) {
			for (const node of mut.addedNodes) {
				mut.target.removeChild(node);
			}
		}
	});
	observer.observe(document, { childList: true, subtree: true });
	await new Promise((resolve) => window.addEventListener('load', resolve));
	observer.disconnect();

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

		// Patch non-ESM scripts that have a src attribute
		if (scriptShim.hasAttribute('src')) {
			const text = await fetch(scriptShim.src).then(res => res.text());
			scriptShim.textContent = applyPatches(text);
			scriptShim.removeAttribute('src');
		}

		script.replaceWith(scriptShim);
	}

	runPostHooks();
}

init();
