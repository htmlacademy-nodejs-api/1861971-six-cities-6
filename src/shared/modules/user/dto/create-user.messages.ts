export const CreateUserMessages = {
  name: {
    invalidFormat: 'name is required',
    lengthField: 'min length is 1, max is 15'
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatarUrl: {
    invalidFormat: 'avatarUrl is string path',
  },
  isPro: {
    invalid: 'isPro must be обычный or pro'
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
} as const;
