export async function getDayInput(day: number): Promise<string> {
  const inputPath = new URL(`../assets/day${day}.txt`, import.meta.url);
  const file = Bun.file(inputPath);
  return await file.text();
}