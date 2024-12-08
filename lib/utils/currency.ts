export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(amount);
}

export function calculateTotal(value: number, quantity: number): number {
  return Math.max(0, value * quantity); // Asegurarse de que no sea negativo
}

export function calculateRemainingBalance(
  currentBalance: number,
  totalCost: number
): number {
  return Math.max(0, currentBalance - totalCost); // Garantizar que no sea menor a 0
}
