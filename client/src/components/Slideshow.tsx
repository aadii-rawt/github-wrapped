import React, { useState, useEffect, useRef, use } from "react";
import { motion } from 'framer-motion'
import axios from 'axios'
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom'
import Stats from "./Stats";
import SecondStory from "./SecondStory";
// import ThirdStep from "./ThirdStep";
import ForthStep from "./ForthStep";
import { useGlobalContext } from '../context/GloabalContext'
import MusicPlayer from "./MusicPlayer";
const AUTO_PLAY_INTERVAL = 40000; // milliseconds


const loadingMessages: string[] = [
    "Wrapping your GitHub year...",
    "Analyzing commits and stars...",
    "Pulling contributions from the matrix...",
    "Sorting PRs and issues...",
    "Making your stats beautiful..."
]

const characterMap = [
    { min: 5000, profile : "https://i.pinimg.com/736x/c4/d8/bd/c4d8bd2bc75d17c9bec2edf92c7aa8e8.jpg", name: "Itachi", gif: "https://i.pinimg.com/originals/5d/8d/62/5d8d62a2adf61026ed1a9fd70a30a3af.gif", level: "Akatsuki" },
    { min: 2000, profile : "https://i.pinimg.com/736x/51/85/c2/5185c26e752c6c50e1f4704640c9ad96.jpg", name: "Satoru Gojo", gif: "https://i.pinimg.com/originals/84/96/f1/8496f17e386aee82ef9217b5abffd2e5.gif", level: "Jujutsu Special" },
    { min: 1000, profile : "https://i.pinimg.com/736x/c5/65/9e/c5659e228862cc1911e80bc7d11d09de.jpg", name: "Goku", gif: "https://i.pinimg.com/originals/c3/2f/7d/c32f7de073039e5adeaa6a02c96ba1e6.gif", level: "Saiyan God" },
    { min: 500, profile : "https://i.pinimg.com/736x/da/23/b9/da23b9fe3f689477e1ba960b3c6c8e39.jpg", name: "Kakashi", gif: "https://i.pinimg.com/originals/4e/cb/f0/4ecbf0c166f71da7a6b2add6ceb0c750.gif", level: "Hasira" },
    { min: 200, profile : "https://i.pinimg.com/736x/11/d4/13/11d41360d4d51ad3e07eca1f4bc7f8dd.jpg", name: "Naruto", gif: "https://i.pinimg.com/originals/ab/d0/0f/abd00f7078c46f1f596516c26635e631.gif", level: "Hokage" },
    { min: 50, profile : "https://i.pinimg.com/736x/79/e2/c9/79e2c9402014ead1eebf6c9f184c5bf8.jpg", name: "Roronoa Zoro", gif: "https://i.pinimg.com/originals/d4/ab/0e/d4ab0e8dcf098ced14d901fc9a21a01c.gif", level: "Swordsman" },
    { min: 0, profile : "https://i.pinimg.com/736x/a8/2d/76/a82d7650231cbc5cbfba1920d07003fb.jpg", name: "Luffy", gif: "https://i.pinimg.com/originals/8e/57/ca/8e57ca54624cf8d18bb334080a626634.gif", level: "Rookie" }
];


const SlideShow: React.FC = () => {

    const { userStats, setUserStats, notification, setNotification, setCharacterInfo } = useGlobalContext()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingIndex, setLoadingIndex] = useState(0)
    const progressRef = useRef();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const username = queryParams.get('username')
    const navigate = useNavigate()

    useEffect(() => {
        if (!username) {
            setNotification({ msg: "User not found", text: "Please check username and try again" })
            navigate('/')
            return
        }
    }, [username])

    // Update loading message every 2.5 seconds
    useEffect(() => {
        if (!loading) return
        const interval = setInterval(() => {
            setLoadingIndex((prev) => (prev + 1) % loadingMessages.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [loading])

    const slides = [<SecondStory />, <ForthStep />, <Stats />,];


    const getCharacterInfo = (totalCommits: number) => {
        return characterMap.find(({ min }) => totalCommits >= min) || characterMap[characterMap.length - 1];
    };

    //============== get user stats ======================
    useEffect(() => {
        const fetchUserStats = async () => {
            if (!username) return
            try {
                const userRes = await axios.get(`https://api.github.com/users/${username}`);
                const statsRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/stats?username=${username}`);

                const user = userRes.data;
                const stats = statsRes.data;
                setUserStats({ user, stats });



                const totalCommits = userStats?.stats?.totalCommits || 0;
                const characterInfo = getCharacterInfo(totalCommits);
                setCharacterInfo(characterInfo)
                // Save/update to your MongoDB via backend
                await axios.post(`${import.meta.env.VITE_API_URL}/api/stats/save`, {
                    username,
                    user,
                    stats,
                    characterInfo
                });

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
        return () => cancelAnimationFrame(progressRef?.current);
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
                    <div className="text-center max-w-xs mx-auto flex flex-col items-center justify-center space-y-4 p-6  rounded-lg shadow-lg"  >
                        <div className="loader"></div>
                        <p className="text-white/70 animate-pulse text-sm">{loadingMessages[loadingIndex]}</p>
                    </div>
                )
                    :
                    (<div className={`max-w-md min-w-[350px] h-[620px] rounded-md relative overflow-visible border border-white/10  shadow-lg bg-slate-950`}>
                        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                        <div className="absolute top-0 left-0 w-full flex space-x-1 p-2 z-30 bg-transparent">

                            {slides.map((_, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 h-1  relative bg-transparent overflow-visible rounded"
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

            {!loading && <MusicPlayer />}
        </div>
    );
};

export default SlideShow;
