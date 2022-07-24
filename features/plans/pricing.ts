export function getHourlyPrice(monthlyPrice: number) {
  return Number(Number(monthlyPrice / 730).toFixed(3))
}
