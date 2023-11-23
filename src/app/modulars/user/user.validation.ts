import z from 'zod'

const fullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

const addressValidationSchema = z.object({
  street: z.string().min(1).max(40),
  city: z.string().min(1).max(30),
  country: z.string().min(1).max(30),
})

const orderValidationSchema = z.object({
  productName: z.string(),
  quantity: z.number(),
  price: z.number(),
})

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(false),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema),
})
