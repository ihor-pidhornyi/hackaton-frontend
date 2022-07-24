type field = {
  name: 'radius'
  type: string
  defaultValue: string
  helpText: string
  validation: any
}

export const createTreeFormFields: field[] = [
  {
    name: 'radius',
    type: 'text',
    defaultValue: '',
    helpText: 'Радіус дерева (в метрах)',
    validation: {
      required: 'This field is required',
      pattern: {
        value: /^\d+$/,
        message: 'Please type only numbers',
      },
    },
  },
]
