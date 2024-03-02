export enum ComfortList {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspece = 'Laptop friendly workspece',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export const Comforts: Record<string, ComfortList> = {
  Breakfast: ComfortList.Breakfast,
  'Air conditioning': ComfortList.AirConditioning,
  'Laptop friendly workspece': ComfortList.LaptopFriendlyWorkspece,
  'Baby seat': ComfortList.BabySeat,
  Washer: ComfortList.Washer,
  Towels: ComfortList.Towels,
  Fridge: ComfortList.Fridge
} as const;
