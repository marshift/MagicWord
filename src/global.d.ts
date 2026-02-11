import "es-module-shims";
import type { MagicWordAPI } from "./lib/api";

declare global {
	var MagicWord: MagicWordAPI;
}
