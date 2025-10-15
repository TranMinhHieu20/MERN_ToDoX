import Task from '../model/Task.js'

// GET
export const getAllTasks = async (req, res) => {
  try {
    // const tasks = await Task.find().sort({ createdAt: -1 })
    // const activeCount = await Task.countDocuments({ status: 'active' })
    // const deleteCount = await Task.countDocuments({ status: 'delete' })
    const { filter = 'today' } = req.query
    const now = new Date()
    let startDate
    switch (filter) {
      case 'today': {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      }
      case 'week': {
        const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0)
        startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate)
        break
      }
      case 'month': {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      }
      case 'all':
      default: {
        startDate = null
      }
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {}

    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completeCount: [{ $match: { status: 'complete' } }, { $count: 'count' }]
        }
      }
    ])

    const tasks = result[0].tasks
    const active = result[0].activeCount[0]?.count || 0
    const complete = result[0].completeCount[0]?.count || 0
    res.status(200).send({ tasks, active, complete })
  } catch (error) {
    console.log('Lỗi khi gọi getAllTasks: ', error)
    res.status(500).json({ message: 'Lỗi hệ thống!' })
  }
}
// CREATE
export const createTasks = async (req, res) => {
  try {
    const { title } = req.body
    const task = new Task({ title })
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (error) {
    console.log('Lỗi khi gọi createTasks: ', error)
    res.status(500).json({ message: 'Lỗi hệ thống!' })
  }
}
// UPDATE
export const updateTasks = async (req, res) => {
  try {
    const { title, status, completeAt } = req.body
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completeAt
      },
      { new: true }
    )
    if (!updateTask) {
      res.status(404).json({ message: 'Nhiệm vụ không tồn tại!' })
    }

    res.status(200).json(updateTask)
  } catch (error) {
    console.log('Lỗi khi gọi updateTasks: ', error)
    res.status(500).json({ message: 'Lỗi hệ thống!' })
  }
}
// DELETE
export const deleteTasks = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id)
    if (!deleteTask) {
      res.status(404).json({ message: 'Xóa không thành công!' })
    }
    res.status(200).json(deleteTask)
  } catch (error) {
    console.log('Lỗi khi gọi deleteTasks: ', error)
    res.status(500).json({ message: 'Lỗi hệ thống!' })
  }
}
