export type Replacer = string | ((substring: string, ...args: any[]) => string);

export interface Patch {
	find: RegExp | string;
	replace: Replacer;
}

export interface Extension {
	patches?: Patch[];
	post?: () => void;
	manifest: {
		name: string;
		description: string;
		authors: string[];
	};
	core?: boolean;
}

export const defineExtension = <T extends Extension>(ext: T) => ext;
