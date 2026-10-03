import { getApi } from "./lib/api";
import { applyPatches, runPostHooks } from "./lib/patcher";

async function init() {
	// Remove the <body> and <head> elements before elements like <script>s get a chance to be evaluated
	const insertedNodes: Set<Node> = new Set();
	const observer = new MutationObserver((mutations) => {
		for (const mut of mutations) {
			for (const node of mut.addedNodes) {
				// Certain extensions, like Stylus, repeatedly re-add their own elements when they're removed, so this skips deleting things if they've already been deleted
				if (insertedNodes.has(node)) continue;

				insertedNodes.add(node);
				mut.target.removeChild(node);
			}
		}
	});
	observer.observe(document.documentElement, { childList: true });
	// Once the load event fires, we know no other elements from the initial page load are going to be added
	await new Promise((resolve) => window.addEventListener('load', resolve));
	observer.disconnect();

	window.MagicWord = getApi();
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

	// Patch scripts unhandled by es-module-shims
	for (const script of insertedNodes.values()
		.filter(e => e instanceof Element)
		.flatMap(e => e.querySelectorAll<HTMLScriptElement>("script:not([type])"))
	) {
		if (script.hasAttribute('src')) {
			try {
				// Replacing `src` with an object URL seems to cause issues, so we inline the script instead
				const text = await fetch(script.src).then(res => res.text());
				script.textContent = applyPatches(text);
				script.removeAttribute('src');
			} catch (e) {
				console.error(e);
			}
		}

		script.textContent = script.textContent.replaceAll("import(", "importShim(");
	}

	// es-module-shims expects document.head to be defined, so we temporarily add it but with its items removed
	const head = insertedNodes.values().find(e => e instanceof HTMLHeadElement);
	let headChildren: ChildNode[] | undefined = undefined;
	if (head) {
		headChildren = Array.from(head.childNodes);
		head.replaceChildren();
		document.documentElement.prepend(head);
	}

	// @ts-expect-error es-module-shims is technically not a module
	await import("es-module-shims");
	await import("./lib/fetch");

	if (head) {
		head.remove();
		head.replaceChildren(...headChildren!);
	}
	document.documentElement.replaceChildren(...Array.from(insertedNodes));

	runPostHooks();
}

init();
