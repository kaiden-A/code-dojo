"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

// Inside your component:


const ArcaneFieldBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    useEffect(() => {
        if (typeof window === "undefined" || !containerRef.current) return;
        gsap.registerPlugin(ScrollTrigger);


        containerRef.current.innerHTML = "";

        const width = window.innerWidth;
        const height = window.innerHeight;

        // --- THREE.JS SCENE SETUP ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 15; // Set camera back to see multiple sigils

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);


        // This tells GSAP: "The page has changed, re-calculate all scroll positions!"
        setTimeout(() => {
            ScrollTrigger.refresh();
            window.dispatchEvent(new Event('resize'));
        }, 100); // A small delay ensures the DOM is fully painted

        containerRef.current.appendChild(renderer.domElement);

        // --- MATERIAL & GEOMETRY HELPERS ---
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0xeabf8d, 
            transparent: true, 
            opacity: 0.0, // Start invisible, fade in on scroll
            blending: THREE.AdditiveBlending 
        });

        // Function to make a simple ring
        const createRing = (radius: number, segments: number) => {
            const points = [];
            for (let i = 0; i <= segments; i++) {
                const angle = (i / segments) * Math.PI * 2;
                points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
            }
            return new THREE.BufferGeometry().setFromPoints(points);
        };

        // Function to make a regular polygon
        const createPoly = (radius: number, sides: number) => {
            const points = [];
            for (let i = 0; i <= sides; i++) {
                const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
                points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
            }
            return new THREE.BufferGeometry().setFromPoints(points);
        };

        // --- GENERATIVE SIGIL FUNCTION ---
        // This creates a complex, nested sigil as a single Three.js Group
        const generateComplexSigil = (complexity: number) => {
            const sigilGroup = new THREE.Group();
            const radius = 1 + Math.random() * 3; // Random base size
            const baseOpacity = 0.15 + Math.random() * 0.25;

            // Clone material for this specific sigil so we can fade it independently
            const mat = lineMaterial.clone();
            mat.opacity = baseOpacity; 

            // Add nested rings
            const ringCount = Math.floor(Math.random() * 3) + 2; 
            for (let i = 0; i < ringCount; i++) {
                const r = radius * (1 - i * (0.15 + Math.random() * 0.1));
                const ringGeo = createRing(r, 64 + Math.floor(r * 10));
                const ring = new THREE.Line(ringGeo, mat);
                ring.rotation.z = Math.random() * Math.PI;
                sigilGroup.add(ring);
            }

            // Add regular polygons
            const polySides = [3, 4, 5, 6, 8, 12, 16];
            const polyCount = Math.floor(Math.random() * 2) + complexity;
            for (let i = 0; i < polyCount; i++) {
                const sides = polySides[Math.floor(Math.random() * polySides.length)];
                const r = radius * (1 - Math.random() * 0.5);
                const polyGeo = createPoly(r, sides);
                const poly = new THREE.Line(polyGeo, mat);
                poly.rotation.z = Math.random() * Math.PI;
                sigilGroup.add(poly);
            }

            // Randomly add spokes or stars
            if (Math.random() > 0.4) {
                const spokes = new THREE.Group();
                const n = Math.floor(Math.random() * 6) * 2 + 4; // 4, 6, 8, 12 spokes
                for(let i=0; i<n; i++) {
                    const angle = (i/n) * Math.PI * 2;
                    const r = radius * (0.8 + Math.random() * 0.4);
                    const linePoints = [new THREE.Vector3(0,0,0), new THREE.Vector3(Math.cos(angle)*r, Math.sin(angle)*r, 0)];
                    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
                    spokes.add(new THREE.Line(lineGeo, mat));
                }
                spokes.rotation.z = Math.random() * Math.PI;
                sigilGroup.add(spokes);
            }

            return sigilGroup;
        };

        // --- POPULATE THE FIELD ---
        const sigilField = new THREE.Group();
        const SIGIL_COUNT = 8; // Number of sigils across the page
        const fieldSizeX = 30; // Spread on X axis
        const fieldSizeY = 20; // Spread on Y axis
        const fieldSizeZ = 12; // Spread on Z axis (depth)

        for (let i = 0; i < SIGIL_COUNT; i++) {
            // Increase complexity based on index, make them more intricate as you go
            const complexity = Math.floor(i / 2) + 1;
            const sigil = generateComplexSigil(complexity);

            // Random position in the "Arcane Field"
            sigil.position.set(
                (Math.random() - 0.5) * fieldSizeX,
                (Math.random() - 0.5) * fieldSizeY,
                (Math.random() - 0.5) * fieldSizeZ
            );
            
            // Random initial rotation
            sigil.rotation.set(
                Math.random() * Math.PI * 0.2,
                Math.random() * Math.PI * 0.2,
                Math.random() * Math.PI
            );

            // Give them slightly different constant rotation speeds
            sigil.userData.baseRotationSpeed = (Math.random() - 0.5) * 0.002;

            sigilField.add(sigil);
        }
        scene.add(sigilField);

        // Add Mana Cyan glow effect
        const manaBloom = new THREE.PointLight(0x00f2ff, 0.4, 40);
        manaBloom.position.set(0, 0, 8);
        scene.add(manaBloom);

        // --- GSAP SCROLL TRIGGERS ---
        // Scroll 1: Camera zooms into the field and sigils fade in
        gsap.to(camera.position, {
            z: 6,
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1 // Clean, direct scrub
            }
        });

        // Scroll 2: Fade the entire field in and out
        gsap.timeline({
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true
            }
        })
        .to(sigilField.children.map(s => (s.children[0] as THREE.Line).material), {
            opacity: 0.6,
            ease: 'power2.out',
            stagger: 0.1 // Fade in sigils at different times
        }, 0)
        .to(manaBloom, { intensity: 1.0, ease: 'none' }, 0.3)
        .to(sigilField.children.map(s => (s.children[0] as THREE.Line).material), {
            opacity: 0.1,
            ease: 'power2.in',
            stagger: 0.1
        }, 0.7);

        // Scroll 3: Parallax scrolling and faster rotation
        gsap.to(sigilField.rotation, {
            z: Math.PI * 4, // Add significant rotation on scroll
            scrollTrigger: {
                trigger: 'main',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2 // Slower scrub gives it a physical "weight"
            }
        });
        
        // Complex Scroll 4: Parallax movement on Y based on depth
        sigilField.children.forEach(sigil => {
            const depthFactor = (sigil.position.z + fieldSizeZ / 2) / fieldSizeZ; // 0 to 1
            const parallaxShift = 10 * depthFactor; // Deeper sigils shift more

            gsap.to(sigil.position, {
                y: `-=${parallaxShift}`,
                ease: 'none',
                scrollTrigger: {
                    trigger: 'main',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1
                }
            });
        });

        // --- RESIZE HANDLER ---
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // --- RENDER LOOP ---
        const clock = new THREE.Clock();
        const animate = () => {
            const requestID = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Apply constant, subtle rotation to the whole field
            sigilField.rotation.x = Math.sin(t * 0.15) * 0.03;
            sigilField.rotation.y = Math.cos(t * 0.25) * 0.05;

            // Apply constant rotation to individual sigils
            sigilField.children.forEach(sigil => {
                sigil.rotation.z += sigil.userData.baseRotationSpeed;
            });

            renderer.render(scene, camera);
        };
        animate();

        // --- CLEANUP ---
        return () => {
            window.removeEventListener('resize', handleResize);
            // Dispose Three.js objects
            renderer.dispose();
            scene.traverse(object => {
                if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach(m => m.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [pathname]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
    );
};

export default ArcaneFieldBackground;