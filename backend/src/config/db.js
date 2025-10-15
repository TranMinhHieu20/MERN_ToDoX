import mongoose from 'mongoose'

// connect MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    console.log('Connect DB successfully!')
  } catch (error) {
    console.log('Connect DB fail!: ', error)
    process.exit(1) // exit with error
  }
}
