import express from 'express'
import { getAllTasks, createTasks, updateTasks, deleteTasks } from '../controllers/tasksControllers.js'

const router = express.Router()
//GET
router.get('/', getAllTasks)
//POST
router.post('/', createTasks)
//PUT
router.put('/:id', updateTasks)
//DELETE
router.delete('/:id', deleteTasks)

export default router
