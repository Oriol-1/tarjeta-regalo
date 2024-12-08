/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AVAILABLE_CARDS } from "@/lib/constants/cards";
import { formatCurrency } from "@/lib/utils/currency";
import { useState } from "react";

interface CardSelectorProps {
  onSelect: (cardId: string, value: number, quantity: number) => void;
  balance: number; // Saldo inicial
  selectedCards: Record<string, Record<number, number>>;
}

export function CardSelector({ onSelect, balance, selectedCards }: CardSelectorProps) {
  const [currentBalance, setBalance] = useState(balance);

  // Cálculo del total gastado basado en las tarjetas seleccionadas
  const calculateTotalSelected = (): number => {
    return Object.entries(selectedCards).reduce((total, [_, values]) => {
      return total + Object.entries(values).reduce((sum, [val, qty]) => {
        const numericValue = Number(val);
        const numericQuantity = Number(qty);
        return sum + numericValue * numericQuantity;
      }, 0);
    }, 0);
  };

  // Cálculo del saldo restante
  const remainingBalance = currentBalance - calculateTotalSelected();

  // Controlar cambios en la cantidad de tarjetas seleccionadas
  const handleQuantityChange = (cardId: string, value: number, change: number) => {
    const currentQuantity = selectedCards[cardId]?.[value] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);

    // Calcular el nuevo total gastado si se aplica este cambio
    const newTotal = calculateTotalSelected() - currentQuantity * value + newQuantity * value;

    // Validar que el nuevo total no exceda el saldo
    if (newTotal > currentBalance) return;

    // Actualizar la selección si es válida
    onSelect(cardId, value, newQuantity);
  };

  const handleSubtract = (amount: number) => {
    // Suponiendo que `balance` es el estado que almacena el saldo disponible
    setBalance(currentBalance - amount); // Asegúrate de restar solo una vez el valor de `amount`
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-bold">
        Total Gastado: {formatCurrency(calculateTotalSelected())}
      </div>
      <div className="text-lg font-bold">
        Saldo Disponible: {formatCurrency(Math.max(remainingBalance, 0))}
      </div>
      {AVAILABLE_CARDS.map((card) => (
        <Card key={card.id} className="p-4">
          <CardContent className="p-0">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3 text-clip font-bold">
                <img src={card.logo} alt={`${card.name} logo`} className="inline-block h-12 w-13 mr-2" />
                {card.name}
              </div>
              {card.availableValues.map((value) => {
                const currentQuantity = selectedCards[card.id]?.[value] || 0;
                return (
                  <div
                    key={`${card.id}-${value}`}
                    className="flex flex-col items-center p-2 border rounded-lg"
                  >
                    <span className="font-semibold">{formatCurrency(value)}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(card.id, value, -1)}
                        disabled={currentQuantity === 0}
                      >
                        -
                      </Button>
                      <span>{currentQuantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(card.id, value, 1)}
                        disabled={remainingBalance < value} // No permitir si el saldo restante es menor que el valor
                      >
                        +
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
