/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from 'mongoose'

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
  password?: string
  fullName: IFullName
  age: number
  email: string
  isActive: boolean
  hobbies: Array<string>
  address: IAddress
  orders?: Array<IOrder>
}

// instance methods interface
export interface IUserMethods {
  isUserExists(userName: string): Promise<IUser | null>
}

// user model
// export type UserModel = Model<IUser, Record<string, never>, IUserMethods>

export interface UserModel
  extends Model<IUser, Record<string, never>, IUserMethods> {
  createIsUserExists(
    userId: number,
  ): Promise<HydratedDocument<IUser, IUserMethods>>
}
