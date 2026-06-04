"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const CHARS = ['⇡', '⇣', '⟳', '⚡', '◉', '○', '⌗', '⌘', '⎔', '⏣', '⏏', '⤴', '⤵', '⟁', '⬡'];
const COUNT = 20;

const DeploymentBackground = () => {
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

            const size = 1.5 + Math.random() * 6;
            const x = 3 + Math.random() * 94;
            const y = 3 + Math.random() * 94;
            const opacity = 0.05 + Math.random() * 0.1;
            const floatAmt = 15 + Math.random() * 28;
            const floatSpeed = 0.15 + Math.random() * 0.4;
            const floatOffset = Math.random() * Math.PI * 2;
            const rotateBase = Math.random() * 360;
            const rotateSpeed = (Math.random() - 0.5) * 18;

            el.textContent = char;
            el.style.cssText = [
                'position:absolute',
                `left:${x}%`,
                `top:${y}%`,
                `font-size:${size}rem`,
                'font-family:serif',
                'color:#7eb8e0',
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
                const floatY = Math.sin(t * item.floatSpeed + item.floatOffset) * item.floatAmt;
                const rot = item.rotateBase + t * item.rotateSpeed;

                const stagger = (i / COUNT) * 0.3;
                const p = Math.min(1, Math.max(0, scrollProg * 1.8 - stagger));
                const scale = 1 + p * 8;
                const blur = p * 8;
                const opacity = Math.max(0, item.baseOpacity * (1 - p * 1.1));

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

export default DeploymentBackground;
