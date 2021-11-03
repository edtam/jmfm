export function toPercent(num) {
  num = num || 0
  num = Math.max(num, 0)
  num = Math.min(num, 1)
  return `${num * 100}%`
}

export function secondToTime(num) {
  const minutes = Math.floor(num / 60)
  const seconds = Math.floor(num % 60)
  const padNum = (n) => String(n).padStart(2, '0')
  return [minutes, seconds].map(padNum).join(':')
}
