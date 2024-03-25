export enum ComfortList {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export const Comforts: Record<string, ComfortList> = {
  Breakfast: ComfortList.Breakfast,
  'Air conditioning': ComfortList.AirConditioning,
  'Laptop friendly workspace': ComfortList.LaptopFriendlyWorkspace,
  'Baby seat': ComfortList.BabySeat,
  Washer: ComfortList.Washer,
  Towels: ComfortList.Towels,
  Fridge: ComfortList.Fridge
} as const;
