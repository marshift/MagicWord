import type { Extension } from "../lib/define";
import braille from "./braille";
import dev from "./dev";
import tags from "./tags";

const extensions = [
	braille,
	dev,
	tags,
] as Extension[];

export default extensions.filter(e => e.domains.includes(location.hostname));
