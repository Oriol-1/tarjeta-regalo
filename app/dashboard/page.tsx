"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Gift, ArrowRight } from "lucide-react";
import { BalanceDisplay } from "@/components/BalanceDisplay";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { formatCurrency, calculateRemainingBalance } from "@/lib/utils/currency";
import { CardSelector } from "@/components/CardSelector";

interface SelectedCards {
  [cardId: string]: {
    [value: number]: number;
  };
}

export default function Dashboard() {
  const router = useRouter();
  const user = useStore((state) => state.user);

  const initialBalance = user?.initialBalance ?? 0;
  const [selectedCards, setSelectedCards] = useState<SelectedCards>({});
  const [currentBalance, setCurrentBalance] = useState<number>(initialBalance);

  // Function to calculate the total amount selected
  const getTotalSelected = useCallback((): number => {
    return Object.entries(selectedCards).reduce((total, [, values]) => {
      return total + Object.entries(values).reduce((sum, [value, quantity]) => {
        return sum + Number(value) * quantity;
      }, 0);
    }, 0);
  }, [selectedCards]);

  // Effect to update the current balance
  useEffect(() => {
    const totalSelected = getTotalSelected();
    setCurrentBalance(calculateRemainingBalance(initialBalance, totalSelected));
  }, [getTotalSelected, initialBalance]);

  // Function to handle card selection
  const handleCardSelection = (cardId: string, value: number, quantity: number): void => {
    setSelectedCards((prev) => {
      const updated = { ...prev };
      if (quantity === 0) {
        delete updated[cardId]?.[value];
        if (!Object.keys(updated[cardId] ?? {}).length) delete updated[cardId];
      } else {
        updated[cardId] = { ...updated[cardId], [value]: quantity };
      }
      return updated;
    });
  };

  // Redirect to login if the user is not logged in
  if (!user) return <p>Redirigiendo...</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Wallet className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Tu panel de control de tarjetas de regalo</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Hola, {user?.name || "Invitado"}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <BalanceDisplay balance={currentBalance} initialBalance={initialBalance} />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Gift className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Tarjetas disponibles</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardSelector
                onSelect={handleCardSelection}
                balance={currentBalance}
                selectedCards={selectedCards}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Tarjetas seleccionadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(selectedCards).map(([cardId, values]) =>
                  Object.entries(values).map(([value, quantity]) => (
                    <div key={`${cardId}-${value}`} className="flex justify-between items-center">
                      <span>
                        {cardId} - {formatCurrency(Number(value))} × {quantity}
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(Number(value) * quantity)}
                      </span>
                    </div>
                  ))
                )}
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total seleccionado:</span>
                    <span className="font-bold">{formatCurrency(getTotalSelected())}</span>
                  </div>
                  <Button className="w-full" disabled={currentBalance === 0}>
                    Pasar por la caja
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
