export function formatMoney(money) {
  return `$${money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}
