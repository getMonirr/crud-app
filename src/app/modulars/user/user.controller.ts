import { NextFunction, Request, Response } from 'express'
import { userValidationSchema } from './user.validation'
import { userServices } from './user.service'

//* *********
// create a new user
//********* */
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body

    const validatedData = userValidationSchema.parse(userData)
    console.log(validatedData)

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
const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {}

//* *********
// create a user
//********* */
const getUser = async (req: Request, res: Response, next: NextFunction) => {}

//* *********
// update a new user
//********* */
const updateUser = async (req: Request, res: Response, next: NextFunction) => {}

//* *********
// delete a new user
//********* */
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {}

// ----------------------------------------products-----------------------------------

//* *********
// add product into the order list
//********* */
const addOrder = async (req: Request, res: Response, next: NextFunction) => {}

//* *********
// get All orders for specified user
//********* */
const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {}

//* *********
// calculate the total price
//********* */
const calculateTotalPrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {}

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
