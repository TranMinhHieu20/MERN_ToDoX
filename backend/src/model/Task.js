import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'complete'],
      default: 'active'
    },
    completeAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true // createdAt , updatedAt tự động thêm vào
  }
)

const Task = mongoose.model('Task', taskSchema)
export default Task
