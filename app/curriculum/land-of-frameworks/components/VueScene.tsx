"use client";

import React, { useEffect, useRef } from 'react';

const VueScene = () => {
    const glowRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (glowRef.current) {
            glowRef.current.style.opacity = '1';
            glowRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        // Floating network nodes for connection lines
        const nodes = Array.from({ length: 35 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
        }));

        // Particles
        type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; aDir: number; color: string };
        const particles: Particle[] = Array.from({ length: 70 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: -Math.random() * 0.45 - 0.1,
            r: Math.random() * 2.2 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
            aDir: Math.random() > 0.5 ? 1 : -1,
            color: Math.random() > 0.4 ? 'rgba(66,184,131,' : 'rgba(53,73,94,',
        }));

        let t = 0;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            t += 0.005;

            // Network lines
            nodes.forEach(n => {
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
            });
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 110) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(66,184,131,${((1 - d / 110) * 0.09).toFixed(3)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Particles
            particles.forEach((p, i) => {
                p.x += p.vx + Math.sin(t + i) * 0.12;
                p.y += p.vy;
                p.alpha += 0.003 * p.aDir;
                if (p.alpha <= 0.05 || p.alpha >= 0.7) p.aDir *= -1;
                if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
                ctx.fill();
            });

            animFrameRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 tatami-texture animate-breathe" />
            <div className="absolute inset-0 shoji-pattern opacity-10" />

            {/* Pulsing rings */}
            {[260, 380, 500].map((size, i) => (
                <div key={i} className="fixed top-1/2 left-1/2 rounded-full border"
                    style={{
                        width: size, height: size,
                        marginLeft: -size / 2, marginTop: -size / 2,
                        borderColor: i % 2 === 0 ? 'rgba(66,184,131,0.14)' : 'rgba(53,73,94,0.2)',
                        animation: `vuering 4s ease-in-out infinite`,
                        animationDelay: `${i * 1.1}s`,
                    }}
                />
            ))}

            {/* Accurate Vue.js logo — official viewBox 0 0 261.76 226.69 */}
            <div className="fixed top-1/2 left-1/2"
                style={{ animation: 'vuefloat 5s ease-in-out infinite', filter: 'drop-shadow(0 0 30px rgba(66,184,131,0.2))' }}>
                <svg width="200" height="173" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer dark V — two triangles forming the full outer shape */}
                    <path d="M0,0 L130.88,226.69 L261.76,0 H214.07 L130.88,145.47 L47.7,0 Z" fill="rgba(66,184,131,0.6)" />
                    {/* Inner green V — nested chevron */}
                    <path d="M47.7,0 L130.88,145.47 L214.07,0 H164.27 L130.88,59.52 L97.5,0 Z" fill="rgba(53,73,94,0.55)" />
                </svg>
            </div>

            {/* Glow */}
            <div ref={glowRef}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-0 scale-50 blur-3xl transition-all duration-1000"
                style={{ background: 'radial-gradient(circle, rgba(66,184,131,0.15) 0%, rgba(53,73,94,0.08) 45%, transparent 72%)' }}
            />

            <div className="fixed top-6 left-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#42b883] opacity-[0.18] z-10">§ V.I</div>
            <div className="fixed top-6 right-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#42b883] opacity-[0.18] z-10">VUE.JS</div>
            <div className="fixed bottom-6 left-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#42b883] opacity-[0.18] z-10">FRAMEWORK</div>
            <div className="fixed bottom-6 right-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#42b883] opacity-[0.18] z-10">§ I.IV</div>

            <style>{`
                @keyframes vuefloat {
                    0%,100% { transform: translate(-50%,-50%) translateY(-7px) rotate(-1.5deg); }
                    50%      { transform: translate(-50%,-50%) translateY(7px)  rotate(1.5deg); }
                }
                @keyframes vuering {
                    0%,100% { transform: translate(-50%,-50%) scale(1);    opacity:.8; }
                    50%     { transform: translate(-50%,-50%) scale(1.06); opacity:.4; }
                }
            `}</style>
        </div>
    );
};

export default VueScene;