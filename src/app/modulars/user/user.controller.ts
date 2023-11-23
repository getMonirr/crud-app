import { IUser } from './user.interface'
import { Request, Response } from 'express'
import {
  partialUserValidationSchema,
  userValidationSchema,
} from './user.validation'
import { userServices } from './user.service'

//* *********
// create a new user
//********* */
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body

    const validatedData = userValidationSchema.parse(userData)

    const result = await userServices.createUser(validatedData)

    if (!result) {
      return res.status(500).json({
        success: false,
        message: 'User creation failed',
        data: result,
      })
    }

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}

//* *********
// get All users
//********* */
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsers()

    if (!users || users?.length <= 0) {
      return res.status(500).json({
        success: false,
        message: 'No users found',
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      message: 'User found successfully',
      data: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong to found users',
      data: null,
    })
  }
}

//* *********
// create a user
//********* */
const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userServices.getUser(Number(req.params.userId))

    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      message: 'User found successfully',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong to found user',
      data: null,
    })
  }
}

//* *********
// update a new user
//********* */
const updateUser = async (req: Request, res: Response) => {
  try {
    const userData: Partial<IUser> = req.body

    const validatedData: Partial<IUser> =
      partialUserValidationSchema.parse(userData)

    const updatedResult = await userServices.updateUser(
      Number(req.params.userId),
      validatedData,
    )

    if (!updatedResult) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      message: 'User update successfully',
      data: updatedResult,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong to update user information',
      data: error,
    })
  }
}

//* *********
// delete a new user
//********* */
const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedResult = await userServices.deleteUser(
      Number(req.params.userId),
    )

    if (!deletedResult) {
      return res.status(500).json({
        success: false,
        message: 'User not deleted or not found',
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      message: 'User delete successfully',
      data: null,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong to delete a user',
      data: error,
    })
  }
}

// ----------------------------------------products-----------------------------------

//* *********
// add product into the order list
//********* */
const addOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    const addedResult = await userServices.addOrder(
      Number(req.params.userId),
      orderData,
    )

    if (!addedResult) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Orders add successfully',
      data: addedResult,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong to add orders',
      data: error,
    })
  }
}

//* *********
// get All orders for specified user
//********* */
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orderResponse = await userServices.getAllOrders(
      Number(req.params.userId),
    )
    const orders = orderResponse?.orders || []

    if (!orders || orders.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'User does not have any orders',
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Orders get successfully',
      data: orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong to get orders',
      data: error,
    })
  }
}

//* *********
// calculate the total price
//********* */
const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const price = await userServices.calculateTotalPrice(
      Number(req.params.userId),
    )

    if (!price) {
      return res.status(500).json({
        success: false,
        message: 'User does not have any orders to calculate the total price',
        data: null,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: price,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong to calculate the price',
      data: error,
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  addOrder,
  getAllOrders,
  calculateTotalPrice,
}
