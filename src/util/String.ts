// Function to calculate the similarity between two strings
export const getSimilarity = (a: string, b: string): number => {
	const setA = new Set(a.toLowerCase());
	const setB = new Set(b.toLowerCase());
	const intersection = Array.from(setA).filter((x) => setB.has(x));
	return intersection.length / Math.max(setA.size, setB.size);
};
