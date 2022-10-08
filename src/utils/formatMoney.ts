export function formatMoney(money: number) {
  return `$${money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}
