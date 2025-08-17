import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SlideShow from './components/Slideshow'
import { GlobalProvider } from './context/GloabalContext'
import Home from './pages/Home'

function App() {

  return (
    <div className='bg-black'>
      <div className='max-w-[1400px] mx-auto bg-black relative'>
        <GlobalProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/stats' element={<SlideShow />} />
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </div>
    </div>
  )
}

export default App
