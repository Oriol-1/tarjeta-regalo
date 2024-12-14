"use client";


import { Progress } from "@/components/ui/progress";

interface BalanceDisplayProps {
  balance: number; // Asegúrate de que esto sea requerido
  initialBalance: number; // Asegúrate de que esto sea requerido
}

export function BalanceDisplay({ balance, initialBalance }: BalanceDisplayProps) {
  // Redondear balance para evitar errores de punto flotante
  const roundedBalance = Math.max(Number(balance.toFixed(2)), 0);
  const percentage = initialBalance > 0 ? (roundedBalance / initialBalance) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-muted-foreground">Balance Display</p>
          <p className="text-3xl font-bold">€{roundedBalance.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Initial Balance</p>
          <p className="text-xl">€{initialBalance.toFixed(2)}</p>
        </div>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
