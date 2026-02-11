import extensions from "../ext";
import findApi from "./find";

export const getApi = () => ({
	extensions: Object.fromEntries(extensions.map((ext) => [ext.manifest.name, ext])),

	...findApi,
});

export type MagicWordAPI = ReturnType<typeof getApi>;
