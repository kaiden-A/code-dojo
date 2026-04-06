"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DojoScene() {
  const containerRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const currentContainer = containerRef.current;
    currentContainer.appendChild(renderer.domElement);

    // Objects
    const monolith = new THREE.Group();
    const outer = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.MeshStandardMaterial({ color: 0x111111, wireframe: true, emissive: 0xeabf8d, emissiveIntensity: 0.2 })
    );
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.MeshStandardMaterial({ color: 0xeabf8d, metalness: 1, roughness: 0 })
    );
    monolith.add(outer, inner);
    scene.add(monolith);

    const rings = new THREE.Group();
    for (let i = 0; i < 15; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(5 + i * 0.5, 0.01, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0xeabf8d, transparent: true, opacity: 0.1 })
      );
      ring.position.z = -i * 5;
      ring.rotation.z = Math.random() * Math.PI;
      rings.add(ring);
    }
    scene.add(rings);

    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(4000 * 3).map(() => (Math.random() - 0.5) * 100), 3)),
      new THREE.PointsMaterial({ size: 0.02, color: 0xffffff })
    );
    scene.add(stars);

    // --- FIX APPLIED HERE ---
    const pLight = new THREE.PointLight(0xeabf8d, 2.5);
    pLight.position.set(5, 5, 5); 
    scene.add(pLight);
    // ------------------------

    scene.add(new THREE.AmbientLight(0x222222));
    camera.position.z = 10;

    // GSAP Scroll Animation
    const mainTl = gsap.timeline({
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1.5 }
    });

    mainTl
      .to(camera.position, { z: -50, ease: "none" })
      .to(monolith.rotation, { y: Math.PI * 4, x: Math.PI * 2 }, 0)
      .to(rings.rotation, { z: Math.PI * 2 }, 0);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      stars.rotation.y += 0.0003;
      monolith.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-10 pointer-events-none" />;
}