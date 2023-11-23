import mongoose from 'mongoose'
import {
  IAddress,
  IFullName,
  IOrder,
  IUser,
  IUserMethods,
  UserModel,
} from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

// full name schema
const fullNameSchema = new mongoose.Schema<IFullName>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
})

// address schema
const addressSchema = new mongoose.Schema<IAddress>({
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
})

// order schema
const orderSchema = new mongoose.Schema<IOrder>({
  price: { type: Number, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
})

// user schema
const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: [String],
  address: {
    type: addressSchema,
    required: true,
  },
  orders: orderSchema,
})

// instance methods for check user existence
userSchema.methods.isUserExist = async function (userName: string) {
  return await User.findOne({ userName })
}

// password hashed
userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    config.salt_round as string,
  )
  this.password = hashedPassword
  next()
})

const User = mongoose.model<IUser, UserModel>('User', userSchema)

export default User
