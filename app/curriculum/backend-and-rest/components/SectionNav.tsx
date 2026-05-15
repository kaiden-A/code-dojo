"use client";

import React, { useState, useEffect } from 'react';

const SECTIONS = [
    { id: 'hero', label: 'I', title: 'Origin' },
    { id: 'what-is-backend', label: 'II', title: 'The Backend' },
    { id: 'responsibilities', label: 'III', title: 'Responsibilities' },
    { id: 'rest-api', label: 'IV', title: 'REST API' },
    { id: 'http-methods', label: 'V', title: 'HTTP Verbs' },
    { id: 'api-design', label: 'VI', title: 'API Design' },
    { id: 'project-setup', label: 'VII', title: 'The Forge' },
    { id: 'full-code', label: 'VIII', title: 'The Code' },
    { id: 'postman', label: 'IX', title: 'Postman' },
    { id: 'resonance', label: 'X', title: 'Resonance' },
];

const SectionNav = () => {
    const [activeId, setActiveId] = useState('hero');

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter(e => e.isIntersecting);
                if (visible.length > 0) {
                    // Pick the one with the highest intersection ratio
                    const top = visible.reduce((a, b) => a.intersectionRatio > b.intersectionRatio ? a : b);
                    setActiveId(top.target.id);
                }
            },
            { threshold: 0.3 }
        );

        SECTIONS.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) obs.observe(el);
        });

        return () => obs.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-3">
            {SECTIONS.map((s) => {
                const isActive = activeId === s.id;
                return (
                    <button
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        className={`group flex items-center gap-3 transition-all duration-500 cursor-pointer ${isActive ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
                    >
                        {/* Marker dot */}
                        <div className={`w-2 h-2 border transition-all duration-500 ${isActive ? 'bg-primary border-primary scale-125 shadow-[0_0_8px_rgba(234,191,141,0.5)]' : 'border-primary/40 bg-transparent'}`} style={{ transform: 'rotate(45deg)' }} />
                        {/* Label — only visible on active or hover */}
                        <span className={`font-serif text-[0.55rem] tracking-[0.25em] uppercase transition-all duration-500 whitespace-nowrap ${isActive ? 'text-primary translate-x-0 opacity-100' : 'text-primary/50 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                            {s.label} · {s.title}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};

export default SectionNav;
