import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Stats from "../components/Stats";
import SecondStory from "../components/SecondStory";
import ThirdStep from "../components/ThirdStep";
import ForthStep from "../components/ForthStep";

const AUTO_PLAY_INTERVAL = 10000; // milliseconds

const SlideShow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressRef = useRef();

    // List of components/slides
    const slides = [<SecondStory />, <ThirdStep />, <ForthStep />, <Stats />,];

    const goNext = () => {
        setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

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

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white relative">
            <div className="max-w-md min-w-[350px] h-[620px] rounded-md relative overflow-hidden border border-white/10  shadow-lg bg-slate-950">
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
            </div>
            {/* Navigation Buttons */}
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
        </div>
    );
};

export default SlideShow;
