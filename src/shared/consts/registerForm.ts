type field = {
  name:
    | 'name'
    | 'email'
    | 'password'
    | 'repeatPassword'
  type: string
  defaultValue: string
  helpText: string
  validation: any
}

export const registerFields: field[] = [
  {
    name: 'name',
    type: 'text',
    defaultValue: '',
    helpText: 'First name',
    validation: {
      required: 'This field is required',
      maxLength: {
        value: 40,
        message: 'Too long name.',
      },
    },
  },
  {
    name: 'email',
    type: 'text',
    defaultValue: '',
    helpText: 'Email',
    validation: {
      required: 'This field is required',
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Please enter correct email',
      },
    },
  },
  {
    name: 'password',
    type: 'password',
    defaultValue: '',
    helpText: 'Password',
    validation: {
      required: 'This field is required',
      maxLength: {
        value: 20,
        message: 'Too long password.',
      },
    },
  },
  {
    name: 'repeatPassword',
    type: 'password',
    defaultValue: '',
    helpText: 'Repeat password',
    validation: {
      required: 'This field is required',
    },
  },
]
