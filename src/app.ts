import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modulars/user/user.route'
import errorMiddleware from './app/middleware/errorMiddleware'
const app: Application = express()

// parser
app.use(express.json())

// cors
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'A2Crud server is running' })
})

app.use('/api/users', userRouter)

// error handler
app.use(errorMiddleware)

export default app
