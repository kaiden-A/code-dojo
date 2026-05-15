"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const CHARS = ['!', '@', '?', '#', '$', '%', '^', '{', '}', ';', '§'];
const COUNT = 19;

const ServerFieldBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return;
        const container = containerRef.current;
        container.innerHTML = '';

        interface Item {
            el: HTMLSpanElement;
            baseOpacity: number;
            floatAmt: number;
            floatSpeed: number;
            floatOffset: number;
            rotateBase: number;
            rotateSpeed: number;
        }

        const items: Item[] = [];

        for (let i = 0; i < COUNT; i++) {
            const el = document.createElement('span');
            const char = CHARS[i % CHARS.length];

            const size = 1.8 + Math.random() * 6.5;        // rem — wide spread
            const x = 3 + Math.random() * 94;         // %
            const y = 3 + Math.random() * 94;         // %
            const opacity = 0.055 + Math.random() * 0.12;
            const floatAmt = 20 + Math.random() * 30;     // px vertical float
            const floatSpeed = 0.18 + Math.random() * 0.44;  // Hz
            const floatOffset = Math.random() * Math.PI * 2;
            const rotateBase = Math.random() * 360;          // deg initial rotation
            const rotateSpeed = (Math.random() - 0.5) * 22;  // deg/sec idle spin

            el.textContent = char;
            el.style.cssText = [
                'position:absolute',
                `left:${x}%`,
                `top:${y}%`,
                `font-size:${size}rem`,
                'font-family:serif',
                'color:#eabf8d',
                `opacity:${opacity}`,
                `transform:translate(-50%,-50%) rotate(${rotateBase}deg)`,
                'will-change:transform,opacity,filter',
                'line-height:1',
                'pointer-events:none',
                'user-select:none',
                'letter-spacing:0',
            ].join(';');

            container.appendChild(el);
            items.push({ el, baseOpacity: opacity, floatAmt, floatSpeed, floatOffset, rotateBase, rotateSpeed });
        }

        let rafId: number;
        const startTime = performance.now();

        const animate = () => {
            rafId = requestAnimationFrame(animate);
            const t = (performance.now() - startTime) / 1000;

            const scrollMax = Math.max(1, document.body.scrollHeight - window.innerHeight);
            const scrollProg = window.scrollY / scrollMax;

            items.forEach((item, i) => {
                // Idle: float up/down + slow rotation
                const floatY = Math.sin(t * item.floatSpeed + item.floatOffset) * item.floatAmt;
                const rot = item.rotateBase + t * item.rotateSpeed;

                // Scroll: staggered zoom-in, blur, and fade
                const stagger = (i / COUNT) * 0.3;
                const p = Math.min(1, Math.max(0, scrollProg * 1.8 - stagger));
                const scale = 1 + p * 10;
                const blur = p * 10;
                const opacity = Math.max(0, item.baseOpacity * (1 - p * 1.10));

                item.el.style.transform = `translate(-50%,-50%) rotate(${rot}deg) translateY(${floatY}px) scale(${scale})`;
                item.el.style.filter = blur > 0.15 ? `blur(${blur}px)` : '';
                item.el.style.opacity = String(opacity);
            });
        };

        animate();

        return () => {
            cancelAnimationFrame(rafId);
            container.innerHTML = '';
        };
    }, [pathname]);

    return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" />;
};

export default ServerFieldBackground;
