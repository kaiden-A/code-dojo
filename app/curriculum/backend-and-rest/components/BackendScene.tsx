"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

const BackendScene = () => {
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
                if (statusBoxRef.current) { statusBoxRef.current.textContent = 'CONNECTION ESTABLISHED ✦'; statusBoxRef.current.classList.add('ignited'); }
                manaBloomRef.current?.classList.add('active');
            },
            onLeaveBack: () => {
                if (statusBoxRef.current) { statusBoxRef.current.textContent = 'INITIATING HANDSHAKE...'; statusBoxRef.current.classList.remove('ignited'); }
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
        <div className="bg-ink text-ash selection:bg-primary/30 selection:text-primary cursor-none overflow-x-hidden">
            <style jsx global>{`
                :root { --node: #eabf8d; --primary: #eabf8d; }
                .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.9s ease, transform 0.9s ease; }
                .reveal.visible { opacity: 1; transform: translateY(0); }
                .status-box { border: 1px solid rgba(234,191,141,0.35); background: rgba(234,191,141,0.03); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); }
                .status-box.ignited { border-color: rgba(234,191,141,0.8) !important; color: #eabf8d !important; box-shadow: 0 0 35px rgba(234,191,141,0.25), 0 0 80px rgba(234,191,141,0.15); }
                @keyframes sigil-pulse {
                    0%, 100% { opacity: 0.15; transform: translate(-50%,-50%) scale(1); }
                    50% { opacity: 0.35; transform: translate(-50%,-50%) scale(1.05); }
                }
                .sigil-glow { position: fixed; top: 50%; left: 50%; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(circle, rgba(234,191,141,0.15) 0%, rgba(234,191,141,0.05) 50%, transparent 72%); pointer-events: none; z-index: 0; animation: sigil-pulse 3.5s ease-in-out infinite; filter: blur(22px); }
                .mana-bloom { position: fixed; top: 50%; left: 50%; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(234,191,141,0.18) 0%, rgba(234,191,141,0.08) 45%, transparent 72%); pointer-events: none; z-index: 0; filter: blur(40px); opacity: 0; transform: translate(-50%,-50%) scale(0.6); transition: opacity 1.5s ease, transform 1.5s cubic-bezier(0.23, 1, 0.32, 1); }
                .mana-bloom.active { opacity: 1; transform: translate(-50%,-50%) scale(1.15); }
                .rune-line::before, .rune-line::after { content: ''; display: inline-block; width: 46px; height: 1px; background: var(--node); opacity: 0.35; vertical-align: middle; margin: 0 10px; }
                @keyframes glow-pulse { 0% { text-shadow: 0 0 4px rgba(234,191,141,0.15); } 100% { text-shadow: 0 0 22px rgba(234,191,141,0.65), 0 0 48px rgba(234,191,141,0.18); } }
                .glow-text { animation: glow-pulse 2.6s ease-in-out infinite alternate; }
                @keyframes bob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
                .scroll-hint { animation: bob 2.3s ease-in-out infinite; }
                .code-block { background: rgba(0,0,0,0.65); border: 1px solid rgba(234,191,141,0.12); padding: 1.1rem 1.4rem; font-family: 'Courier New', monospace; font-size: 0.7rem; line-height: 1.85; overflow-x: auto; text-align: left; color: #eabf8d; }
                .code-block pre { margin: 0; white-space: pre; color: #eabf8d; font-family: inherit; font-size: inherit; line-height: inherit; }
                .code-comment { color: rgba(234,191,141,0.28); }
                .code-label { display: flex; align-items: center; gap: 8px; font-size: 0.58rem; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(234,191,141,0.38); margin-bottom: 0.4rem; font-family: 'Courier New', monospace; }
                .code-label::after { content: ''; flex: 1; height: 1px; background: rgba(234,191,141,0.1); }
                .step-num { display: inline-flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border: 1px solid rgba(234,191,141,0.25); font-size: 0.62rem; font-family: serif; color: rgba(234,191,141,0.6); flex-shrink: 0; }
                .method-badge { display: inline-block; font-family: 'Courier New', monospace; font-size: 0.6rem; font-weight: bold; letter-spacing: 0.06em; padding: 2px 7px; border: 1px solid currentColor; }
                .m-get { color: #5fa8d3; border-color: rgba(95,168,211,0.45); }
                .m-post { color: #7ec8a0; border-color: rgba(126,200,160,0.45); }
                .m-put { color: #e8a87c; border-color: rgba(232,168,124,0.45); }
                .m-patch { color: #b8a8e8; border-color: rgba(184,168,232,0.45); }
                .m-delete { color: #e87c7c; border-color: rgba(232,124,124,0.45); }
            `}</style>

            {/* Fixed UI */}
            <div ref={progressBarRef} className="fixed top-0 left-0 h-px bg-linear-to-r from-transparent via-[#eabf8d] to-transparent z-[200] w-0 transition-[width] duration-100 linear" />
            <div className="fixed inset-0 z-1 pointer-events-none bg-size-[42px_62px] bg-[linear-gradient(to_right,rgba(234,191,141,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,191,141,0.03)_1px,transparent_1px)]" />
            <div className="fixed inset-0 z-1 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
            <div className="sigil-glow" />
            <div ref={manaBloomRef} className="mana-bloom" />
            <div ref={cursorDotRef} className="fixed w-2 h-2 rounded-full bg-[#eabf8d] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#eabf8d,0_0_22px_rgba(234,191,141,0.45)] will-change-transform" />
            <div ref={cursorRingRef} className="fixed w-7.5 h-7.5 rounded-full border border-[rgba(234,191,141,0.45)] pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform" />

            <span className="fixed top-6 right-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#eabf8d] opacity-[0.18] z-10">SERVER</span>
            <span className="fixed bottom-6 left-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#eabf8d] opacity-[0.18] z-10">REST</span>
            <span className="fixed bottom-6 right-6 font-serif text-[0.58rem] tracking-[0.22em] text-[#eabf8d] opacity-[0.18] z-10">§ V.V</span>

            <main className="relative z-10 lg:pl-32">

                {/* ══════════════════════════════════════════
                    HERO
                ══════════════════════════════════════════ */}
                <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 relative">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Module IV · Part 1 — The Invisible Half</p>
                    <h1 className="reveal glow-text font-serif text-[#eabf8d] uppercase tracking-widest text-5xl md:text-7xl xl:text-[5.5rem] leading-none">Backend &amp; REST</h1>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-lg">
                        The frontend is the face. The backend is the mind — receiving, processing, storing, and responding.
                        Every click hides a conversation. Here, you learn its language.
                    </p>
                    <div className="reveal mt-8 grid grid-cols-2 md:grid-cols-5 gap-2 max-w-2xl w-full">
                        {['Backend Basics', 'REST API', 'Node.js & Express', 'CRUD Routes', 'Postman Testing'].map((s, i) => (
                            <div key={i} className="border border-[#eabf8d]/15 bg-[#eabf8d]/3 py-2.5 px-3">
                                <span className="text-[#eabf8d]/35 font-serif text-[0.52rem] tracking-[0.3em] uppercase block">{String(i + 1).padStart(2, '0')}</span>
                                <span className="text-ash/55 text-[0.62rem] tracking-wide block mt-1">{s}</span>
                            </div>
                        ))}
                    </div>
                    <div className="reveal mt-8 rune-line font-serif text-[#eabf8d]/35 text-[0.7rem] tracking-[0.35em] uppercase">server.init()</div>
                    <div className="scroll-hint absolute bottom-10 left-1/2 flex flex-col items-center gap-2 pointer-events-none">
                        <span className="text-[#eabf8d]/30 font-sans text-[0.58rem] tracking-[0.42em] uppercase">Descend</span>
                        <div className="w-[1px] h-[42px] bg-gradient-to-b from-[#eabf8d] to-transparent" />
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 1 — WHAT IS A BACKEND?
                ══════════════════════════════════════════ */}
                <section id="what-is-backend" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Section 1 — The Invisible Architecture</p>
                    <h2 className="reveal font-serif text-[#eabf8d] uppercase tracking-widest text-3xl md:text-5xl">What is a Backend?</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        Think of a restaurant. The <strong className="text-[#eabf8d]/80">frontend</strong> is the dining area — menus, waitstaff, the table you sit at.
                        The <strong className="text-[#eabf8d]/80">backend</strong> is the kitchen — where orders are processed, food is prepared, and the real work happens.
                        Guests never see the kitchen, but every meal depends on it.
                    </p>

                    <div className="reveal mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl w-full">
                        <div className="border border-[#eabf8d]/20 bg-[#eabf8d]/5 p-6 backdrop-blur-sm text-left">
                            <span className="text-[#eabf8d] text-[0.6rem] tracking-[0.35em] uppercase font-bold block mb-3">Frontend (Client)</span>
                            <p className="text-ash/65 text-sm leading-relaxed mb-4">What the user <strong className="text-ash/85">sees and touches</strong>. Runs inside the browser on the user's device.</p>
                            <ul className="text-ash/45 text-xs space-y-1.5">
                                <li>• HTML, CSS, JavaScript</li>
                                <li>• Sends HTTP requests to the server</li>
                                <li>• Displays the data it receives back</li>
                                <li>• Examples: React, Vue, plain HTML pages</li>
                            </ul>
                        </div>
                        <div className="border border-[#eabf8d]/30 bg-[#eabf8d]/8 p-6 backdrop-blur-sm text-left">
                            <span className="text-[#eabf8d] text-[0.6rem] tracking-[0.35em] uppercase font-bold block mb-3">Backend (Server)</span>
                            <p className="text-ash/65 text-sm leading-relaxed mb-4">What <strong className="text-ash/85">processes and responds</strong>. Runs on a remote machine 24/7.</p>
                            <ul className="text-ash/45 text-xs space-y-1.5">
                                <li>• Node.js, Python, Java, Go, PHP</li>
                                <li>• Applies your business logic</li>
                                <li>• Connects to databases</li>
                                <li>• Returns structured data — usually JSON</li>
                            </ul>
                        </div>
                    </div>

                    <div className="reveal mt-8 rune-line font-serif text-[#eabf8d]/35 text-[0.7rem] tracking-[0.35em] uppercase">listen()</div>
                </section>

                {/* ══════════════════════════════════════════
                    CORE RESPONSIBILITIES
                ══════════════════════════════════════════ */}
                <section id="responsibilities" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Section 1 — Continued</p>
                    <h2 className="reveal font-serif text-[#eabf8d] uppercase tracking-widest text-3xl md:text-5xl">Core Responsibilities</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        Every backend server handles five core duties on each request. Understanding these gives you a mental model for any backend system you encounter.
                    </p>

                    <div className="reveal mt-10 max-w-2xl w-full space-y-3 text-left">
                        {[
                            { n: '01', title: 'Receive & Process HTTP Requests', desc: 'Listens for incoming requests from browsers, mobile apps, or other servers. Each request has a method (GET, POST…) and a URL.' },
                            { n: '02', title: 'Query & Write to Databases', desc: 'Reads and stores data in databases — MySQL, MongoDB, PostgreSQL, SQLite. The backend is the only layer that should touch the database directly.' },
                            { n: '03', title: 'Enforce Business Rules', desc: 'Applies logic: "users can only edit their own posts", "free accounts have a 5 upload limit", input validation, rate limiting.' },
                            { n: '04', title: 'Handle Auth & Authorisation', desc: 'Verifies who the user is (authentication) and what they are allowed to do (authorisation). Usually via tokens or sessions.' },
                            { n: '05', title: 'Return Structured Responses', desc: 'Sends JSON back to the frontend — success data, error messages, and an HTTP status code that tells the client what happened.' },
                        ].map(r => (
                            <div key={r.n} className="flex gap-4 border border-[#eabf8d]/10 hover:border-[#eabf8d]/25 transition-colors p-4 backdrop-blur-sm">
                                <span className="font-serif text-[#eabf8d]/22 text-base leading-none mt-0.5 shrink-0">{r.n}</span>
                                <div>
                                    <span className="text-ash/80 text-sm font-medium block mb-1">{r.title}</span>
                                    <p className="text-ash/42 text-xs leading-relaxed">{r.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="reveal mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl w-full">
                        {[
                            { lang: 'Node.js', note: 'Same language as the frontend. Fast, non-blocking I/O. Our choice for this module.' },
                            { lang: 'Python', note: 'Great for data-heavy apps. Popular frameworks: Django, FastAPI, Flask.' },
                            { lang: 'Java', note: 'Enterprise-grade, robust and mature. Main framework: Spring Boot.' },
                            { lang: 'Go / PHP', note: 'Go excels at performance & concurrency. PHP powers a huge portion of legacy web.' },
                        ].map(l => (
                            <div key={l.lang} className="border border-[#eabf8d]/10 p-4 text-left hover:border-[#eabf8d]/28 transition-colors">
                                <span className="text-[#eabf8d] text-sm font-serif block mb-1.5">{l.lang}</span>
                                <p className="text-ash/38 text-[0.68rem] leading-relaxed">{l.note}</p>
                            </div>
                        ))}
                    </div>
                    <div className="reveal mt-8 rune-line font-serif text-[#eabf8d]/35 text-[0.7rem] tracking-[0.35em] uppercase">process(req)</div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 2 — REST API FUNDAMENTALS
                ══════════════════════════════════════════ */}
                <section id="rest-api" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Section 2 — The Universal Tongue</p>
                    <h2 className="reveal font-serif text-[#eabf8d] uppercase tracking-widest text-3xl md:text-5xl">REST API</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        <strong className="text-[#eabf8d]/80">REST</strong> stands for <strong className="text-ash/80">Representational State Transfer</strong>.
                        It is a set of design principles for building web APIs — a shared convention so different systems can communicate over HTTP without custom agreements.
                    </p>

                    <div className="reveal mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl w-full text-left">
                        {[
                            { title: 'Stateless', desc: 'Each request must carry all the information the server needs. No session is stored between calls — the server treats every request as brand new.' },
                            { title: 'Resource-Based', desc: 'Everything is a "resource" — a user, a post, an order. Each resource is identified by a URL: /api/users/42 is user number 42.' },
                            { title: 'Standard HTTP Methods', desc: 'Actions are expressed using HTTP verbs: GET to read, POST to create, PUT to replace, PATCH to update part, DELETE to remove.' },
                            { title: 'JSON Responses', desc: 'Responses are structured as JSON — a lightweight text format that both humans and machines can read and parse easily.' },
                        ].map(p => (
                            <div key={p.title} className="border border-[#eabf8d]/15 bg-[#eabf8d]/3 p-5 backdrop-blur-sm">
                                <span className="text-[#eabf8d] text-[0.62rem] tracking-[0.3em] uppercase font-bold block mb-2">{p.title}</span>
                                <p className="text-ash/52 text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="reveal mt-8 max-w-xl w-full text-left">
                        <div className="code-label">What a REST exchange looks like</div>
                        <div className="code-block">
                            <pre>{`// The browser (client) sends a request:
GET /api/users/42 HTTP/1.1
Host: api.example.com

// The server responds with JSON:
{
  "success": true,
  "data": { "id": 42, "name": "Alice", "email": "alice@example.com" }
}`}</pre>
                        </div>
                    </div>
                    <div className="reveal mt-8 rune-line font-serif text-[#eabf8d]/35 text-[0.7rem] tracking-[0.35em] uppercase">res.json()</div>
                </section>

                {/* ══════════════════════════════════════════
                    HTTP METHODS
                ══════════════════════════════════════════ */}
                <section id="http-methods" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Section 2 — The Verbs of Creation</p>
                    <h2 className="reveal font-serif text-[#eabf8d] uppercase tracking-widest text-3xl md:text-5xl">HTTP Methods</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-lg">
                        Five verbs. Every REST operation maps to one of them. Memorise these — they are the foundation of every API you will ever build or use.
                    </p>

                    <div className="reveal mt-10 max-w-2xl w-full space-y-3 text-left">
                        {[
                            { verb: 'GET', cls: 'm-get', action: 'Read / Retrieve data', desc: 'Fetches a resource without changing anything. Safe and idempotent — calling it ten times has the same result as calling it once.', ex: 'GET /api/users' },
                            { verb: 'POST', cls: 'm-post', action: 'Create a new resource', desc: 'Sends data in the request body to create a new record. Returns the created resource with a 201 status code.', ex: 'POST /api/users' },
                            { verb: 'PUT', cls: 'm-put', action: 'Replace / Full update', desc: 'Replaces an entire resource with the new data you provide. If you omit a field, it may be cleared.', ex: 'PUT /api/users/42' },
                            { verb: 'PATCH', cls: 'm-patch', action: 'Partial update', desc: 'Updates only the fields you specify. The rest of the resource stays unchanged. More surgical than PUT.', ex: 'PATCH /api/users/42' },
                            { verb: 'DELETE', cls: 'm-delete', action: 'Delete a resource', desc: 'Permanently removes the resource identified by the URL. Returns 200 OK or 204 No Content.', ex: 'DELETE /api/users/42' },
                        ].map(m => (
                            <div key={m.verb} className="flex gap-4 border border-[#eabf8d]/10 hover:border-[#eabf8d]/25 transition-colors p-4 backdrop-blur-sm">
                                <span className={`method-badge ${m.cls} shrink-0 self-start mt-0.5`}>{m.verb}</span>
                                <div>
                                    <span className="text-ash/80 text-sm font-medium block mb-1">{m.action}</span>
                                    <p className="text-ash/42 text-xs leading-relaxed mb-2">{m.desc}</p>
                                    <code className="text-[#eabf8d]/38 text-[0.63rem]">{m.ex}</code>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="reveal mt-8 rune-line font-serif text-[#eabf8d]/35 text-[0.7rem] tracking-[0.35em] uppercase">route.bind()</div>
                </section>

                {/* ══════════════════════════════════════════
                    API DESIGN + STATUS CODES
                ══════════════════════════════════════════ */}
                <section id="api-design" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Section 2 — REST in Practice</p>
                    <h2 className="reveal font-serif text-[#eabf8d] uppercase tracking-widest text-3xl md:text-5xl">API Design</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        Here is what a well-designed REST API looks like for a <strong className="text-[#eabf8d]/80">Users resource</strong>.
                        Notice how the same URL <code className="text-[#eabf8d]/60 text-xs bg-[#eabf8d]/8 px-1">/api/users/:id</code> is reused with different HTTP methods to perform different actions.
                    </p>

                    <div className="reveal mt-10 max-w-3xl w-full text-left border border-[#eabf8d]/20 bg-[#eabf8d]/3 backdrop-blur-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[#eabf8d]/8">
                                <tr>
                                    <th className="p-4 font-mono text-[#eabf8d]/70 font-normal text-[0.62rem] tracking-widest text-left">METHOD</th>
                                    <th className="p-4 font-mono text-[#eabf8d]/70 font-normal text-[0.62rem] tracking-widest text-left">ENDPOINT</th>
                                    <th className="p-4 font-mono text-[#eabf8d]/70 font-normal text-[0.62rem] tracking-widest text-left">DESCRIPTION</th>
                                    <th className="p-4 font-mono text-[#eabf8d]/70 font-normal text-[0.62rem] tracking-widest text-left hidden md:table-cell">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#eabf8d]/8">
                                {[
                                    { m: 'GET', cls: 'm-get', ep: '/api/users', desc: 'Return all users', st: '200 OK' },
                                    { m: 'GET', cls: 'm-get', ep: '/api/users/:id', desc: 'Return one user by ID', st: '200 / 404' },
                                    { m: 'POST', cls: 'm-post', ep: '/api/users', desc: 'Create a new user', st: '201 Created' },
                                    { m: 'PUT', cls: 'm-put', ep: '/api/users/:id', desc: 'Replace full user data', st: '200 / 404' },
                                    { m: 'DELETE', cls: 'm-delete', ep: '/api/users/:id', desc: 'Delete user by ID', st: '200 / 404' },
                                ].map((row, i) => (
                                    <tr key={i}>
                                        <td className="p-4"><span className={`method-badge ${row.cls}`}>{row.m}</span></td>
                                        <td className="p-4 font-mono text-[#eabf8d]/65 text-xs">{row.ep}</td>
                                        <td className="p-4 text-ash/60 text-xs">{row.desc}</td>
                                        <td className="p-4 font-mono text-[#eabf8d]/35 text-xs hidden md:table-cell">{row.st}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="reveal mt-10 max-w-3xl w-full">
                        <p className="text-[#eabf8d]/38 font-sans text-[0.62rem] tracking-[0.3em] uppercase mb-5">Common HTTP Status Codes</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
                            {[
                                { code: '200 OK', label: 'Success', note: 'Request worked. Data returned.' },
                                { code: '201 Created', label: 'Resource Born', note: 'New resource was created.' },
                                { code: '204 No Content', label: 'Done, No Data', note: 'Success — nothing to return.' },
                                { code: '400 Bad Request', label: 'Invalid Input', note: 'Client sent malformed data.' },
                                { code: '401 Unauthorized', label: 'Not Logged In', note: 'Authentication required.' },
                                { code: '403 Forbidden', label: 'Access Denied', note: 'Logged in, but not allowed.' },
                                { code: '404 Not Found', label: 'The Void', note: 'Resource does not exist.' },
                                { code: '500 Server Error', label: 'Server Crashed', note: 'Something broke server-side.' },
                            ].map(s => (
                                <div key={s.code} className="border border-[#eabf8d]/12 bg-[#eabf8d]/3 p-3">
                                    <span className="text-[#eabf8d] font-mono text-xs block mb-0.5">{s.code}</span>
                                    <span className="text-ash/45 text-[0.58rem] uppercase tracking-widest block mb-1">{s.label}</span>
                                    <p className="text-ash/32 text-[0.58rem] leading-relaxed">{s.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 3 — PROJECT SETUP
                ══════════════════════════════════════════ */}
                <section id="project-setup" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Section 3 — The Forge</p>
                    <h2 className="reveal font-serif text-[#eabf8d] uppercase tracking-widest text-3xl md:text-5xl">Project Setup</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        Before writing a single route, you need your environment ready. Three terminal commands and a file — that is all it takes to have a live server.
                    </p>

                    <div className="reveal mt-10 max-w-2xl w-full border border-[#eabf8d]/15 bg-[#eabf8d]/3 p-6 text-left">
                        <p className="text-[#eabf8d]/55 text-[0.62rem] tracking-[0.3em] uppercase mb-4">Prerequisites — Check these before starting</p>
                        <ul className="space-y-2.5">
                            {[
                                { item: 'Node.js installed', check: 'run node --version → should show v18 or higher' },
                                { item: 'npm (Node Package Manager)', check: 'comes bundled with Node.js automatically' },
                                { item: 'A code editor', check: 'VS Code is free and highly recommended' },
                                { item: 'Postman app installed', check: 'download free at postman.com — used in Section 5' },
                            ].map(p => (
                                <li key={p.item} className="flex gap-3 items-start">
                                    <span className="text-[#eabf8d]/38 mt-0.5 shrink-0 text-xs">✦</span>
                                    <div>
                                        <span className="text-ash/72 text-sm">{p.item}</span>
                                        <span className="text-ash/32 text-xs font-mono ml-2">— {p.check}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="reveal mt-8 max-w-2xl w-full space-y-5 text-left">

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">1</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-2">Create your project folder</p>
                                <div className="code-label">Terminal</div>
                                <div className="code-block">
                                    <div><span className="code-comment">$ </span>mkdir my-rest-api</div>
                                    <div><span className="code-comment">$ </span>cd my-rest-api</div>
                                    <div><span className="code-comment">$ </span>npm init -y</div>
                                    <div className="mt-2 code-comment"># npm init creates package.json — your project&apos;s manifest file</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">2</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-1">Install Express</p>
                                <p className="text-ash/38 text-xs mb-2">Express is a minimal, flexible web framework for Node.js. It handles routing and middleware so you can focus on your logic.</p>
                                <div className="code-label">Terminal</div>
                                <div className="code-block">
                                    <div><span className="code-comment">$ </span>npm install express</div>
                                    <div className="mt-2 code-comment"># Adds Express to node_modules/ and records it in package.json</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="step-num shrink-0 mt-1">3</div>
                            <div className="flex-1">
                                <p className="text-ash/72 text-sm font-medium mb-1">Create the entry file</p>
                                <p className="text-ash/38 text-xs mb-2">Create <code className="text-[#eabf8d]/55">index.js</code> in your project root. This is where your server will live.</p>
                                <div className="border border-[#eabf8d]/12 bg-black/50 p-4 text-xs font-mono">
                                    <p className="text-[#eabf8d]/45 mb-2 text-[0.6rem] tracking-widest uppercase">Project structure after setup</p>
                                    <div className="text-[#eabf8d]/65">📁 my-rest-api/</div>
                                    <div className="text-[#eabf8d]/40 ml-4">├── 📁 node_modules/</div>
                                    <div className="text-[#eabf8d]/85 ml-4">├── 📄 index.js</div>
                                    <div className="text-[#eabf8d]/40 ml-4">└── 📄 package.json</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="reveal mt-8 rune-line font-serif text-[#eabf8d]/35 text-[0.7rem] tracking-[0.35em] uppercase">forge.ignite()</div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 4 — THE FULL CODE
                ══════════════════════════════════════════ */}
                <section id="full-code" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Section 4 — The Incantation</p>
                    <h2 className="reveal font-serif text-[#eabf8d] uppercase tracking-widest text-3xl md:text-5xl">Building the API</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        A complete Users API with all five CRUD operations. Data lives in-memory as a plain JavaScript array —
                        no database setup required. Focus entirely on the API structure and how Express routing works.
                    </p>

                    <div className="reveal mt-10 max-w-3xl w-full space-y-5 text-left">

                        <div>
                            <div className="code-label">index.js — Part 1 · Setup &amp; Middleware</div>
                            <div className="code-block">
                                <pre>{`// 1. Import Express and create the app instance
const express = require('express');
const app = express();
const PORT = 3000;

// 2. Middleware — tells Express to parse incoming JSON request bodies
//    Without this, req.body will be undefined on POST and PUT requests
app.use(express.json());

// 3. In-memory data store — simulates a database using a plain array
//    In a real app you would replace this with actual database calls
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob',   email: 'bob@example.com'   },
];
let nextId = 3; // tracks the next available ID`}</pre>
                            </div>
                        </div>

                        <div>
                            <div className="code-label">index.js — Part 2 · The Five Routes</div>
                            <div className="code-block">
                                <pre>{`// ── GET /api/users ─────────────────────────────────────────────
// Returns the full list of users as JSON
app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users });
});

// ── GET /api/users/:id ──────────────────────────────────────────
// :id is a URL parameter — /api/users/2 gives req.params.id = "2"
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
});

// ── POST /api/users ─────────────────────────────────────────────
// req.body contains the JSON you sent in the request body
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// ── PUT /api/users/:id ──────────────────────────────────────────
// Replaces the entire user object (preserving the original ID)
app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'User not found' });
  users[index] = { id: users[index].id, ...req.body };
  res.json({ success: true, data: users[index] });
});

// ── DELETE /api/users/:id ───────────────────────────────────────
// Filters out the user with the matching ID from the array
app.delete('/api/users/:id', (req, res) => {
  const before = users.length;
  users = users.filter(u => u.id !== parseInt(req.params.id));
  if (users.length === before) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, message: 'User deleted' });
});`}</pre>
                            </div>
                        </div>

                        <div>
                            <div className="code-label">index.js — Part 3 · Start the Server</div>
                            <div className="code-block">
                                <pre>{`// 4. Start listening for incoming requests on PORT 3000
app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});`}</pre>
                            </div>
                        </div>

                        <div>
                            <div className="code-label">Terminal — Run it</div>
                            <div className="code-block">
                                <div><span className="code-comment">$ </span>node index.js</div>
                                <div className="mt-1 code-comment"># Output: Server running at http://localhost:3000</div>
                                <div className="mt-1 code-comment"># Your API is now live. Keep this terminal open while testing.</div>
                            </div>
                        </div>

                        <div className="reveal mt-8 max-w-3xl w-full">
                            <div className="code-label">Video Reference</div>
                            <a
                                href="https://www.youtube.com/watch?v=XBu54nfzxAQ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block w-full border border-[#eabf8d]/20 bg-black/60 overflow-hidden hover:border-[#eabf8d]/50 transition-colors duration-500"
                                style={{ paddingBottom: '56.25%' }}
                            >
                                <img
                                    src="https://img.youtube.com/vi/XBu54nfzxAQ/maxresdefault.jpg"
                                    alt="Backend & REST API video"
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                {/* Play button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full border-2 border-[#eabf8d]/60 flex items-center justify-center bg-black/50 group-hover:border-[#eabf8d] group-hover:bg-black/70 transition-all duration-300">
                                        <div className="w-0 h-0 ml-1.5" style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid #eabf8d' }} />
                                    </div>
                                </div>
                                {/* Label */}
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                    <span className="text-[#eabf8d]/70 font-sans text-xs tracking-widest uppercase">Watch on YouTube</span>
                                    <span className="text-[#eabf8d]/40 font-mono text-[0.6rem]">↗</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="reveal mt-8 max-w-3xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                        {[
                            { key: 'req.params', note: 'Values captured from the URL — /users/:id gives you req.params.id' },
                            { key: 'req.body', note: 'The JSON payload sent by the client — only available after express.json() middleware' },
                            { key: 'res.status()', note: 'Sets the HTTP status code before sending — chain with .json() to respond' },
                        ].map(k => (
                            <div key={k.key} className="border border-[#eabf8d]/12 bg-[#eabf8d]/3 p-4">
                                <code className="text-[#eabf8d]/75 text-xs block mb-1.5">{k.key}</code>
                                <p className="text-ash/42 text-[0.68rem] leading-relaxed">{k.note}</p>
                            </div>
                        ))}
                    </div>
                    <div className="reveal mt-8 rune-line font-serif text-[#eabf8d]/35 text-[0.7rem] tracking-[0.35em] uppercase">server.listen()</div>
                </section>

                {/* ══════════════════════════════════════════
                    SECTION 5 — POSTMAN TESTING
                ══════════════════════════════════════════ */}
                <section id="postman" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50 mb-4">Section 5 — The Mirror</p>
                    <h2 className="reveal font-serif text-[#eabf8d] uppercase tracking-widest text-3xl md:text-5xl">Testing with Postman</h2>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] mt-6 max-w-xl">
                        Postman lets you send HTTP requests to your API from a visual interface — no code required.
                        Use it to verify every route works before you connect any frontend.
                        Make sure your server is running (<code className="text-[#eabf8d]/55 text-xs">node index.js</code>) before testing.
                    </p>

                    <div className="reveal mt-10 max-w-3xl w-full space-y-3 text-left">
                        {[
                            {
                                n: '01', test: 'GET all users',
                                method: 'GET', cls: 'm-get',
                                url: 'http://localhost:3000/api/users',
                                body: null,
                                expect: '200 OK',
                                response: '{ "success": true, "data": [ { "id": 1, ... }, { "id": 2, ... } ] }',
                            },
                            {
                                n: '02', test: 'GET one user by ID',
                                method: 'GET', cls: 'm-get',
                                url: 'http://localhost:3000/api/users/1',
                                body: null,
                                expect: '200 OK',
                                response: '{ "success": true, "data": { "id": 1, "name": "Alice", "email": "..." } }',
                            },
                            {
                                n: '03', test: 'POST — create a new user',
                                method: 'POST', cls: 'm-post',
                                url: 'http://localhost:3000/api/users',
                                body: '{ "name": "Charlie", "email": "charlie@example.com" }',
                                expect: '201 Created',
                                response: '{ "success": true, "data": { "id": 3, "name": "Charlie", ... } }',
                            },
                            {
                                n: '04', test: 'PUT — replace a user',
                                method: 'PUT', cls: 'm-put',
                                url: 'http://localhost:3000/api/users/1',
                                body: '{ "name": "Alice Updated", "email": "alice.new@example.com" }',
                                expect: '200 OK',
                                response: '{ "success": true, "data": { "id": 1, "name": "Alice Updated", ... } }',
                            },
                            {
                                n: '05', test: 'DELETE — remove a user',
                                method: 'DELETE', cls: 'm-delete',
                                url: 'http://localhost:3000/api/users/1',
                                body: null,
                                expect: '200 OK',
                                response: '{ "success": true, "message": "User deleted" }',
                            },
                        ].map(t => (
                            <div key={t.n} className="border border-[#eabf8d]/12 bg-[#eabf8d]/3 backdrop-blur-sm overflow-hidden">
                                <div className="flex items-center gap-3 px-4 py-2.5 bg-[#eabf8d]/5 border-b border-[#eabf8d]/10">
                                    <span className="font-serif text-[#eabf8d]/28 text-xs shrink-0">{t.n}</span>
                                    <span className="text-ash/65 text-xs font-medium">{t.test}</span>
                                </div>
                                <div className="p-4 space-y-2.5">
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <span className={`method-badge ${t.cls}`}>{t.method}</span>
                                        <code className="text-[#eabf8d]/65 text-xs font-mono">{t.url}</code>
                                    </div>
                                    {t.body && (
                                        <div className="flex items-start gap-2">
                                            <span className="text-ash/32 text-[0.58rem] uppercase tracking-widest shrink-0 mt-0.5">Body (JSON):</span>
                                            <code className="text-[#7ec8a0]/65 text-xs">{t.body}</code>
                                        </div>
                                    )}
                                    <div className="flex items-start gap-2 pt-2 border-t border-[#eabf8d]/8">
                                        <span className="text-ash/28 text-[0.58rem] uppercase tracking-widest shrink-0 mt-0.5">Expected:</span>
                                        <div>
                                            <span className="text-[#eabf8d]/55 text-xs font-mono mr-2">{t.expect}</span>
                                            <code className="text-ash/35 text-[0.62rem]">{t.response}</code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="reveal mt-6 max-w-3xl w-full border border-[#eabf8d]/20 bg-[#eabf8d]/5 p-5 text-left backdrop-blur-sm">
                        <p className="text-[#eabf8d]/60 text-[0.62rem] tracking-[0.3em] uppercase mb-2">Pro Tip — Save as a Postman Collection</p>
                        <p className="text-ash/52 text-sm leading-relaxed">
                            Save all five requests inside a <strong className="text-ash/78">Postman Collection</strong>. This lets you re-run your entire test suite in one click after any code change.
                            Name each request clearly: <code className="text-[#eabf8d]/55 text-xs">GET All Users</code>, <code className="text-[#eabf8d]/55 text-xs">POST New User</code>, and so on.
                            Collections can also be exported and shared with your team.
                        </p>
                    </div>

                    <div className="reveal mt-8 rune-line font-serif text-[#eabf8d]/35 text-[0.7rem] tracking-[0.35em] uppercase">test.verify()</div>
                </section>

                {/* ══════════════════════════════════════════
                    RESONANCE — CLOSING
                ══════════════════════════════════════════ */}
                <section id="resonance" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 gap-5">
                    <p className="reveal font-sans text-[0.68rem] tracking-[0.4em] uppercase text-[#eabf8d]/50">Codex Final — Harmony</p>
                    <div ref={statusBoxRef} className="reveal status-box font-serif text-[#eabf8d] text-[0.82rem] tracking-[0.32em] uppercase px-10 py-4">
                        INITIATING HANDSHAKE...
                    </div>
                    <p className="reveal font-sans font-light text-ash/55 text-[1.05rem] leading-[1.9] max-w-lg">
                        The routes are drawn. The server listens. GET, POST, PUT, DELETE — the verbs of creation echo through the wire.
                        The request flows in. The JSON flows out. The API is alive.
                    </p>

                    <div className="reveal mt-4 max-w-2xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                        {[
                            { n: '01–02', title: 'Backend & REST', note: 'What a backend does, what REST means, HTTP verbs, and status codes.' },
                            { n: '03', title: 'Node.js Setup', note: 'Init project, install Express, create index.js. Server live in minutes.' },
                            { n: '04–05', title: 'Build & Test', note: 'Five CRUD routes in a full index.js, verified with Postman.' },
                        ].map(s => (
                            <div key={s.n} className="border border-[#eabf8d]/15 bg-[#eabf8d]/3 p-4">
                                <span className="text-[#eabf8d]/32 font-serif text-[0.58rem] tracking-[0.3em] uppercase block mb-1">{s.n}</span>
                                <span className="text-ash/72 text-sm font-medium block mb-1.5">{s.title}</span>
                                <p className="text-ash/38 text-xs leading-relaxed">{s.note}</p>
                            </div>
                        ))}
                    </div>

                    <div className="reveal max-w-2xl w-full border border-[#eabf8d]/15 bg-[#eabf8d]/3 p-5 text-left">
                        <p className="text-[#eabf8d]/55 text-[0.62rem] tracking-[0.3em] uppercase mb-3">Part 2 Preview</p>
                        <p className="text-ash/48 text-sm leading-relaxed">
                            Next: connect a <strong className="text-ash/75">real database</strong> (MongoDB or SQLite),
                            add <strong className="text-ash/75">middleware patterns</strong> (error handling, request logging, auth),
                            and manage <strong className="text-ash/75">environment variables</strong> with <code className="text-[#eabf8d]/55">.env</code> files.
                        </p>
                    </div>

                    <div className="reveal rune-line font-serif text-[#eabf8d]/35 text-[0.7rem] tracking-[0.35em] uppercase mt-2">res.send()</div>
                </section>

            </main>
        </div>
    );
};

export default BackendScene;
