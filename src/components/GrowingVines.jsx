import React, { useEffect, useState } from 'react';
import './GrowingVines.css';

const GrowingVines = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            // Ensure we don't divide by zero if page is short
            const progress = totalScroll > 0 ? Math.min(Math.max(currentScroll / totalScroll, 0), 1) : 1;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once on mount to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getDashOffset = (length, progress, startThreshold = 0, speed = 1) => {
        if (progress < startThreshold) return length;
        const adjustedProgress = (progress - startThreshold) * speed;
        const finalProgress = Math.min(Math.max(adjustedProgress, 0), 1);
        return length - (length * finalProgress);
    };

    const getOpacity = (threshold) => {
        return scrollProgress > threshold ? 1 : 0;
    };

    return (
        <div className="vines-container">
            {/* Left Vine Complex */}
            <svg className="vine-svg vine-left" viewBox="0 0 150 800" preserveAspectRatio="none">
                {/* Main Stem */}
                <path
                    d="M 50,-20 Q 10,100 50,200 T 50,400 T 20,600 T 60,800"
                    fill="none"
                    stroke="#4A6741"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: 1000,
                        strokeDashoffset: getDashOffset(1000, scrollProgress * 1.2)
                    }}
                />

                {/* Branch 1 (from ~200y) */}
                <path
                    d="M 50,200 Q 90,180 110,210"
                    fill="none"
                    stroke="#4A6741"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: 100,
                        strokeDashoffset: getDashOffset(100, scrollProgress, 0.2, 3)
                    }}
                />

                {/* Branch 2 (from ~600y) */}
                <path
                    d="M 20,600 Q -10,630 -30,600"
                    fill="none"
                    stroke="#4A6741"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: 100,
                        strokeDashoffset: getDashOffset(100, scrollProgress, 0.7, 3)
                    }}
                />

                {/* Leaves */}
                <path d="M 50,200 Q 30,180 20,200 Q 30,220 50,200" fill="#8DA399" className="leaf" style={{ opacity: getOpacity(0.2) }} />
                <path d="M 50,400 Q 70,380 90,400 Q 70,420 50,400" fill="#8DA399" className="leaf" style={{ opacity: getOpacity(0.5) }} />
                <path d="M 20,600 Q 0,580 -10,600 Q 0,620 20,600" fill="#8DA399" className="leaf" style={{ opacity: getOpacity(0.7) }} />

                {/* Extra Branch Leaves */}
                <path d="M 110,210 Q 120,200 130,210 Q 120,220 110,210" fill="#6B8E23" className="leaf" style={{ opacity: getOpacity(0.25) }} />

                {/* Flowers/Berries */}
                <circle cx="110" cy="210" r="4" fill="#D4A373" className="flower" style={{ opacity: getOpacity(0.28), transitionDelay: '0.2s' }} />
                <circle cx="50" cy="400" r="3" fill="#BFD8BD" className="berry" style={{ opacity: getOpacity(0.52) }} />
                <circle cx="58" cy="410" r="3" fill="#BFD8BD" className="berry" style={{ opacity: getOpacity(0.53) }} />
            </svg>

            {/* Right Vine Complex - Mirrored/Different */}
            <svg className="vine-svg vine-right" viewBox="0 0 150 800" preserveAspectRatio="none">
                {/* Main Stem */}
                <path
                    d="M 80,-20 Q 120,100 80,200 T 80,400 T 110,600 T 70,800"
                    fill="none"
                    stroke="#4A6741"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: 1000,
                        strokeDashoffset: getDashOffset(1000, scrollProgress * 1.2)
                    }}
                />

                {/* Branch 1 (from ~400y) */}
                <path
                    d="M 80,400 Q 40,380 20,410"
                    fill="none"
                    stroke="#4A6741"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: 100,
                        strokeDashoffset: getDashOffset(100, scrollProgress, 0.45, 3)
                    }}
                />

                {/* Leafs Right */}
                <path d="M 80,200 Q 100,180 110,200 Q 100,220 80,200" fill="#8DA399" className="leaf" style={{ opacity: getOpacity(0.2) }} />
                <path d="M 80,400 Q 60,380 50,400 Q 60,420 80,400" fill="#8DA399" className="leaf" style={{ opacity: getOpacity(0.5) }} />
                <path d="M 110,600 Q 130,580 140,600 Q 130,620 110,600" fill="#8DA399" className="leaf" style={{ opacity: getOpacity(0.7) }} />

                {/* Flowers/Berries */}
                <circle cx="20" cy="410" r="5" fill="#D4A373" className="flower" style={{ opacity: getOpacity(0.5), transitionDelay: '0.1s' }} />
                <circle cx="110" cy="600" r="3" fill="#BFD8BD" className="berry" style={{ opacity: getOpacity(0.72) }} />
            </svg>
        </div>
    );
};

export default GrowingVines;
