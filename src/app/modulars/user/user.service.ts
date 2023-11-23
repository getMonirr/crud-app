import { IOrder, IUser } from './user.interface'
import User from './user.model'

// create a new user into the database
const createUser = async (userData: IUser) => {
  const newUser = new User(userData)
  const isUserExist = await newUser.isUserExist(userData.username)

  if (isUserExist) {
    throw new Error(`User ${userData.username} already exists`)
  }

  return await newUser.save()
}
const getAllUsers = async () => {}
const getUser = async (userId: string) => {}
const updateUser = async (userId: string, updateData: IUser) => {}
const deleteUser = async (userId: string) => {}

// products

const addOrder = async (userId: string, order: IOrder) => {}
const getAllOrders = async (userId: string) => {}
const calculateTotalPrice = async (userId: string) => {}

export const userServices = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  addOrder,
  getAllOrders,
  calculateTotalPrice,
}
