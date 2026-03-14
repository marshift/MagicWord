import type { Extension } from "../lib/define";
import braille from "./braille";
import customEffects from "./customEffects";
import dev from "./dev";
import tags from "./tags";

export default [
	braille,
	customEffects,
	dev,
	tags,
] as Extension[];
