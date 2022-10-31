import { StaticImageData } from 'next/image'

export interface Contact {
  _id: string
  username: string
  email: string
  avatarImage: string | StaticImageData
}
export interface User {
  _id: string
  username: string
  password: string
  email: string
  isAvatarImageSet: boolean
  avatarImage: string | StaticImageData
}

export interface Login {
  email: string
  password: string
}

export interface FormInputs {
  username: string
  email: string
  password: string
  confirmPassword: string
}
export interface Avatar {
  randomImages: string
}
