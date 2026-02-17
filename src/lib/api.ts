import extensions from "../ext";
import findApi from "./find";

export const getApi = () => ({
	extensions: Object.fromEntries(extensions.map((ext) => [ext.manifest.name, ext])),
	common: {} as Record<string, any>,

	...findApi,
});

export type MagicWordAPI = ReturnType<typeof getApi>;
