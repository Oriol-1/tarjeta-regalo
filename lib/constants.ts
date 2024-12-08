export const AVAILABLE_CARDS = [
  {
    id: 'adidas',
    name: 'Adidas Gift Card',
    brand: 'Adidas',
    logo: '/brands/adidas.svg',
    availableValues: [10, 20, 50]
  },
  {
    id: 'airbnb',
    name: 'Airbnb Gift Card',
    brand: 'Airbnb',
    logo: '/brands/airbnb.svg',
    availableValues: [10, 20, 50]
  },
  {
    id: 'apple',
    name: 'Apple Gift Card',
    brand: 'APPLE España',
    logo: '/brands/apple.svg',
    availableValues: [10, 20, 50]
  },
  // Add more cards here...
] as const;

export const MOCK_USERS = [
  {
    name: 'Juan Pérez',
    nif: '12345678A',
    email: 'juan.perez@example.com',
    balance: 1000,
    initialBalance: 1000
  },
  {
    name: 'María García',
    nif: '87654321B',
    email: 'maria.garcia@example.com',
    balance: 1500,
    initialBalance: 1500
  },
  // Add more users here...
] as const;