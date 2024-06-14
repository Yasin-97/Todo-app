export function formatEstimation(estimation) {
  const hours = estimation / 60;
  return hours % 1 === 0 ? hours.toString() : hours.toFixed(1);
}
