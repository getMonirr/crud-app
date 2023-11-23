import { NextFunction, Request, Response } from 'express'

//* *********
// create a new user
//********* */
const createUser = async (req: Request, res: Response, next: NextFunction) => {}

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
