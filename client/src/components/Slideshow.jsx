import React, { useState, useEffect, useRef, use } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useLocation } from 'react-router-dom'
import Stats from "../components/Stats";
import SecondStory from "../components/SecondStory";
import ThirdStep from "../components/ThirdStep";
import ForthStep from "../components/ForthStep";
import { useGlobalContext } from '../context/GloabalContext'
import MusicPlayer from "./MusicPlayer";
const AUTO_PLAY_INTERVAL = 10000; // milliseconds

const SlideShow = () => {
    const { userStats, setUserStats } = useGlobalContext()

    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingIndex, setLoadingIndex] = useState(0)
    const progressRef = useRef();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const username = queryParams.get('username')

    const loadingMessages = [
        "Wrapping your GitHub year...",
        "Analyzing commits and stars...",
        "Pulling contributions from the matrix...",
        "Sorting PRs and issues...",
        "Making your stats beautiful..."
    ]

    // Rotate loading message every 2.5 seconds
    useEffect(() => {
        if (!loading) return
        const interval = setInterval(() => {
            setLoadingIndex((prev) => (prev + 1) % loadingMessages.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [loading])

    // List of components/slides
    const slides = [<SecondStory />, <ThirdStep />, <ForthStep />, <Stats />,];

    useEffect(() => {
        const fetchUserStats = async () => {

            if (!username) {
                console.log('Enter Username');
                return;
            }

            try {
                setLoading(true);

                const userData = await axios.get(`https://api.github.com/users/${username}`);
                
                const stats = await axios.get(`https://git-wrapped.com/api/github/stats?username=${username}`);

                const combined = {
                    user: userData.data,
                    stats: stats.data
                };                  
                console.log(combined);
                
                setUserStats(combined);
                console.log(userStats);
                
                // navigate('/stats')

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUserStats();
    }, [])

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev < slides.length - 1 ? prev + 1 : prev
            );
        }, AUTO_PLAY_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    // Animate progress bar
    useEffect(() => {
        setProgress(0);
        const start = Date.now();

        const animate = () => {
            const elapsed = Date.now() - start;
            const percentage = Math.min((elapsed / AUTO_PLAY_INTERVAL) * 100, 100);
            setProgress(percentage);
            if (percentage < 100) {
                progressRef.current = requestAnimationFrame(animate);
            }
        };

        progressRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(progressRef.current);
    }, [currentIndex]);

    const goNext = () => {
        setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white relative overflow-hidden">
            {
                loading ? (
                    <AnimatePresence>
                        <motion.div
                            key={loadingIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-xs mx-auto"
                        >
                            <p className="text-xl font-semibold animate-pulse mb-2">Loading...</p>
                            <p className="text-white/70 animate-pulse text-sm">{loadingMessages[loadingIndex]}</p>
                        </motion.div>
                    </AnimatePresence>
                )
                    :
                    (<div className="max-w-md min-w-[350px] h-[620px] rounded-md relative overflow-hidden border border-white/10  shadow-lg bg-slate-950">
                        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                        <div className="absolute top-0 left-0 w-full flex space-x-1 p-2 z-30 bg-transparent">

                            {slides.map((_, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 h-1  relative bg-transparent overflow-hidden rounded"
                                >
                                    {idx === currentIndex && (
                                        <div
                                            className="absolute top-0 left-0 h-full bg-white transition-all duration-100"
                                            style={{ width: `${progress}%` }}
                                        />
                                    )}
                                    {idx < currentIndex && (
                                        <div className="absolute top-0 left-0 w-full h-full bg-white" />
                                    )}
                                </div>
                            ))}
                        </div>
                        {slides[currentIndex]}
                    </div>)
            }

            {/* Navigation Buttons */}
            {!loading && (
                <div className="absolute top-1/2 left-10 right-10 flex justify-between items-center px-4 transform -translate-y-1/2 z-30">
                    <button
                        onClick={goPrev}
                        disabled={currentIndex === 0}
                        className={`bg-white/10 text-white p-3 rounded-full disabled:opacity-30 ${currentIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                    >
                        <MdOutlineKeyboardArrowLeft size={24} />
                    </button>
                    <button
                        onClick={goNext}
                        disabled={currentIndex === slides.length - 1}
                        className={`bg-white/10 text-white p-3 rounded-full disabled:opacity-30 ${currentIndex === slides.length - 1 ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                    >
                        <MdKeyboardArrowRight size={24} />
                    </button>
                </div>
            )}

            {!loading && <MusicPlayer/>}
        </div>
    );
};

export default SlideShow;
