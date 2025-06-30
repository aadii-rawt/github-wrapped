import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdFileDownload, MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
const slides = [
    {
        id: 1,
        title: "Your Year in Music",
        description: "See how your listening habits evolved.",
        bgColor: "bg-purple-700",
    },
    {
        id: 2,
        title: "Top Artist",
        description: "You listened to The Weeknd for 3,215 minutes.",
        bgColor: "bg-pink-600",
    },
    {
        id: 3,
        title: "Top Genre",
        description: "Your favorite genre was Synthwave.",
        bgColor: "bg-yellow-500",
    },
    {
        id: 4,
        title: "Minutes Listened",
        description: "You spent 34,000 minutes on music!",
        bgColor: "bg-indigo-600",
    },
];

const AUTO_PLAY_INTERVAL = 4000; // milliseconds

const SlideShow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressRef = useRef();

    const goNext = () => {
        setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    // Auto-advance logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev < slides.length - 1 ? prev + 1 : prev
            );
        }, AUTO_PLAY_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    // Progress bar fill animation
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

    return (
        <div className="flex item-center justify-center min-h-screen">
            <div className="max-w-md min-w-[350px] min-h-[88%] my-5 p-6 rounded-md  relative overflow-hidden">
                {/* Top Progress Bar */}
                <div className="absolute top-0 left-0 w-full flex space-x-1 p-2 z-30">
                    {slides.map((_, idx) => (
                        <div key={idx} className="flex-1 h-1 bg-white/30 relative overflow-hidden rounded">
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

                {/* Slides */}
                {/* {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 flex items-center justify-center text-white transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
                            } ${slide.bgColor}`}
                    >
                        <div className="text-center px-6">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                {slide.title}
                            </h1>
                            <p className="text-lg md:text-2xl">{slide.description}</p>
                        </div>
                    </div>
                ))} */}

                <div
                    className="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-700 ease-in-out mt-5"
                >
                    <div class="relative h-full w-full bg-slate-950"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                       
                       {/* profile and */}
                        <div className="p-3 ">
                            <img src="https://i.pinimg.com/originals/3a/db/54/3adb54574e061563341609f4b69c865f.gif" alt="" className="rounded" />

                            <div className="flex items-center justify-center -mt-8 flex-col">
                                <img src="https://i.pinimg.com/736x/d9/17/c9/d917c942d6d48c5a763e35e59eb92a04.jpg" alt="" className="w-16 h-16 rounded-full border-2" />
                                <h1 className="mt-2 font-semibold">aadii-rawt</h1>
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
                                <h1 className="text-green-500 font-semibold text-lg">99 days</h1>
                            </div>
                            <div className="bg-pink-300/20 p-2 rounded-md"> 
                                <h1 className="text-[13px]">Character</h1>
                                <h1 className="text-pink-500 font-semibold text-lg">Itachi Uchiha</h1>
                            </div>
                            <div className="bg-green-300/20 p-2 rounded-md"> 
                                <h1 className="text-[13px]">Longest Streak</h1>
                                <h1 className="text-green-500 font-semibold text-lg">99 days</h1>
                            </div>
                            <div className="bg-pink-300/20 p-2 rounded-md"> 
                                <h1 className="text-[13px]">Character</h1>
                                <h1 className="text-pink-500 font-semibold text-lg">Itachi Uchiha</h1>
                            </div>
                            <div className="bg-green-300/20 p-2 rounded-md"> 
                                <h1 className="text-[13px]">Longest Streak</h1>
                                <h1 className="text-green-500 font-semibold text-lg">99 days</h1>
                            </div>
                            <div className="bg-pink-300/20 p-2 rounded-md"> 
                                <h1 className="text-[13px]">Character</h1>
                                <h1 className="text-pink-500 font-semibold text-lg">Itachi Uchiha</h1>
                            </div>
                            <div className="bg-green-300/20 p-2 rounded-md"> 
                                <h1 className="text-[13px]">Longest Streak</h1>
                                <h1 className="text-green-500 font-semibold text-lg">99 days</h1>
                            </div>
                        </div>
                        
                        <div>
                            <button><IoIosShareAlt /></button>
                            <button><MdFileDownload /></button>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}



            </div>

            <div className="absolute top-1/2 left-40 right-40 flex justify-between items-center px-4 transform -translate-y-1/2 z-30">
                <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className={`"bg-white/20 bg-white/10 text-white p-3 rounded-full disabled:opacity-30 ${currentIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
                >                                                                         
                    <MdOutlineKeyboardArrowLeft Left size={20} />
                </button>
                <button
                    onClick={goNext}
                    disabled={currentIndex === slides.length - 1}
                    className={`"bg-white/20 bg-white/10 text-white p-3 rounded-full disabled:opacity-30 ${currentIndex === slides.length - 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <MdKeyboardArrowRight className="h-5 w-5" />
                </button>
            </div>

        </div>
    );
};

export default SlideShow;
