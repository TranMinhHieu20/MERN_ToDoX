import { Toaster } from 'sonner'
import { BrowserRouter, Route, Routes } from 'react-router'
import Homepage from './pages/HomePage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
