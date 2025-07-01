import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGlobalContext } from '../context/GloabalContext';

const ForthStep = ( ) => {
    const [count, setCount] = useState(0);
    const { userStats } = useGlobalContext()
    const target = userStats?.stats?.longestStreak;

    // Count up animation
    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 20));

        const interval = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(start);
            }
        }, 20);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative rounded-xl shadow-lg bg-gradient-to-b from-[#1b0c2e] to-black w-full h-full text-white flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                
            </div>

            {/* Hex pattern background */}
            {/* <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-10 z-0" /> */}

            {/* Glow Effect */}
            <div className="absolute top-10 right-10 w-32 h-32  opacity-30 blur-2xl rounded-full z-0" />

            <div className="z-10 text-center">
                <h3 className="text-lg font-semibold text-white tracking-wide mb-2">
                    Longest Streak <span className="text-yellow-400">⚡</span>
                </h3>

                <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 8, delay: 0.4 }}
                    className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
                >
                    {count}
                </motion.h1>

                <p className="text-sm text-purple-200 mt-2 tracking-wide">
                    consecutive days coding
                </p>
            </div>
        </div>
    );
};

export default ForthStep;
