export const CreateCommentValidationMessage = {
  text: {
    minLength: 'Minimum comment text length must be 5',
    maxLength: 'Maximum comment text length must be 1024',
  },
  rating: {
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  }
} as const;
