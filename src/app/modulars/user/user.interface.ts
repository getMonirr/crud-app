import { Model } from 'mongoose'

export interface IFullName {
  firstName: string
  lastName: string
}

export interface IAddress {
  street: string
  city: string
  country: string
}

export interface IOrder {
  productName: string
  price: number
  quantity: number
}

export interface IUser {
  userId: number
  username: string
  password: string
  fullName: IFullName
  age: number
  email: string
  isActive: boolean
  hobbies: Array<string>
  address: IAddress
  orders: Array<IOrder>
}

// instance methods interface
export interface IUserMethods {
  // eslint-disable-next-line no-unused-vars
  isUserExist(userName: string): Promise<IUser | null>
}

// user model
export type UserModel = Model<IUser, Record<string, never>, IUserMethods>
