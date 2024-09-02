export function convertRemToPixels(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export function getGridRowHeight(rem: number, width: number) {
  let pixels = 0

  if (width > 768) {
    pixels = convertRemToPixels(rem)
  } else {
    pixels = convertRemToPixels(rem - 1)
  }

  return pixels
}
