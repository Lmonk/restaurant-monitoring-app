export function getBusyColor(percentage: number): string {
  if (percentage >= 75) return 'red'
  if (percentage >= 50) return 'orange'
  if (percentage > 0) return 'green'
  return 'gray'
}
