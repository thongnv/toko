export const currencyFormat = (value: number) =>
  new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(value);
