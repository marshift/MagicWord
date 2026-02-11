import extensions from "../ext";
import type { Replacer } from "./define";

export function contextify(replacer: Replacer, extName: string): Replacer {
	const self = `MagicWord.extensions["${extName}"]`;
	return typeof replacer === "function"
		? (...args) => replacer(...args).replaceAll("$self", self)
		: replacer.replaceAll("$self", self);
}

export function applyPatches(script: string) {
	for (let ext of extensions) {
		if (!ext.patches) continue;

		for (let patch of ext.patches) {
			script = script.replace(
				patch.find,
				contextify(patch.replace, ext.manifest.name) as string,
			);
		}
	}

	return script;
}

export function runPostHooks() {
	for (let ext of extensions) {
		if (!ext.post) continue;
		ext.post();
	}
}
