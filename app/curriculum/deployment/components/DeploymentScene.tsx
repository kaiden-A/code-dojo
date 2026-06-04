"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

const DeploymentScene = () => {
    const statusBoxRef = useRef<HTMLDivElement>(null);
    const manaBloomRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorRingRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === "undefined") return;
        gsap.registerPlugin(ScrollTrigger);

        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let rx = mx, ry = my;
        if (cursorDotRef.current) { cursorDotRef.current.style.left = `${mx}px`; cursorDotRef.current.style.top = `${my}px`; }
        if (cursorRingRef.current) { cursorRingRef.current.style.left = `${rx}px`; cursorRingRef.current.style.top = `${ry}px`; }

        const handleMouseMove = (e: MouseEvent) => {
            mx = e.clientX; my = e.clientY;
            if (cursorDotRef.current) { cursorDotRef.current.style.left = `${mx}px`; cursorDotRef.current.style.top = `${my}px`; }
        };
        window.addEventListener('mousemove', handleMouseMove);

        let cursorFrame: number;
        const followCursor = () => {
            rx += (mx - rx) * 0.13;
            ry += (my - ry) * 0.13;
            if (cursorRingRef.current) { cursorRingRef.current.style.left = `${rx}px`; cursorRingRef.current.style.top = `${ry}px`; }
            cursorFrame = requestAnimationFrame(followCursor);
        };
        cursorFrame = requestAnimationFrame(followCursor);

        ScrollTrigger.create({
            trigger: '#resonance',
            start: 'top 60%',
            onEnter: () => {
                if (statusBoxRef.current) { statusBoxRef.current.textContent = 'DEPLOYMENT LIVE ✦'; statusBoxRef.current.classList.add('ignited'); }
                manaBloomRef.current?.classList.add('active');
            },
            onLeaveBack: () => {
                if (statusBoxRef.current) { statusBoxRef.current.textContent = 'DEPLOYING...'; statusBoxRef.current.classList.remove('ignited'); }
                manaBloomRef.current?.classList.remove('active');
            },
        });

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

        const handleScroll = () => {
            const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (progressBarRef.current) progressBarRef.current.style.width = (pct * 100) + '%';
        };
        window.addEventListener('scroll', handleScroll);

        const refreshTimer = setTimeout(() => { ScrollTrigger.refresh(); }, 150);

        return () => {
            clearTimeout(refreshTimer);
            cancelAnimationFrame(cursorFrame);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            ScrollTrigger.getAll().forEach(t => t.kill());
            obs.disconnect();
        };
    }, [pathname]);

    return (
        <div className="bg-ink text-ash selection:bg-[#7eb8e0]/30 selection:text-[#7eb8e0] cursor-none overflow-x-hidden">
            <style jsx global>{`
                :root { --node: #7eb8e0; --primary: #7eb8e0; }
                .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.9s ease, transform 0.9s ease; }
                .reveal.visible { opacity: 1; transform: translateY(0); }
                .status-box { border: 1px solid rgba(126,184,224,0.35); background: rgba(126,184,224,0.03); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); }
                .status-box.ignited { border-color: rgba(126,184,224,0.8) !important; color: #7eb8e0 !important; box-shadow: 0 0 35px rgba(126,184,224,0.25), 0 0 80px rgba(126,184,224,0.15); }
                @keyframes sigil-pulse {
                    0%, 100% { opacity: 0.15; transform: translate(-50%,-50%) scale(1); }
                    50% { opacity: 0.35; transform: translate(-50%,-50%) scale(1.05); }
                }
                .sigil-glow { position: fixed; top: 50%; left: 50%; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(circle, rgba(126,184,224,0.15) 0%, rgba(126,184,224,0.05) 50%, transparent 72%); pointer-events: none; z-index: 0; animation: sigil-pulse 3.5s ease-in-out infinite; filter: blur(22px); }
                .mana-bloom { position: fixed; top: 50%; left: 50%; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(126,184,224,0.18) 0%, rgba(126,184,224,0.08) 45%, transparent 72%); pointer-events: none; z-index: 0; filter: blur(40px); opacity: 0; transform: translate(-50%,-50%) scale(0.6); transition: opacity 1.5s ease, transform 1.5s cubic-bezier(0.23, 1, 0.32, 1); }
                .mana-bloom.active { opacity: 1; transform: translate(-50%,-50%) scale(1.15); }
                .rune-line::before, .rune-line::after { content: ''; display: inline-block; width: 46px; height: 1px; background: var(--node); opacity: 0.35; vertical-align: middle; margin: 0 10px; }
                @keyframes glow-pulse { 0% { text-shadow: 0 0 4px rgba(126,184,224,0.15); } 100% { text-shadow: 0 0 22px rgba(126,184,224,0.65), 0 0 48px rgba(126,184,224,0.18); } }
                .glow-text { animation: glow-pulse 2.6s ease-in-out infinite alternate; }
                @keyframes bob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
                .scroll-hint { animation: bob 2.3s ease-in-out infinite; }
                .code-block { background: rgba(0,0,0,0.65); border: 1px solid rgba(126,184,224,0.12); padding: 1.1rem 1.4rem; font-family: 'Courier New', monospace; font-size: 0.7rem; line-height: 1.85; overflow-x: auto; text-align: left; color: #7eb8e0; }
                .code-block pre { margin: 0; white-space: pre; color: #7eb8e0; font-family: inherit; font-size: inherit; line-height: inherit; }
                .code-comment { color: rgba(126,184,224,0.28); }
                .code-label { display: flex; align-items: center; gap: 8px; font-size: 0.58rem; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(126,184,224,0.38); margin-bottom: 0.4rem; font-family: 'Courier New', monospace; }
                .code-label::after { content: ''; flex: 1; height: 1px; background: rgba(126,184,224,0.1); }
                .step-num { display: inline-flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border: 1px solid rgba(126,184,224,0.25); font-size: 0.62rem; font-family: serif; color: rgba(126,184,224,0.6); flex-shrink: 0; }
                .badge-vue { display: inline-block; font-family: 'Courier New', monospace; font-size: 0.6rem; font-weight: bold; letter-spacing: 0.06em; padding: 2px 7px; border: 1px solid rgba(66,184,131,0.45); color: #42b883; }
                .badge-render { display: inline-block; font-family: 'Courier New', monospace; font-size: 0.6rem; font-weight: bold; letter-spacing: 0.06em; padding: 2px 7px; border: 1px solid rgba(70,207,137,0.45); color: #46cf89; }
                .badge-env { display: inline-block; font-family: 'Courier New', monospace; font-size: 0.6rem; font-weight: bold; letter-spacing: 0.06em; padding: 2px 7px; border: 1px solid rgba(232,168,124,0.45); color: #e8a87c; }
                .badge-warn { display: inline-block; font-family: 'Courier New', monospace; font-size: 0.6rem; font-weight: bold; letter-spacing: 0.06em; padding: 2px 7px; border: 1px solid rgba(232,124,124,0.45); color: #e87c7c; }
            `}</style>

            {/* Fixed UI */}
            <div ref={progressBarRef} className="fixed top-0 left-0 h-px bg-linear-to-r from-transparent via-[#7eb8e0] to-transparent z-[200] w-0 transition-[width] duration-100 linear" />
            <div className="fixed inset-0 z-1 pointer-events-none bg-size-[42px_62px] bg-[linear-gradient(to_right,rgba(126,184,224,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,184,224,0.03)_1px,transparent_1px)]" />
            <div className="fixed inset-0 z-1 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
            <div className="sigil-glow" />
            <div ref={manaBloomRef} className="mana-bloom" />
            <div ref={cursorDotRef} className="fixed w-2 h-2 rounded-full bg-[#7eb8e0] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#7eb8e0,0_0_22px_rgba(126,184,224,0.45)] will-change-transform" />
            <div ref={cursorRingRef} className="fixed w-7.5 h-7.5 rounded-full border border-[rgba(126,184,224,0.45)] pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform" />

            <span className="fixed top-6 right-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#7eb8e0] opacity-[0.18] z-10">VUE</span>
            <span className="fixed bottom-6 left-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#7eb8e0] opacity-[0.18] z-10">DEPLOY</span>
            <span className="fixed bottom-6 right-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#7eb8e0] opacity-[0.18] z-10">§ VI.I</span>

            <main className="relative z-10 lg:pl-32">

                {/* ══════════════════════════════════════════
                    HERO
                ══════════════════════════════════════════ */}
                <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 relative">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#7eb8e0]/50 mb-4">Module VI · Part 1 — Going Live with Vue</p>
                    <h1 className="reveal glow-text font-serif text-[#7eb8e0] uppercase tracking-widest text-5xl md:text-7xl xl:text-[5.5rem] leading-none">Vue on Vercel</h1>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-lg">
                        You built it with Vue. Now the world needs to see it.
                        Deployment is the bridge between your machine and the open web —
                        where your Vue app becomes a living service.
                    </p>
                    <div className="reveal mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl w-full">
                        {['Vite Build', 'Vercel Setup', 'CORS Wiring', 'Env Vars'].map((s, i) => (
                            <div key={i} className="border border-[#7eb8e0]/15 bg-[#7eb8e0]/3 py-2.5 px-3">
                                <span className="text-[#7eb8e0]/35 font-serif text-[0.52rem] tracking-[0.3em] uppercase block">{String(i + 1).padStart(2, '0')}</span>
                                <span className="text-ash/55 text-[0.62rem] tracking-wide block mt-1">{s}</span>
                            </div>
                        ))}
                    </div>
                    <div className="reveal mt-8 rune-line font-serif text-[#7eb8e0]/35 text-[0.7rem] tracking-[0.35em] uppercase">vue.deploy()</div>
                    <div className="scroll-hint absolute bottom-10 left-1/2 flex flex-col items-center gap-2 pointer-events-none">
                        <span className="text-[#7eb8e0]/30 font-sans text-[0.58rem] tracking-[0.42em] uppercase">Descend</span>
                        <div className="w-[1px] h-[42px] bg-gradient-to-b from-[#7eb8e0] to-transparent" />
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 1 — WHY DEPLOY?
                ══════════════════════════════════════════ */}
                <section id="why-deploy" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#7eb8e0]/50 mb-4">Section 1 — The Great Migration</p>
                    <h2 className="reveal font-serif text-[#7eb8e0] uppercase tracking-widest text-3xl md:text-5xl">Why Deployment?</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        Your <strong className="text-[#7eb8e0]/80">localhost</strong> is a cocoon. Beautiful, isolated, invisible.
                        Deployment is the metamorphosis — taking your Vue frontend and Express backend
                        from your machine to machines that live on the internet, accessible to anyone, anywhere, 24/7.
                    </p>

                    <div className="reveal mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl w-full">
                        <div className="border border-[#7eb8e0]/20 bg-[#7eb8e0]/5 p-6 backdrop-blur-sm text-left">
                            <span className="text-[#7eb8e0] text-[0.6rem] tracking-[0.35em] uppercase font-bold block mb-3">Development (Local)</span>
                            <p className="text-ash/65 text-sm leading-relaxed mb-4">Runs on <strong className="text-ash/85">your machine only</strong>. Visible to no one but you.</p>
                            <ul className="text-ash/45 text-xs space-y-1.5">
                                <li>• Vite dev server on localhost:5173</li>
                                <li>• Hot module replacement, instant feedback</li>
                                <li>• No SSL, no domain, no internet</li>
                                <li>• Perfect for building and testing</li>
                            </ul>
                        </div>
                        <div className="border border-[#7eb8e0]/30 bg-[#7eb8e0]/8 p-6 backdrop-blur-sm text-left">
                            <span className="text-[#7eb8e0] text-[0.6rem] tracking-[0.35em] uppercase font-bold block mb-3">Production (Deployed)</span>
                            <p className="text-ash/65 text-sm leading-relaxed mb-4">Runs on <strong className="text-ash/85">a cloud server</strong>. Visible to the whole world.</p>
                            <ul className="text-ash/45 text-xs space-y-1.5">
                                <li>• Hosted on Vercel, Render, Netlify, etc.</li>
                                <li>• Accessible via a real URL</li>
                                <li>• SSL, custom domain, CDN</li>
                                <li>• Built for users, not just yourself</li>
                            </ul>
                        </div>
                    </div>

                    <div className="reveal mt-10 max-w-2xl w-full border border-[#7eb8e0]/15 bg-[#7eb8e0]/3 p-5 text-left backdrop-blur-sm">
                        <p className="text-[#7eb8e0]/55 text-[0.62rem] tracking-[0.3em] uppercase mb-3">The Golden Rule of Deployment</p>
                        <p className="text-ash/52 text-sm leading-relaxed">
                            <strong className="text-ash/78">Order matters.</strong> Deploy the backend first, capture its URL,
                            then deploy the Vue frontend with that URL as an environment variable.
                            Then go back and update CORS on the backend with the frontend&apos;s URL.
                            This dance is normal. You will do it many times.
                        </p>
                    </div>

                    <div className="reveal mt-8 rune-line font-serif text-[#7eb8e0]/35 text-[0.7rem] tracking-[0.35em] uppercase">env.init()</div>
                </section>

                {/* ══════════════════════════════════════════
                    ORDER OF OPERATIONS
                ══════════════════════════════════════════ */}
                <section id="order-of-ops" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#7eb8e0]/50 mb-4">Section 2 — The Sequence</p>
                    <h2 className="reveal font-serif text-[#7eb8e0] uppercase tracking-widest text-3xl md:text-5xl">Order of Operations</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        Deployment is a three-act play. Each step depends on the one before it.
                        Following the wrong order is the most common source of production bugs.
                    </p>

                    <div className="reveal mt-10 max-w-2xl w-full space-y-3 text-left">
                        {[
                            { n: '01', title: 'Deploy the Backend on Render', desc: 'Push your Express server to Render first. Get a live URL like https://my-api.onrender.com. Keep this URL — you will need it for the Vue frontend.' },
                            { n: '02', title: 'Deploy the Vue Frontend on Vercel', desc: 'Push your Vue + Vite app to Vercel. Set VITE_API_URL to your Render URL as an environment variable during deployment.' },
                            { n: '03', title: 'Update CORS on the Backend', desc: 'After Vercel gives you a URL (https://my-vue-app.vercel.app), add it to your Express server\'s CORS allowlist. Re-deploy the backend.' },
                            { n: '04', title: 'Verify the Full Stack', desc: 'Open your Vercel URL. Every API call should flow: browser → Vercel (Vue.js) → Render (Express) → data back to the browser.' },
                        ].map(r => (
                            <div key={r.n} className="flex gap-4 border border-[#7eb8e0]/10 hover:border-[#7eb8e0]/25 transition-colors p-4 backdrop-blur-sm">
                                <span className="font-serif text-[#7eb8e0]/22 text-base leading-none mt-0.5 shrink-0">{r.n}</span>
                                <div>
                                    <span className="text-ash/80 text-sm font-medium block mb-1">{r.title}</span>
                                    <p className="text-ash/42 text-xs leading-relaxed">{r.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="reveal mt-8 max-w-2xl w-full border border-[#7eb8e0]/15 bg-[#7eb8e0]/5 p-5 text-left backdrop-blur-sm">
                        <p className="text-[#7eb8e0]/60 text-[0.62rem] tracking-[0.3em] uppercase mb-2">The Data Flow</p>
                        <div className="code-block text-center">
                            <pre>{`Browser  ──►  Vercel (Vue.js)  ──►  Render (Express)  ──►  Data

  1. User visits your Vercel URL
  2. Vue app loads in the browser
  3. Vue app calls VITE_API_URL (your Render URL)
  4. Express handles the request and responds
  5. Vue renders the data reactively on the page`}</pre>
                        </div>
                    </div>

                    <div className="reveal mt-8 rune-line font-serif text-[#7eb8e0]/35 text-[0.7rem] tracking-[0.35em] uppercase">flow.connect()</div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 3 — BACKEND ON RENDER
                ══════════════════════════════════════════ */}
                <section id="backend-render" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#7eb8e0]/50 mb-4">Section 3 — The Engine Room</p>
                    <h2 className="reveal font-serif text-[#7eb8e0] uppercase tracking-widest text-3xl md:text-5xl">Deploy Backend on Render</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        <span className="badge-render">RENDER</span> Render is a cloud platform that hosts backend services.
                        It connects to your GitHub repository, builds your code, and gives you a public URL.
                        The free tier is perfect for learning — your server will spin down after inactivity and wake up on demand.
                    </p>

                    <div className="reveal mt-10 max-w-2xl w-full space-y-5 text-left">

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">1</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-2">Push your Express code to GitHub</p>
                                <p className="text-ash/38 text-xs mb-2">Render needs a repository to deploy from. Make sure your Express project has a <code className="text-[#7eb8e0]/55">package.json</code> with a <code className="text-[#7eb8e0]/55">start</code> script.</p>
                                <div className="code-label">package.json — make sure this exists</div>
                                <div className="code-block">
                                    <pre>{`{
  "name": "my-rest-api",
  "scripts": {
    "start": "node index.js"   // ← Render runs this
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}`}</pre>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">2</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-2">Create a Render Web Service</p>
                                <p className="text-ash/38 text-xs mb-2">Log in to <a href="https://render.com" target="_blank" rel="noopener noreferrer" className="text-[#7eb8e0]/55 underline">render.com</a>, click <strong className="text-ash/65">New + → Web Service</strong>, and connect your GitHub repo.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">3</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-1">Configure Deployment Settings</p>
                                <p className="text-ash/38 text-xs mb-2">Set the following in the Render dashboard:</p>
                                <div className="border border-[#7eb8e0]/12 bg-black/50 p-4 text-xs font-mono">
                                    <div className="text-[#7eb8e0]/65">Name: <span className="text-ash/65">my-rest-api</span></div>
                                    <div className="text-[#7eb8e0]/65">Runtime: <span className="text-ash/65">Node</span></div>
                                    <div className="text-[#7eb8e0]/65">Build Command: <span className="text-ash/65">npm install</span></div>
                                    <div className="text-[#7eb8e0]/65">Start Command: <span className="text-ash/65">node index.js (or npm start)</span></div>
                                    <div className="text-[#7eb8e0]/65">Plan: <span className="text-ash/65">Free</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">4</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-2">Add CORS middleware (before deploy)</p>
                                <p className="text-ash/38 text-xs mb-2">Your Express app needs CORS configured to allow requests from your frontend URL. Install <code className="text-[#7eb8e0]/55">cors</code> and configure it:</p>
                                <div className="code-label">Terminal</div>
                                <div className="code-block">
                                    <div><span className="code-comment">$ </span>npm install cors</div>
                                </div>
                                <div className="mt-2 code-label">index.js — CORS setup</div>
                                <div className="code-block">
                                    <pre>{`const cors = require('cors');

// Allow requests from your Vercel Vue frontend
// Start with a wildcard for testing, then lock it down
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-vue-app.vercel.app', // ← replace after Vercel deploy
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));`}</pre>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">5</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-2">Deploy and capture the URL</p>
                                <p className="text-ash/38 text-xs mb-2">Click <strong className="text-ash/65">Deploy</strong>. Render will build and start your server. After a minute, your API will be live at a URL like:</p>
                                <div className="code-block">
                                    <pre className="text-[#46cf89]">https://my-rest-api.onrender.com</pre>
                                </div>
                                <p className="text-ash/38 text-xs mt-2">Test it by visiting <code className="text-[#7eb8e0]/55">https://my-rest-api.onrender.com/api/users</code> in your browser.</p>
                            </div>
                        </div>
                    </div>

                    <div className="reveal mt-8 rune-line font-serif text-[#7eb8e0]/35 text-[0.7rem] tracking-[0.35em] uppercase">render.deploy()</div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 4 — VUE FRONTEND ON VERCEL
                ══════════════════════════════════════════ */}
                <section id="frontend-vercel" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#7eb8e0]/50 mb-4">Section 4 — The Face of the Web</p>
                    <h2 className="reveal font-serif text-[#7eb8e0] uppercase tracking-widest text-3xl md:text-5xl">Deploy Vue.js on Vercel</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        <span className="badge-vue">VUE</span> Vercel supports Vue.js out of the box.
                        It detects your Vite-powered Vue project, builds it, and deploys it with automatic SSL and a global CDN.
                        Your Vue app will be live in under a minute.
                    </p>

                    <div className="reveal mt-10 max-w-2xl w-full space-y-5 text-left">

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">1</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-2">Create a Vue + Vite project</p>
                                <p className="text-ash/38 text-xs mb-2">If you haven&apos;t already, scaffold a Vue project with Vite:</p>
                                <div className="code-label">Terminal</div>
                                <div className="code-block">
                                    <pre>{`npm create vue@latest my-vue-app
cd my-vue-app
npm install`}</pre>
                                </div>
                                <p className="text-ash/38 text-xs mt-2">Select TypeScript, Router, Pinia if you want — or keep it minimal.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">2</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-2">Push your Vue app to GitHub</p>
                                <p className="text-ash/38 text-xs mb-2">Vercel needs a repository. Push your project to GitHub.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">3</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-1">Import the repo on Vercel</p>
                                <p className="text-ash/38 text-xs mb-2">Go to <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#7eb8e0]/55 underline">vercel.com</a>, click <strong className="text-ash/65">Add New → Project</strong>, and import your GitHub repository. Vercel automatically detects Vue.js and sets the build command to <code className="text-[#7eb8e0]/55">npm run build</code>.</p>
                                <div className="border border-[#7eb8e0]/12 bg-black/50 p-4 text-xs font-mono">
                                    <div className="text-[#7eb8e0]/65">Framework Preset: <span className="text-[#42b883]">Vue.js</span></div>
                                    <div className="text-[#7eb8e0]/65">Build Command: <span className="text-ash/65">npm run build</span></div>
                                    <div className="text-[#7eb8e0]/65">Output Directory: <span className="text-ash/65">dist</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">4</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-1">Set the Environment Variable</p>
                                <p className="text-ash/38 text-xs mb-2">This is the critical step. Add the Render URL as <code className="text-[#7eb8e0]/55">VITE_API_URL</code> in the Vercel dashboard:</p>
                                <div className="border border-[#7eb8e0]/12 bg-black/50 p-4 text-xs font-mono">
                                    <div className="text-[#7eb8e0]/65">Name: <span className="text-[#e8a87c]">VITE_API_URL</span></div>
                                    <div className="text-[#7eb8e0]/65">Value: <span className="text-[#46cf89]">https://my-rest-api.onrender.com</span></div>
                                </div>
                                <p className="text-ash/38 text-xs mt-2">The <code className="text-[#7eb8e0]/55">VITE_</code> prefix tells Vite to expose this variable to the browser at build time.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">5</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-2">Use the env variable in your Vue components</p>
                                <p className="text-ash/38 text-xs mb-2">In your Vue components, use <code className="text-[#7eb8e0]/55">import.meta.env.VITE_API_URL</code> instead of hardcoding the URL:</p>
                                <div className="code-label">Example — using import.meta.env</div>
                                <div className="code-block">
                                    <pre>{`// ✅ Correct — uses the env variable
const API_URL = import.meta.env.VITE_API_URL;

const response = await fetch(\`\${API_URL}/api/users\`);
const data = await response.json();

// ❌ Wrong — never hardcode the URL
// const response = await fetch('http://localhost:5173/api/users');`}</pre>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">6</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-2">Deploy and capture the URL</p>
                                <p className="text-ash/38 text-xs mb-2">Click <strong className="text-ash/65">Deploy</strong>. Vercel will build your Vue app and give you a URL like:</p>
                                <div className="code-block">
                                    <pre className="text-[#fff]">https://my-vue-app.vercel.app</pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="reveal mt-8 rune-line font-serif text-[#7eb8e0]/35 text-[0.7rem] tracking-[0.35em] uppercase">vercel.deploy()</div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 5 — CORS & CONNECTION
                ══════════════════════════════════════════ */}
                <section id="cors" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#7eb8e0]/50 mb-4">Section 5 — The Handshake</p>
                    <h2 className="reveal font-serif text-[#7eb8e0] uppercase tracking-widest text-3xl md:text-5xl">CORS — Wiring It Together</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        <strong className="text-[#7eb8e0]/80">CORS</strong> (Cross-Origin Resource Sharing) is the browser&apos;s security mechanism
                        that blocks requests from one domain to another unless explicitly allowed.
                        Your Vercel Vue frontend and Render backend are on <strong className="text-ash/80">different domains</strong> — CORS must be configured.
                    </p>

                    <div className="reveal mt-10 max-w-2xl w-full space-y-5 text-left">

                        <div className="border border-[#7eb8e0]/15 bg-[#7eb8e0]/3 p-6 backdrop-blur-sm">
                            <p className="text-[#7eb8e0]/55 text-[0.62rem] tracking-[0.3em] uppercase mb-3">The Problem</p>
                            <p className="text-ash/52 text-sm leading-relaxed mb-4">
                                When your Vue frontend (on <code className="text-[#7eb8e0]/55">https://my-vue-app.vercel.app</code>) tries to fetch data from
                                your Express backend (on <code className="text-[#7eb8e0]/55">https://my-api.onrender.com</code>), the browser blocks the request
                                because they are different origins. CORS headers tell the browser: <em className="text-ash/65">&ldquo;This cross-origin request is allowed.&rdquo;</em>
                            </p>
                        </div>

                        <div className="border border-[#7eb8e0]/15 bg-[#7eb8e0]/5 p-6 backdrop-blur-sm">
                            <p className="text-[#7eb8e0]/55 text-[0.62rem] tracking-[0.3em] uppercase mb-3">The Solution — Update CORS on Express</p>
                            <p className="text-ash/38 text-xs mb-2">After Vercel gives you your Vue app URL, go back to your Express code and update the allowed origins:</p>
                            <div className="code-label">index.js — final CORS config</div>
                            <div className="code-block">
                                <pre>{`const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',                // local Vite dev
  'https://my-vue-app.vercel.app',        // ← your Vercel URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));`}</pre>
                            </div>
                        </div>

                        <div className="border border-[#7eb8e0]/15 bg-black/50 p-5 backdrop-blur-sm">
                            <p className="text-[#7eb8e0]/55 text-[0.62rem] tracking-[0.3em] uppercase mb-3">Quick Tip — Using an ENV Variable for Origins</p>
                            <p className="text-ash/52 text-sm leading-relaxed">
                                Instead of hardcoding the allowed origins, use an environment variable.
                                On Render, set <code className="text-[#7eb8e0]/55">ALLOWED_ORIGINS</code> to your Vercel URL so you can update it without changing code:
                            </p>
                            <div className="code-block mt-3">
                                <pre>{`const allowedOrigins = (
  process.env.ALLOWED_ORIGINS || 'http://localhost:5173'
).split(',');`}</pre>
                            </div>
                        </div>
                    </div>

                    <div className="reveal mt-8 rune-line font-serif text-[#7eb8e0]/35 text-[0.7rem] tracking-[0.35em] uppercase">cors.accept()</div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 6 — ENVIRONMENT VARIABLES
                ══════════════════════════════════════════ */}
                <section id="env-vars" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#7eb8e0]/50 mb-4">Section 6 — The Secrets</p>
                    <h2 className="reveal font-serif text-[#7eb8e0] uppercase tracking-widest text-3xl md:text-5xl">Environment Variables</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        Environment variables keep configuration <strong className="text-ash/80">outside your code</strong>.
                        The same codebase can run in development, staging, and production — just by changing the values in the environment.
                    </p>

                    <div className="reveal mt-10 max-w-2xl w-full space-y-4 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { badge: 'badge-env', var: 'VITE_API_URL', where: 'Vercel dashboard', note: 'Used in browser (prefix VITE_). Points to your Render API. Accessed via import.meta.env.VITE_API_URL.' },
                                { badge: 'badge-env', var: 'ALLOWED_ORIGINS', where: 'Render dashboard', note: 'List of allowed CORS origins. Includes your Vercel URL.' },
                                { badge: 'badge-env', var: 'PORT', where: 'Render (auto-set)', note: 'Render sets this automatically. Your Express app should use it.' },
                                { badge: 'badge-env', var: 'DATABASE_URL', where: 'Render dashboard', note: 'Optional — connection string to your production database.' },
                            ].map(v => (
                                <div key={v.var} className="border border-[#7eb8e0]/12 bg-[#7eb8e0]/3 p-4">
                                    <span className={`${v.badge} mb-2 inline-block`}>ENV</span>
                                    <code className="text-[#7eb8e0]/75 text-xs block mb-1">{v.var}</code>
                                    <span className="text-ash/38 text-[0.58rem] uppercase tracking-widest block mb-1">Set in: {v.where}</span>
                                    <p className="text-ash/42 text-[0.62rem] leading-relaxed">{v.note}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border border-[#7eb8e0]/15 bg-[#7eb8e0]/5 p-5 backdrop-blur-sm">
                            <p className="text-[#7eb8e0]/55 text-[0.62rem] tracking-[0.3em] uppercase mb-3">Local Development with .env</p>
                            <p className="text-ash/38 text-xs mb-2">For local development, create a <code className="text-[#7eb8e0]/55">.env</code> file in your Vue project root:</p>
                            <div className="code-block">
                                <pre>{`# .env (Vue project root — NOT committed to git)
VITE_API_URL=http://localhost:3000`}</pre>
                            </div>
                            <p className="text-ash/38 text-xs mt-2">
                                Vite automatically loads <code className="text-[#7eb8e0]/55">.env</code> files. Add <code className="text-[#7eb8e0]/55">.env</code> to <code className="text-[#7eb8e0]/55">.gitignore</code> to keep secrets out of version control.
                                You can also use <code className="text-[#7eb8e0]/55">.env.local</code>, <code className="text-[#7eb8e0]/55">.env.development</code>, or <code className="text-[#7eb8e0]/55">.env.production</code> for different environments.
                            </p>
                        </div>

                        <div className="border border-[#7eb8e0]/15 bg-black/50 p-5 backdrop-blur-sm">
                            <p className="text-[#7eb8e0]/55 text-[0.62rem] tracking-[0.3em] uppercase mb-3">Important — VITE_ Prefix Rules</p>
                            <ul className="text-ash/48 text-xs space-y-2">
                                <li><span className="text-[#46cf89]">✦</span> Variables with <code className="text-[#7eb8e0]/55">VITE_</code> prefix are <strong className="text-ash/65">exposed to the browser</strong> at build time via <code className="text-[#7eb8e0]/55">import.meta.env</code>.</li>
                                <li><span className="text-[#46cf89]">✦</span> Variables <strong className="text-ash/65">without</strong> the prefix are <strong className="text-ash/65">server-side only</strong> in Vite's SSR mode — never exposed to the client.</li>
                                <li><span className="text-[#46cf89]">✦</span> For pure client-side Vue apps (SPA), <code className="text-[#7eb8e0]/55">VITE_</code> variables are inlined at build time — after changing them, you must rebuild and re-deploy.</li>
                                <li><span className="text-[#46cf89]">✦</span> Access them in your Vue components as <code className="text-[#7eb8e0]/55">import.meta.env.VITE_API_URL</code> — never use <code className="text-[#7eb8e0]/55">process.env</code> in Vue.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="reveal mt-8 rune-line font-serif text-[#7eb8e0]/35 text-[0.7rem] tracking-[0.35em] uppercase">env.load()</div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 7 — COMMON GOTCHAS
                ══════════════════════════════════════════ */}
                <section id="gotchas" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#7eb8e0]/50 mb-4">Section 7 — The Pitfalls</p>
                    <h2 className="reveal font-serif text-[#7eb8e0] uppercase tracking-widest text-3xl md:text-5xl">Common Gotchas</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        Even experienced developers hit these. Read them now, save hours of debugging later.
                    </p>

                    <div className="reveal mt-10 max-w-2xl w-full space-y-3 text-left">
                        {[
                            {
                                badge: 'badge-warn', title: 'Render Free Tier Sleep',
                                desc: 'On Render\'s free tier, your Express server spins down after 15 minutes of inactivity. The first request after idle time takes 30–60 seconds to wake up. Solutions: upgrade to a paid plan, or set up a cron job to ping your server every 10 minutes.',
                                sol: 'Use cron-job.org or UptimeRobot to ping https://my-api.onrender.com every 10 min.',
                            },
                            {
                                badge: 'badge-warn', title: 'Hardcoded Backend URLs',
                                desc: 'Never hardcode http://localhost:3000 in your Vue components. Always use import.meta.env.VITE_API_URL so you can switch between local, staging, and production without editing code.',
                                sol: 'Use .env for dev, Vercel env vars for production.',
                            },
                            {
                                badge: 'badge-warn', title: 'CORS Not Configured',
                                desc: 'If your Vue app can\'t reach the backend, open the browser console. If you see a CORS error, your backend\'s allowed origins list doesn\'t include your frontend URL.',
                                sol: 'Add the exact Vercel URL to your Express CORS allowlist and re-deploy.',
                            },
                            {
                                badge: 'badge-warn', title: 'VITE_ vs process.env Confusion',
                                desc: 'Vue + Vite uses import.meta.env, not process.env. If you try to use process.env.VITE_API_URL in the browser, it will be undefined. Always use import.meta.env for client-side env vars.',
                                sol: 'Use import.meta.env.VITE_API_URL in all Vue components.',
                            },
                            {
                                badge: 'badge-warn', title: 'Hash Router vs History Mode',
                                desc: 'If you use Vue Router in history mode, refreshing a non-root page on Vercel will return a 404. Vercel serves index.html for all routes via a rewrite rule — but you must configure it.',
                                sol: 'Add vercel.json: { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }',
                            },
                        ].map(g => (
                            <div key={g.title} className="flex gap-4 border border-[#7eb8e0]/10 hover:border-[#7eb8e0]/25 transition-colors p-4 backdrop-blur-sm">
                                <span className={`${g.badge} shrink-0 self-start mt-0.5`}>!</span>
                                <div>
                                    <span className="text-ash/80 text-sm font-medium block mb-1">{g.title}</span>
                                    <p className="text-ash/42 text-xs leading-relaxed mb-2">{g.desc}</p>
                                    <div className="border-l-2 border-[#46cf89]/30 pl-3">
                                        <span className="text-[#46cf89]/55 text-[0.58rem] uppercase tracking-widest block">Fix</span>
                                        <p className="text-ash/38 text-[0.62rem] leading-relaxed">{g.sol}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="reveal mt-8 rune-line font-serif text-[#7eb8e0]/35 text-[0.7rem] tracking-[0.35em] uppercase">debug.catch()</div>
                </section>

                {/* ══════════════════════════════════════════
                    RESONANCE — CLOSING
                ══════════════════════════════════════════ */}
                <section id="resonance" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 gap-5">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#7eb8e0]/50">Codex Final — Going Live with Vue</p>
                    <div ref={statusBoxRef} className="reveal status-box font-serif text-[#7eb8e0] text-[0.82rem] tracking-[0.32em] uppercase px-10 py-4">
                        DEPLOYING...
                    </div>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] max-w-lg">
                        The backend lives on Render. The Vue frontend breathes on Vercel.
                        CORS shakes hands across the wire. Environment variables carry your secrets.
                        Your Vue stack is no longer local — it is alive, accessible, real.
                    </p>

                    <div className="reveal mt-4 max-w-2xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                        {[
                            { n: '01–02', title: 'Backend → Render', note: 'Deploy Express first. Capture the URL. This is your API endpoint.' },
                            { n: '03–04', title: 'Vue App → Vercel', note: 'Deploy Vue + Vite with VITE_API_URL pointing to your Render URL.' },
                            { n: '05–06', title: 'CORS & Secrets', note: 'Update CORS with Vercel URL. Use env vars to keep config fluid.' },
                        ].map(s => (
                            <div key={s.n} className="border border-[#7eb8e0]/15 bg-[#7eb8e0]/3 p-4">
                                <span className="text-[#7eb8e0]/32 font-serif text-[0.58rem] tracking-[0.3em] uppercase block mb-1">{s.n}</span>
                                <span className="text-ash/72 text-sm font-medium block mb-1.5">{s.title}</span>
                                <p className="text-ash/38 text-xs leading-relaxed">{s.note}</p>
                            </div>
                        ))}
                    </div>

                    <div className="reveal max-w-2xl w-full border border-[#7eb8e0]/15 bg-[#7eb8e0]/3 p-5 text-left">
                        <p className="text-[#7eb8e0]/55 text-[0.62rem] tracking-[0.3em] uppercase mb-3">Next Steps</p>
                        <p className="text-ash/48 text-sm leading-relaxed">
                            Now that your Vue app is live, explore: setting up a <strong className="text-ash/75">custom domain</strong>,
                            adding <strong className="text-ash/75">SSL certificates</strong> (automatic on Vercel),
                            configuring a <strong className="text-ash/75">CI/CD pipeline</strong> for automatic deploys on every git push,
                            and adding <strong className="text-ash/75">Vue Router</strong> with history mode for multi-page navigation.
                        </p>
                    </div>

                    <div className="reveal rune-line font-serif text-[#7eb8e0]/35 text-[0.7rem] tracking-[0.35em] uppercase mt-2">vue.live()</div>
                </section>

            </main>
        </div>
    );
};

export default DeploymentScene;
