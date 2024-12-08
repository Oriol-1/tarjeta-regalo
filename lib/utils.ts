import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function calculateRemainingBalance(
  initialBalance: number,
  selectedCards: Record<string, Record<number, number>>
): number {
  const totalSpent = Object.entries(selectedCards).reduce((total, [_, cardValues]) => {
    return total + Object.entries(cardValues).reduce((sum, [value, quantity]) => {
      const numericValue = Number(value);
      const numericQuantity = Number(quantity);
      if (isNaN(numericValue) || isNaN(numericQuantity)) {
        return sum;
      }
      return sum + numericValue * numericQuantity;
    }, 0);
  }, 0);

  return initialBalance - totalSpent; // Permitir que el saldo se vuelva negativo
}