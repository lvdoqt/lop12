//#region src/lib/random.ts
function uuidToSeed(uuid) {
	let hash = 0;
	for (let i = 0; i < uuid.length; i++) {
		const char = uuid.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}
	return hash;
}
function mulberry32(a) {
	return function() {
		var t = a += 1831565813;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function shuffleArrayWithPRNG(array, random) {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
//#endregion
export { shuffleArrayWithPRNG as n, uuidToSeed as r, mulberry32 as t };
