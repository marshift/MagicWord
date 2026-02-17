export async function waitForExport(exportt: string) {
	let thing: any = null;

	while (!thing) {
		thing = MagicWord.common[exportt];
		await new Promise(res => requestAnimationFrame(res));
	}

	return thing;
}
