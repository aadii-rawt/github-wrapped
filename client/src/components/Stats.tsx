
import React, { useState } from 'react'
import { IoIosShareAlt } from 'react-icons/io'
import { MdFileDownload } from 'react-icons/md'
import { useGlobalContext } from '../context/GloabalContext';

const Stats : React = ( ) => {

    const { userStats } = useGlobalContext()
    
    return (
        <div
            className="absolute inset-0 flex z-50 items-center justify-center text-white transition-opacity duration-700 ease-in-out mt-5"
        >
            <div className="relative h-full w-full bg-slate-950">
            

                {/* profile and */}
                <div className="p-3 ">
                    <img src="https://i.pinimg.com/originals/3a/db/54/3adb54574e061563341609f4b69c865f.gif" alt="" className="rounded" />

                    <div className="flex items-center justify-center -mt-8 flex-col">
                        <img src={userStats?.user?.avatar_url} alt="" className="w-16 h-16 rounded-full border-2" />
                        <h1 className="mt-2 font-semibold">{userStats?.user?.login}</h1>
                    </div>
                </div>

                {/* github stats */}

                <div className="grid grid-cols-2 p-3 justify-between gap-4">
                    <div className="bg-pink-300/20 p-2 rounded-md">
                        <h1 className="text-[13px]">Character</h1>
                        <h1 className="text-pink-500 font-semibold text-lg">Itachi Uchiha</h1>
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