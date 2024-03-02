export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  date: {
    invalidFormat: 'postDate must be a valid ISO8601 date',
  },
  nameCity: {
    invalid: 'City name must be Paris, Cologne, Brussele, Amsterdam, Hamburg, Dusseldorf'
  },
  previevImage: {
    notEmpty: 'Add a link to the image',
  },
  image: {
    arrayMinSizeAndMaxSize: 'Only six photos'
  },
  isPremium: {
    meaning: 'Meaning of boolean'
  },
  rating: {
    meaning: 'Number from 1 to 5. Numbers with a comma (1 decimal place) are allowed'
  },
  type: {
    invalid: 'type must be apartment, house, room, hotel',
  },
  bedrooms: {
    meaning: 'Number from 1 to 5. Number is an integer number'
  },
  maxAdalts: {
    meaning: 'Number from 1 to 10. Number is an integer number'
  },
  price: {
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  goods: {
    invalid: 'type must be Breakfast, Air conditioning, Laptop friendly workspece, Baby seat, Washer, Towels, Fridge',
    arrayMinSizeAndMaxSize: 'One or more options from the list'
  },
  dataHost: {
    invalidId: 'dataHost field must be valid id',
  }
} as const;
