export function minutesToTime(minutes: number) {
  const hours = Math.round(minutes / 60);
  const min = minutes % 60;

  return `${hours}:${min.toString().padStart(2, "0")}`;
}
