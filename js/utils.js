function getFullName(codes, code) {
  const [, name] = codes.find((item) => item.includes(code));
  return name;
}

function formatCurrency(code, amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export { getFullName, formatCurrency, formatDate };
