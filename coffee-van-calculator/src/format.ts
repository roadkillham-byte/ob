// All currency values pass through Math.round or toFixed(2) here before display —
// never render raw float output from the calculation engine.

export function formatCurrency(value: number): string {
  const rounded = Math.round(value);
  return rounded < 0
    ? `-$${Math.abs(rounded).toLocaleString("en-AU")}`
    : `$${rounded.toLocaleString("en-AU")}`;
}

export function formatCurrencyCents(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatCups(value: number | null): string {
  if (value === null) return "Not achievable";
  return `${value.toLocaleString("en-AU")} cups/day`;
}
