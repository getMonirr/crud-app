import { IOrder, IUser } from './user.interface'
import User from './user.model'

// create a new user into the database
const createUser = async (userData: IUser): Promise<IUser> => {
  const newUser = new User(userData)
  const isUserExist = await newUser.isUserExists(userData.username)

  if (isUserExist) {
    throw new Error(`User ${userData.username} already exists`)
  }

  return await newUser.save()
}

// get all users from the database
const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find()
}

// get a user from the database
const getUser = async (userId: number): Promise<IUser | null> => {
  return await User.findOne({ userId })
}

// update a user
const updateUser = async (
  userId: number,
  updateData: Partial<IUser>,
): Promise<IUser | null> => {
  return await User.findOneAndUpdate({ userId }, updateData, { new: true })
}

// delete a user from the database
const deleteUser = async (userId: number): Promise<IUser | null> => {
  return await User.findOneAndDelete({ userId })
}

// products
const addOrder = async (
  userId: number,
  orderData: IOrder[] | IOrder,
): Promise<IUser | null> => {
  return await User.findOneAndUpdate(
    { userId },
    { $addToSet: { orders: { $each: [orderData] } } },
    { new: true },
  )
}

// get all orders
const getAllOrders = async (
  userId: number,
): Promise<{ orders: IOrder[] } | null> => {
  const result = await User.findOne({ userId }).select({ orders: 1, _id: 0 })
  const orders = result?.orders || []

  return { orders }
}

// calculate total price
const calculateTotalPrice = async (userId: number): Promise<number> => {
  const isUserExist = await User.createIsUserExists(userId)

  if (!isUserExist) {
    // TODO: think about the response for user does not exist
    return 0
  }
  const calculateResult = await User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$orders.price' },
      },
    },
  ])

  if (calculateResult.length > 0) return calculateResult[0].totalPrice
  else return 0
}

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
