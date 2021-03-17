function formatCurrency(price, currency) {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency,
  }).format(price);
}

export default formatCurrency;
