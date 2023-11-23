/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err)
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  res.status(errorStatus).send(errorMessage)
}

export default errorMiddleware
