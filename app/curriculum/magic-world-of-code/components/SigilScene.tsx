"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

const SigilScene = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const manaBloomRef = useRef<HTMLDivElement>(null);
    const statusBoxRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorRingRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname()

    useEffect(() => {
        if (typeof window === "undefined" || !containerRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        containerRef.current.innerHTML = "";

        // --- CURSOR TRAIL LOGIC ---
        const cursorCanvas = canvasRef.current!;
        const ctx2 = cursorCanvas.getContext('2d')!;
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight;

        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let rx = mx, ry = my;

        const MAX_PARTICLES = 120;
        const particles: any[] = [];
        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push({ active: false, x: 0, y: 0, vx: 0, vy: 0, size: 1, life: 0, maxLife: 1 });
        }
        let pIdx = 0, frameN = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mx = e.clientX; my = e.clientY;
            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${mx}px`;
                cursorDotRef.current.style.top = `${my}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const drawTrail = () => {
            ctx2.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
            frameN++;
            if (frameN % 2 === 0) {
                for(let i=0; i<2; i++) {
                    const p = particles[pIdx % MAX_PARTICLES];
                    p.x = mx + (Math.random() - 0.5) * 8;
                    p.y = my + (Math.random() - 0.5) * 8;
                    p.vx = (Math.random() - 0.5) * 1.8;
                    p.vy = (Math.random() - 0.5) * 1.8 - 0.9;
                    p.size = Math.random() * 4 + 1.2;
                    p.life = 0;
                    p.maxLife = Math.random() * 40 + 18;
                    p.active = true;
                    pIdx++;
                }
            }
            rx += (mx - rx) * 0.13;
            ry += (my - ry) * 0.13;
            if (cursorRingRef.current) {
                cursorRingRef.current.style.left = `${rx}px`;
                cursorRingRef.current.style.top = `${ry}px`;
            }

            for (let i = 0; i < MAX_PARTICLES; i++) {
                const p = particles[i];
                if (!p.active) continue;
                p.life++;
                if (p.life >= p.maxLife) { p.active = false; continue; }
                const t = p.life / p.maxLife;
                const al = (1 - t) * (1 - t);
                p.x += p.vx; p.y += p.vy;
                p.vy -= 0.045; p.vx *= 0.97; p.size *= 0.965;
                const r = Math.round(234 + (100 - 234) * t);
                const g = Math.round(191 + (242 - 191) * t);
                const b = Math.round(141 + (255 - 141) * t);
                ctx2.beginPath();
                ctx2.arc(p.x, p.y, Math.max(p.size, 0.4), 0, Math.PI * 2);
                ctx2.fillStyle = `rgba(${r},${g},${b},${al})`;
                ctx2.fill();
            }
        };

        // --- THREE.JS SCENE SETUP ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


        containerRef.current.appendChild(renderer.domElement);

        // Helper Functions for Geometry
        const makeRing = (r: number, segs: number, op: number) => {
            const pts = [];
            for (let i = 0; i <= segs; i++) {
                const a = (i / segs) * Math.PI * 2;
                pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
            }
            return new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(pts),
                new THREE.LineBasicMaterial({ color: 0xeabf8d, transparent: true, opacity: op })
            );
        };
        const makePoly = (r: number, sides: number, op: number) => {
            const pts = [];
            for (let i = 0; i <= sides; i++) {
                const a = (i / sides) * Math.PI * 2 - Math.PI / 2;
                pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
            }
            return new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(pts),
                new THREE.LineBasicMaterial({ color: 0xeabf8d, transparent: true, opacity: op })
            );
        };
        const makeSpokes = (r: number, n: number, op: number) => {
            const pts = [];
            for (let i = 0; i < n; i++) {
                const a = (i / n) * Math.PI * 2;
                pts.push(new THREE.Vector3(0,0,0), new THREE.Vector3(Math.cos(a)*r, Math.sin(a)*r, 0));
            }
            return new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints(pts),
                new THREE.LineBasicMaterial({ color: 0xeabf8d, transparent: true, opacity: op })
            );
        };
        const makeStar = (r: number, n: number, op: number) => {
            const inner = r * 0.42, pts = [];
            for (let i = 0; i <= n * 2; i++) {
                const a = (i / (n*2)) * Math.PI * 2 - Math.PI / 2;
                const rad = i % 2 === 0 ? r : inner;
                pts.push(new THREE.Vector3(Math.cos(a)*rad, Math.sin(a)*rad, 0));
            }
            return new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(pts),
                new THREE.LineBasicMaterial({ color: 0xeabf8d, transparent: true, opacity: op })
            );
        };

        const magicGroup = new THREE.Group();
        const ring1 = makeRing(3.0, 128, 0);
        const ring2 = makeRing(2.55, 128, 0);
        const ring3 = makeRing(1.5, 100, 0);
        const poly6 = makePoly(2.8, 6, 0);
        const poly12 = makePoly(3.05, 12, 0);
        const spokes = makeSpokes(3.0, 12, 0);
        const star = makeStar(1.5, 6, 0);
        magicGroup.add(ring1, ring2, ring3, poly6, poly12, spokes, star);
        scene.add(magicGroup);

        // Flux Particles
        const FLUX_N = 4500;
        const fluxGeo = new THREE.BufferGeometry();
        const fluxPos = new Float32Array(FLUX_N * 3);
        const fluxVel = new Float32Array(FLUX_N);
        const fluxFreq = new Float32Array(FLUX_N);
        for (let i = 0; i < FLUX_N; i++) {
            const a = Math.random() * Math.PI * 2;
            const r = 1.8 + Math.random() * 2.5;
            fluxPos[i*3] = Math.cos(a) * r;
            fluxPos[i*3+1] = (Math.random() - 0.5) * 10;
            fluxPos[i*3+2] = (Math.random() - 0.5) * 2.5;
            fluxVel[i] = 0.005 + Math.random() * 0.012;
            fluxFreq[i] = Math.random() * 2;
        }
        fluxGeo.setAttribute('position', new THREE.BufferAttribute(fluxPos, 3));
        const fluxMaterials = [
            new THREE.PointsMaterial({ color: 0x00f2ff, size: 0.03, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthTest: false }),
            new THREE.PointsMaterial({ color: 0x7000ff, size: 0.05, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthTest: false }),
            new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthTest: false }),
        ];
        fluxMaterials.forEach(m => scene.add(new THREE.Points(fluxGeo, m)));

        // Ember Sparks
        const EMBER_N = 500;
        const eGeo = new THREE.BufferGeometry();
        const ePos = new Float32Array(EMBER_N * 3);
        const eVel = new Float32Array(EMBER_N * 3);
        const eLife = new Float32Array(EMBER_N);
        const eMax = new Float32Array(EMBER_N);
        for (let i = 0; i < EMBER_N; i++) {
            ePos[i*3] = ePos[i*3+1] = ePos[i*3+2] = 9999;
            eLife[i] = 999; eMax[i] = 80;
        }
        eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
        const emberMat = new THREE.PointsMaterial({ color: 0x00f2ff, size: 0.09, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
        scene.add(new THREE.Points(eGeo, emberMat));

        // --- GSAP SCROLL TIMELINE ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.3,
                invalidateOnRefresh: true
            }
        });

        tl.to(camera.position, { z: 5.5, ease: 'none' }, 0)
          .to(magicGroup.rotation, { z: Math.PI * 6, ease: 'none' }, 0)
          .to(ring1.material, { opacity: 0.9 }, 0.04)
          .to(spokes.material, { opacity: 0.22 }, 0.10)
          .to(poly6.material, { opacity: 0.6 }, 0.15)
          .to(ring2.material, { opacity: 0.5 }, 0.20)
          .to(poly12.material, { opacity: 0.28 }, 0.25)
          .to(ring3.material, { opacity: 0.85 }, 0.30)
          .to(star.material, { opacity: 0.6 }, 0.36)
          .to(fluxMaterials[0], { opacity: 0.5 }, 0.60)
          .to(fluxMaterials[1], { opacity: 0.3 }, 0.63)
          .to(fluxMaterials[2], { opacity: 0.6 }, 0.66)
          .to(emberMat, { opacity: 0.8 }, 0.70);

        // Resonance Trigger
        ScrollTrigger.create({
            trigger: '#spell-trigger',
            start: 'top 60%',
            onEnter: () => {
                if(statusBoxRef.current) {
                    statusBoxRef.current.textContent = 'RESONANCE ESTABLISHED ✦';
                    statusBoxRef.current.classList.add('ignited');
                }
                manaBloomRef.current?.classList.add('active');
            },
            onLeaveBack: () => {
                if(statusBoxRef.current) {
                    statusBoxRef.current.textContent = 'INITIATING RESONANCE...';
                    statusBoxRef.current.classList.remove('ignited');
                }
                manaBloomRef.current?.classList.remove('active');
            }
        });

        // Intersection Observer for Reveal
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

        // Progress Bar
        const handleScroll = () => {
            const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if(progressBarRef.current) progressBarRef.current.style.width = (pct * 100) + '%';
        };
        window.addEventListener('scroll', handleScroll);

        // Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            cursorCanvas.width = window.innerWidth;
            cursorCanvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Render Loop
        const clock = new THREE.Clock();
        let eSpawnIdx = 0;

                // --- 3. FORCE REFRESH AFTER NAVIGATION ---
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
            window.dispatchEvent(new Event('resize'));
        }, 150);
        let requestID: number;
        const animate = () => {
            const requestID = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            magicGroup.rotation.x = Math.sin(t * 0.32) * 0.07;
            magicGroup.rotation.y = Math.sin(t * 0.48) * 0.11;

            if (fluxMaterials[0].opacity > 0.01) {
                const pos = fluxGeo.attributes.position.array as Float32Array;
                for (let i = 0; i < FLUX_N; i++) {
                    const angle = t * 0.15 + fluxFreq[i];
                    pos[i*3] += Math.sin(angle) * 0.006;
                    pos[i*3+1] += Math.cos(angle * 0.4) * fluxVel[i];
                    if (pos[i*3+1] > 6) pos[i*3+1] = -6;
                    if (pos[i*3+1] < -6) pos[i*3+1] = 6;
                }
                fluxGeo.attributes.position.needsUpdate = true;
            }

            if (emberMat.opacity > 0.01) {
                const pos = eGeo.attributes.position.array as Float32Array;
                const j = (eSpawnIdx++) % EMBER_N;
                if (eLife[j] >= eMax[j]) {
                    const a = Math.random() * Math.PI * 2;
                    const r = Math.random() * 2.5;
                    pos[j*3] = Math.cos(a)*r; pos[j*3+1] = (Math.random()-0.5)*0.5; pos[j*3+2] = (Math.random()-0.5)*0.5;
                    eVel[j*3+1] = (Math.random()-0.5)*0.03; eLife[j] = 0; eMax[j] = 60 + Math.random()*60;
                }
                for (let i = 0; i < EMBER_N; i++) {
                    if (eLife[i] < eMax[i]) {
                        eLife[i]++;
                        pos[i*3+1] += eVel[i*3+1];
                        if (eLife[i] >= eMax[i]) pos[i*3] = pos[i*3+1] = pos[i*3+2] = 9999;
                    }
                }
                eGeo.attributes.position.needsUpdate = true;
            }

            drawTrail();
            renderer.render(scene, camera);
        };


        
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            // Cleanup Three.js
            renderer.dispose();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [pathname]);

    return (
        <div className="bg-ink text-ash selection:bg-gold/30 selection:text-gold cursor-none overflow-x-hidden">
            <style jsx global>{`
                :root { --gold: #eabf8d; --mana: #00f2ff; --arcane: #7000ff; }
                body { cursor: none; background: #0d0b09; }
                .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.9s ease, transform 0.9s ease; }
                .reveal.visible { opacity: 1; transform: translateY(0); }
                .status-box { border: 1px solid rgba(234,191,141,0.45); background: rgba(234,191,141,0.03); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); }
                .status-box.ignited { border-color: rgba(0, 242, 255, 0.8) !important; color: #00f2ff !important; box-shadow: 0 0 35px rgba(0, 212, 255, 0.25), 0 0 80px rgba(112, 0, 255, 0.15); }
                @keyframes sigil-pulse {
                    0%, 100% { opacity: 0.18; transform: translate(-50%,-50%) scale(1); }
                    50% { opacity: 0.42; transform: translate(-50%,-50%) scale(1.05); }
                }
                .sigil-glow { position: fixed; top: 50%; left: 50%; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(circle, rgba(234,191,141,0.2) 0%, rgba(0,242,255,0.05) 50%, transparent 72%); pointer-events: none; z-index: 0; animation: sigil-pulse 3.5s ease-in-out infinite; filter: blur(22px); }
                .mana-bloom { position: fixed; top: 50%; left: 50%; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(0, 242, 255, 0.18) 0%, rgba(112, 0, 255, 0.08) 45%, transparent 72%); pointer-events: none; z-index: 0; filter: blur(40px); opacity: 0; transform: translate(-50%,-50%) scale(0.6); transition: opacity 1.5s ease, transform 1.5s cubic-bezier(0.23, 1, 0.32, 1); }
                .mana-bloom.active { opacity: 1; transform: translate(-50%,-50%) scale(1.15); }
                .rune-line::before, .rune-line::after { content: ''; display: inline-block; width: 46px; height: 1px; background: var(--gold); opacity: 0.35; vertical-align: middle; margin: 0 10px; }
                @keyframes glow-pulse { 0% { text-shadow: 0 0 4px rgba(234,191,141,0.15); } 100% { text-shadow: 0 0 22px rgba(234,191,141,0.65), 0 0 48px rgba(234,191,141,0.18); } }
                .glow-text { animation: glow-pulse 2.6s ease-in-out infinite alternate; }
                @keyframes bob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
                .scroll-hint { animation: bob 2.3s ease-in-out infinite; }
            `}</style>

            {/* UI Layers */}
            <div ref={progressBarRef} id="progress-bar" className="fixed top-0 left-0 h-px bg-linear-to-r from-transparent via-[#eabf8d] to-transparent z-[200] w-0 transition-[width] duration-100 linear" />
            <div className="fixed inset-0 z-1 pointer-events-none bg-size-[42px_62px] bg-[linear-gradient(to_right,rgba(234,191,141,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,191,141,0.04)_1px,transparent_1px)]" />
            <div className="fixed inset-0 z-1 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
            <div className="sigil-glow" />
            <div ref={manaBloomRef} className="mana-bloom" />

            <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
            <canvas ref={canvasRef} className="fixed inset-0 z-9990 pointer-events-none" />

            <div ref={cursorDotRef} className="fixed w-2 h-2 rounded-full bg-[#eabf8d] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#eabf8d,0_0_22px_rgba(234,191,141,0.45)]" />
            <div ref={cursorRingRef} className="fixed w-7.5 h-7.5 rounded-full border border-[rgba(234,191,141,0.45)] pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2" />

            {/* Corners */}
            <span className="fixed top-6 left-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#eabf8d] opacity-[0.18] z-10">§ I.I</span>
            <span className="fixed top-6 right-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#eabf8d] opacity-[0.18] z-10">ATELIER</span>
            <span className="fixed bottom-6 left-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#eabf8d] opacity-[0.18] z-10">CODEX</span>
            <span className="fixed bottom-6 right-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#eabf8d] opacity-[0.18] z-10">§ IV.IV</span>

            <main className="relative z-10">
                <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 relative">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Codex I — Origin</p>
                    <h1 className="reveal glow-text font-serif text-[#eabf8d] uppercase tracking-widest text-5xl md:text-7xl xl:text-[5.5rem] leading-none">Ink &amp; Algorithm</h1>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-lg">
                        In the world of the Atelier, magic is drawn. In our world, magic is written in logic.
                        Both require the perfect circle to manifest power.
                    </p>
                    <div className="reveal mt-8 rune-line font-serif text-[#eabf8d]/35 text-[0.7rem] tracking-[0.35em] uppercase">sigil.init()</div>

                    <div className="scroll-hint absolute bottom-10 left-1/2 flex flex-col items-center gap-2 pointer-events-none">
                        <span className="text-[#eabf8d]/30 font-sans text-[0.58rem] tracking-[0.42em] uppercase">Descend</span>
                        <div className="w-[1px] h-[42px] bg-gradient-to-b from-[#eabf8d] to-transparent" />
                    </div>
                </section>

                <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Codex II — Drafting</p>
                    <h2 className="reveal font-serif text-[#eabf8d] uppercase tracking-widest text-3xl md:text-5xl">The Drafting Phase</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-lg">
                        Every function is a stroke of the pen. If the logic is fractured, the spell will fizzle.
                        Scroll deeper to complete the sequence.
                    </p>
                    <div className="reveal mt-8 rune-line font-serif text-primary/35 text-[0.7rem] tracking-[0.35em] uppercase">loop.begin()</div>
                </section>

                <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-primary/50 mb-4">Codex III — Binding</p>
                    <h2 className="reveal font-serif text-primary uppercase tracking-widest text-3xl md:text-5xl">The Binding</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-lg">
                        We bind the elements — data, memory, and time — into a singular geometric truth.
                        The circle closes. The seal is set.
                    </p>
                    <div className="reveal mt-8 rune-line font-serif text-primary/35 text-[0.7rem] tracking-[0.35em] uppercase">seal.lock()</div>
                </section>

                <section id="spell-trigger" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 gap-5">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-primary/50">Codex IV — Resonance</p>
                    <div ref={statusBoxRef} className="reveal status-box font-serif text-primary text-[0.82rem] tracking-[0.32em] uppercase px-10 py-4">
                        INITIATING RESONANCE...
                    </div>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] max-w-lg">
                        The code breathes. The mana flows. The sigil is complete.
                    </p>
                    <div className="reveal rune-line font-serif text-primary/35 text-[0.7rem] tracking-[0.35em] uppercase">manifest()</div>
                </section>
            </main>
        </div>
    );
};

export default SigilScene;