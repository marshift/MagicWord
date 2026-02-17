export async function waitForExport(key: string) {
	while (true) {
		if (key in MagicWord.common) {
			return MagicWord.common[key];
		}
		await new Promise(res => requestAnimationFrame(res));
	}
}
