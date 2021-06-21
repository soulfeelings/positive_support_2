export const commonkeyboard = [
  [
    {
      text: 'Да',
      callback_data: JSON.stringify({ type: 'common', answer: 'yes' }),
    },
  ],
  [
    {
      text: 'Нет',
      callback_data: JSON.stringify({ type: 'common', answer: 'no' }),
    },
  ],
]
