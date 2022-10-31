import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Email format is not valid').required('Email is required'),

  password: yup.string().min(5, 'Password needs to be at least 5 characters long').required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
})
export const loginSchema = yup.object().shape({
  email: yup.string().email('Email format is not valid').required('Email is required'),
  password: yup.string().min(5, 'Password needs to be at least 5 characters long').required('Password is required'),
})
