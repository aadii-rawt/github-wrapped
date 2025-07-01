import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import SlideShow from './components/SlideShow'
import { useState } from 'react'
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

        <div className='text-white absolute bottom-8 right-0 bg-[#161617] p-1 rounded-3xl text-sm px-2 mx-7'>
          <button>build with 🤍 by  <a href="https://github.com/aadii-rawt" target='_blank' className='hover:text-underline'>aadii-rawt</a></button>
        </div>
      </div>
    </div>
  )
}

export default App
