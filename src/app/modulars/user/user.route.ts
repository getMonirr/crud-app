import express from 'express'
import { userController } from './user.controller'

const userRouter = express.Router()

// user routes
userRouter.post('/', userController.createUser)
userRouter.get('/', userController.getAllUsers)
userRouter.get('/:userId', userController.getUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)

// orders
userRouter.put('/:userId/orders', userController.addProductInOrder)
userRouter.get('/:userId/orders', userController.getAllOrders)
userRouter.get(
  '/:userId/orders/total-price',
  userController.calculateTotalPrice,
)

export default userRouter
