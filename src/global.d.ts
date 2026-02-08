import "es-module-shims";
import type { MagicWordAPI } from "./lib/api";

declare global {
	// String-replaced by bundler, not actually on global scope
	var __ES_MODULE_SHIMS_VERSION: string;

	var MagicWord: MagicWordAPI;
}
