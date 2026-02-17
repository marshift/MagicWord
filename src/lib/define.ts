export type Replacer = string | ((substring: string, ...args: any[]) => string);

export interface Patch {
	find: RegExp | string;
	replace: Replacer;
}

export interface Export {
	name: string;
	find: RegExp;
}

export interface Extension {
	patches?: Patch[];
	exports?: Export[];
	post?: () => void;
	manifest: {
		name: string;
		description: string;
		authors: string[];
	};
	core?: boolean;
}

export const defineExtension = <T extends Extension>(ext: T) => {
	if (ext.exports) {
		for (const exxport of ext.exports) {
			if (!ext.patches) ext.patches = [];
			ext.patches.unshift({
				find: exxport.find,
				replace: (_, orig) => `const ${orig}=MagicWord.common['${exxport.name}']=`,
			});
		}
	}

	return ext;
};
