
import React from 'react'
import { IoIosShareAlt } from 'react-icons/io'
import { MdFileDownload } from 'react-icons/md'
import { useGlobalContext } from '../context/GloabalContext';
import { GoArrowRight } from 'react-icons/go';

const Stats: React.FC = () => {

    const { userStats } = useGlobalContext()

    return (
        <div
            className="absolute inset-0 flex z-50 items-center justify-center text-white transition-opacity duration-700 ease-in-out mt-5 overflow-visible"
        >
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="relative h-full w-full ">

                {/* profile and */}
                <div className="p-3 ">
                    {/* <img src="https://i.pinimg.com/originals/5d/8d/62/5d8d62a2adf61026ed1a9fd70a30a3af.gif" alt="" className="rounded max-h-[150px] w-full" /> */}
                    {/* <img src="https://i.pinimg.com/originals/84/96/f1/8496f17e386aee82ef9217b5abffd2e5.gif" alt="" className="rounded max-h-[150px] w-full" /> */}
                    {/* <img src="https://i.pinimg.com/originals/c3/2f/7d/c32f7de073039e5adeaa6a02c96ba1e6.gif" alt="" className="rounded max-h-[150px] w-full" /> */}
                    {/* <img src="https://i.pinimg.com/originals/4e/cb/f0/4ecbf0c166f71da7a6b2add6ceb0c750.gif" alt="" className="rounded max-h-[150px] w-full" /> */}
                    {/* <img src="https://i.pinimg.com/originals/ab/d0/0f/abd00f7078c46f1f596516c26635e631.gif" alt="" className="rounded max-h-[150px] w-full" /> */}
                    {/* <img src="https://i.pinimg.com/originals/d4/ab/0e/d4ab0e8dcf098ced14d901fc9a21a01c.gif" alt="" className="rounded max-h-[150px] w-full" /> */}
                    <img src="https://i.pinimg.com/originals/8e/57/ca/8e57ca54624cf8d18bb334080a626634.gif" alt="" className="rounded max-h-[150px] w-full" />

                    <div className="flex items-center justify-center -mt-8 flex-col">
                        <img src={userStats?.user?.avatar_url} alt="" className="w-16 h-16 rounded-full border-2" />
                        <h1 className="mt-2 font-semibold">{userStats?.user?.login}</h1>
                    </div>
                </div>

                {/* github stats */}

                <div className="grid grid-cols-2 p-3 justify-between gap-4 overflow-visible">
                    <div className="bg-pink-300/20 p-2 rounded-md relative inline-block group">
                        <h1 className="text-[13px]">Character</h1>
                        <h1 className="text-pink-500 font-semibold text-lg">Itachi</h1>

                        <div
                            className="absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2"
                        >
                            <div
                                className="relative p-4 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]"
                            >
                                

                                <div className="space-y-2">
                                   <ul className='text-sm'>
                                    <li className='flex items-center gap-2 text-gray-300 '>5000+ commites/year <GoArrowRight /> Itachi</li>
                                    <li className='flex items-center gap-2 text-gray-300 '>2000+ commites/year <GoArrowRight /> Satoru Gojo</li>
                                    <li className='flex items-center gap-2 text-gray-300 '>1000+ commites/year <GoArrowRight /> Goku</li>
                                    <li className='flex items-center gap-2 text-gray-300 '>500+ commites/year <GoArrowRight /> Kakashi</li>
                                    <li className='flex items-center gap-2 text-gray-300 '>200+ commites/year <GoArrowRight /> Naruto</li>
                                    <li className='flex items-center gap-2 text-gray-300 '>50+ commites/year <GoArrowRight />  Roronoa Zoro </li>
                                    <li className='flex items-center gap-2 text-gray-300 '>Less than 50 commites <GoArrowRight /> Luffy</li>
                                   </ul>
                                </div>

                                <div
                                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl opacity-50"
                                ></div>

                                <div
                                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-300/20 p-2 rounded-md">
                        <h1 className="text-[13px]">Longest Streak</h1>
                        <h1 className="text-green-500 font-semibold text-lg">{userStats?.stats?.longestStreak}</h1>
                    </div>
                    <div className="bg-yellow-300/20 p-2 rounded-md">
                        <h1 className="text-[13px]">Total Commits</h1>
                        <h1 className="text-yellow-500 font-semibold text-lg">{userStats?.stats?.totalCommits}</h1>
                    </div>
                    <div className="bg-purple-300/20 p-2 rounded-md">
                        <h1 className="text-[13px]">Top Language</h1>
                        <h1 className="text-purple-500 font-semibold text-lg">{userStats?.stats?.topLanguages?.[0]}</h1>
                    </div>
                    <div className="bg-blue-300/20 p-2 rounded-md">
                        <h1 className="text-[13px]">Most Active Month</h1>
                        <h1 className="text-blue-500 font-semibold text-lg">{userStats?.stats?.mostActiveMonth?.name}</h1>
                    </div>
                    <div className="bg-red-300/20 p-2 rounded-md">
                        <h1 className="text-[13px]">Most Active Day</h1>
                        <h1 className="text-red-500 font-semibold text-lg">{userStats?.stats?.mostActiveDay?.name}</h1>
                    </div>
                    <div className="bg-teal-300/20 p-2 rounded-md">
                        <h1 className="text-[13px]">Star Earn</h1>
                        <h1 className="text-teal-500 font-semibold text-lg">{userStats?.stats?.starsEarned}</h1>
                    </div>
                    <div className="bg-orange-300/20 p-2 rounded-md">
                        <h1 className="text-[13px]">Level</h1>
                        <h1 className="text-orange-500 font-semibold text-lg">Sharingan</h1>
                    </div>
                </div>

                <div className="flex justify-end items-center px-3 gap-2">
                    <button className="bg-white/10 p-1.5 cursor-pointer rounded"><IoIosShareAlt /></button>
                    <button className="bg-white/10 p-1.5 cursor-pointer rounded"><MdFileDownload /></button>
                </div>
            </div>
        </div>
    )
}

export default Stats