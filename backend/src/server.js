import express from 'express'
import tasksRouters from './routes/tasksRouters.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT || 5001

const __dirname = path.resolve()

const app = express()
// middlewares
app.use(express.json())
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }))
}

app.use('/api/tasks', tasksRouters)

if ((process.env.NODE_ENV = 'production')) {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.json(__dirname, '../frontend/index.html'))
  })
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server bat dau chay tren cong:', PORT)
  })
})
