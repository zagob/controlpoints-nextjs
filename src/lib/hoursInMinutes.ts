export function timeToMinutes(time: string) {
  const [hour, minutes] = time.split(":");

  return Number(hour) * 60 + Number(minutes);
}
