import extensions from "../ext";

export const getApi = () => ({
	extensions: Object.fromEntries(extensions.map((ext) => [ext.manifest.name, ext])),
});

export type MagicWordAPI = ReturnType<typeof getApi>;
