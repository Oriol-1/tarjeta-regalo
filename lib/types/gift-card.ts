export interface GiftCard {
  id: string;
  name: string;
  brand: string;
  logo: string;
  availableValues: number[];
}

export interface CartItem {
  cardId: string;
  brand: string;
  value: number;
  quantity: number;
}

export interface Transaction {
  id: string;
  userId: string;
  cardId: string;
  amount: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'refunded';
}