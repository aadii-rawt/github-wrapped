
import React from 'react'
import Header from './Header'
import { FaGithub } from 'react-icons/fa'
import Leaderboard from './Leaderboard'

const Hero: React.FC = () => {
    return (
        <div className="relative ,min-h-screen w-full">
            <div className="absolute z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#F5F5F5B3_50%,transparent_100%)]">
            </div>
            <div className='w-full text-white h-full flex items-center flex-col z-[10000] bg-transparent'>
                <Header />
                <h1 className='text-7xl font-bold'>Code, Push, Merge, <br /></h1>
                <h1 className='text-7xl font-bold'> Repeat - Wrapped.</h1>
                <p className=' mt-8 text-lg'>See how many commits you crushed, bugs you squashed, and stars you earned.</p>
                <p className='mt-2 text-lg font-outfit'>Your GitHub activity, transformed into a beautiful, shareable story.</p>
                <div className='border z-50 bg-black pl-3 pr-1.5 py-1.5 mt-5 rounded-3xl flex items-center gap-4'>
                    <FaGithub size={28} />
                    <input type="text" placeholder='Enter your github username' className='border-none outline-none text-lg w-70' />
                    <button className='bg-white text-black px-4 py-1.5 text-lg rounded-3xl font-medium'>Search</button>
                </div>
                <Leaderboard />

                <footer className='mt-20 pb-10 z-[99999]'>
                    <h1 className='text-white text-sm  text-center'>build with 🤍 by <a href="https://github.com/sahillrathore" target='_blank' className='underline cursor-pointer'>sahillrathore</a>  &  <a href="https://github.com/aadii-rawt" target='_blank' className='underline cursor-pointer'> aadii-rawt</a> </h1>
                </footer>
            </div>
        </div>

    )
}

export default Hero