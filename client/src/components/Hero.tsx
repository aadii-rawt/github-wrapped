
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { FaGithub } from 'react-icons/fa'
import Leaderboard from './Leaderboard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ImSpinner2 } from 'react-icons/im'
import { useGlobalContext } from '../context/GloabalContext'

const Hero: React.FC = () => {

    const { username, setUsername, userStats, setUserStats } = useGlobalContext()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserStats = () => {
        if (!username) {
            return;
        } else {
            navigate(`/stats?username=${username}`);
        }
    }

    return (
        <div className="relative h-screen w-full bg-black ">
            <div className="absolute  h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#F5F5F5B3_50%,transparent_100%)]">
            </div>
            <Header />
            <div className='w-full text-white h-full flex items-center justify-center flex-col z-[10000]'>
                <h1 className='text-7xl font-bold'>Code, Push, Merge, <br /></h1>
                <h1 className='text-7xl font-bold'> Repeat - Wrapped.</h1>
                <p className=' mt-8 text-lg'>See how many commits you crushed, bugs you squashed, and stars you earned.</p>
                <p className='mt-2 text-lg'>Your GitHub activity, transformed into a beautiful, shareable story.</p>
                <div className='border z-50 bg-black pl-3 pr-1.5 py-1.5 mt-5 rounded-3xl flex items-center gap-4'>
                    <FaGithub size={28} />
                    <input
                        type="text"
                        placeholder='Enter your github username'
                        className='border-none outline-none text-lg w-70'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleUserStats} className='bg-white flex justify-center items-center min-w-28 min-h-[40px] text-black px-4 py-1.5 text-lg rounded-3xl font-medium'>
                        {
                            loading ? <div className='animate-spin'> <ImSpinner2 size={20} /></div>
                            : 'Search'
                        }
                    </button>
                </div>
            </div>
            <Leaderboard />
        </div>

    )
}

export default Hero