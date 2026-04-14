"use client";

import React, { useEffect, useRef, useState } from 'react';

const ArcaneMusic = ({ src = "/bg-music.mp3" , volume = 0.4 }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // 1. Initialize the audio
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0.4;
        audioRef.current = audio;

        // 2. The "Auto-Play" workaround: Try to play on any user activity
        const unlockAudio = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        cleanUpEvents();
                    })
                    .catch(() => {
                        // Still blocked? We wait for the next interaction
                        console.log("Waiting for user resonance...");
                    });
            }
        };

        const cleanUpEvents = () => {
            window.removeEventListener('scroll', unlockAudio);
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
        };

        // Listen for the first sign of life from the user
        window.addEventListener('scroll', unlockAudio);
        window.addEventListener('click', unlockAudio);
        window.addEventListener('touchstart', unlockAudio);

        return () => {
            audio.pause();
            cleanUpEvents();
            audioRef.current = null;
        };
    }, [src]);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-10 right-10 z-300 flex flex-col items-center gap-3 group">
            <button
                onClick={toggleMusic}
                className="relative flex items-center justify-center w-12 h-12 transition-transform duration-500 hover:scale-110"
            >
                {/* Rotating Sigil Ring */}
                <div className={`absolute inset-0 border border-gold/20 rounded-full transition-all duration-1000 
                    ${isPlaying ? 'rotate-180 border-mana/40 shadow-[0_0_15px_rgba(0,242,255,0.15)]' : 'group-hover:border-gold/40'}`} 
                />
                
                {/* Inner Icon */}
                <div className={`relative w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center transition-colors
                    ${isPlaying ? 'bg-mana/5 border-mana/30' : 'bg-gold/5'}`}
                >
                    {isPlaying ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00f2ff" strokeWidth="2">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#eabf8d" strokeWidth="2" opacity="0.6">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" />
                            <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                    )}
                </div>
            </button>
            
            {/* Minimalist Label */}
            <span className={`text-[0.5rem] tracking-[0.4em] uppercase transition-all duration-700 font-sans
                ${isPlaying ? 'text-mana opacity-80' : 'text-gold/30 opacity-0 group-hover:opacity-100'}`}>
                {isPlaying ? "Resonance Active" : "Silent"}
            </span>
        </div>
    );
};

export default ArcaneMusic;