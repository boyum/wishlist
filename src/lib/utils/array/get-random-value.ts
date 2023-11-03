export function getRandomValue<T>(array: readonly T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}
