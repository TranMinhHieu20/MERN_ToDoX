import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import AddTask from '@/components/AddTask'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'

const Homepage = () => {
  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTaskCount, setActiveTaskCount] = useState(0)
  const [completeTaskCount, setCompleteTaskCount] = useState(0)
  const [filter, setFilter] = useState('all')
  const [dateQuery, setDateQuery] = useState('today')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchTasks()
  }, [dateQuery])

  useEffect(() => {
    setPage(1)
  }, [filter, dateQuery])

  // logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`)

      setTaskBuffer(res.data.tasks)
      setActiveTaskCount(res.data.active)
      setCompleteTaskCount(res.data.complete)
    } catch (error) {
      console.log('Loi xay ra khi truy xuat tasks', error)
      toast.error('Loi xay ra khi truy xuat Tasks')
    }
  }
  // handleTaskChanged
  const handleTaskChanged = () => {
    fetchTasks()
  }
  //

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }
  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  // bien
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active'
      case 'completed':
        return task.status === 'complete'
      default:
        return true
    }
  })

  const visibleTasks = filteredTasks.slice((page - 1) * visibleTaskLimit, page * visibleTaskLimit)

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit)

  if (visibleTasks.length == 0) {
    handlePrev()
  }
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)
      `,
          backgroundSize: '100% 100%'
        }}
      />

      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Dau trang */}
          <Header />

          {/* Tao nhiem vu */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Thong ke va Bo loc */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          {/* Danh sach nhiem vu */}
          <TaskList filteredTasks={visibleTasks} filter={filter} handleTaskChanged={handleTaskChanged} />

          {/* Phan tich va bo loc theo date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Chan trang */}
          <Footer activeTasksCount={activeTaskCount} completedTasksCount={completeTaskCount} />
        </div>
      </div>
      {/* Your Content Here */}
    </div>
  )
}

export default Homepage
