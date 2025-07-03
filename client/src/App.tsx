import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hero from './components/Hero'
import SlideShow from './components/SlideShow'
import { GlobalProvider } from './context/GloabalContext'

function App() {

  return (
    <div className='bg-black'>
      <div className='max-w-[1400px] mx-auto bg-black relative'>

        <GlobalProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Hero />} />
              <Route path='/stats' element={<SlideShow />} />
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </div>
    </div>
  )
}

export default App
