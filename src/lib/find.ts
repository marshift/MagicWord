type Matches = (string | RegExp)[];

function match(value: any, checks: Matches): boolean {
	const str: string = value.toString();
	return checks.every(check => (
		typeof check === "string"
			? str.includes(check)
			: check.test(str)
	));
}

function getEntries() {
	return Object.values(MagicWord.exportCache)
		.flatMap(Object.values)
		.filter(e => e !== undefined && e !== null);
}

const findApi = {
	// Modules have code injected into them to add their exports to this cache
	// NOTE: I am not sure if this works properly in every case
	exportCache: {} as Record<string, Record<string, any>>,

	findByCode(...matches: Matches): any[] {
		return getEntries().filter(e => match(e, matches));
	},
	findByObjectKeys(...matches: Matches): any[] {
		return getEntries().filter(e => Object.keys(e).some(key => match(key, matches)));
	},
	findByObjectValues(...matches: Matches): any[] {
		return getEntries().filter(e => Object.values(e).some(key => match(key, matches)));
	},
	findByArrayValues(...matches: Matches): any[] {
		return getEntries().filter(e => Array.isArray(e) && e.some(v => match(v, matches)));
	},
};

export default findApi;
