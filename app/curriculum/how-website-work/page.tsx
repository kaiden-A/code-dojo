"use client";
import { motion, useScroll, useSpring, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { Send, Database, Zap, ChevronDown, Binary } from "lucide-react";
import DojoBackground from "../components/DojoBackground";

export default function LessonPage() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const packetY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const cardVariants: Variants = {
    offscreen: { y: 40, opacity: 0 },
    onscreen: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 0.8 }
    }
  };

  return (
    <main ref={containerRef} className="relative min-h-[300vh] pt-20 md:pt-32 pb-40 max-w-5xl mx-auto w-full px-6 md:px-8">
      <DojoBackground />

      {/* --- RESPONSIVE PACKET PATH ENGINE --- */}
      {/* Hidden on small screens to prevent overlap with centered text */}
      <div className="absolute left-1/2 top-[15%] md:top-[20%] -translate-x-1/2 w-px h-[75%] bg-outline-variant/10 hidden md:block z-20">
        <motion.div 
          className="w-full bg-primary origin-top shadow-[0_0_15px_#eabf8d]"
          style={{ scaleY: smoothProgress }}
        />
        
        <motion.div 
          style={{ top: packetY }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-30"
        >
          <div className="relative">
             <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_#eabf8d] border border-white/20" />
             <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping opacity-40" />
             <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest bg-surface/80 px-2 py-1 border border-primary/20 backdrop-blur-sm">
                  Data_Packet_01
                </span>
             </div>
          </div>
        </motion.div>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative z-10 text-center min-h-[70vh] md:h-[80vh] flex flex-col justify-center items-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <span className="font-label text-tertiary tracking-[0.2em] md:tracking-[0.4em] uppercase text-[10px] mb-6 block">Scroll to Initiate Transfer</span>
          <h1 className="font-headline text-5xl sm:text-7xl md:text-9xl tracking-tighter text-on-surface mb-8">
            Digital <span className="text-primary italic">Forge</span>
          </h1>
          <p className="max-w-md md:max-w-xl mx-auto text-outline text-base md:text-lg leading-relaxed mb-12">
            Witness the lifecycle of a request as it physically traverses the Dojo infrastructure.
          </p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="mx-auto text-primary opacity-50" />
          </motion.div>
        </motion.div>
      </header>

      {/* --- PHASE 1: CLIENT --- */}
      <section className="relative z-10 min-h-screen py-20 flex items-center">
        <motion.div 
          initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.5, once: true }} variants={cardVariants}
          className="w-full"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1 text-center md:text-left">
              <h2 className="font-headline text-4xl md:text-5xl text-primary uppercase">The Request</h2>
              <p className="text-outline text-base md:text-lg">The user triggers a secure handshake. Headers are set, payloads are JSON-encoded, and the packet is released into the wild.</p>
            </div>
            <div className="perspective-container order-1 md:order-2">
              <div className="isometric-card bg-surface-container-low border border-primary/20 p-6 md:p-8">
                 <div className="h-32 md:h-48 border border-dashed border-outline-variant/30 flex items-center justify-center">
                    <Send className="text-primary/20" size={40} />
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- PHASE 2: SERVER --- */}
      <section className="relative z-10 min-h-screen py-20 flex items-center">
        <motion.div 
          initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.5, once: true }} variants={cardVariants}
          className="w-full"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="perspective-container">
              <div className="isometric-card bg-surface-container-high border border-tertiary/30 p-6 md:p-10">
                <Zap className="text-tertiary mb-6 animate-pulse" size={32} />
                <div className="h-2 bg-outline-variant/20 w-full rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-tertiary"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6 text-center md:text-left">
              <h2 className="font-headline text-4xl md:text-5xl text-tertiary uppercase">The Logic</h2>
              <p className="text-outline text-base md:text-lg">The server acts as the Dojo Sensei. It inspects the packet for authenticity, validates the session, and prepares the operation.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- PHASE 3: DATABASE --- */}
      <section className="relative z-10 min-h-[80vh] py-20 flex items-center">
        <motion.div 
          initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.5, once: true }} variants={cardVariants}
          className="w-full"
        >
          <div className="bg-surface-container-lowest border border-primary/40 p-8 md:p-12 text-center relative overflow-hidden">
              <div className="relative z-10">
                <Database className="text-primary mx-auto mb-6 md:mb-8" size={48} />
                <h2 className="font-headline text-4xl md:text-6xl text-primary uppercase mb-4">Persistence</h2>
                <p className="text-outline text-base md:text-xl max-w-2xl mx-auto">The journey ends here. The packet is written into the immutable logs of the database sanctuary.</p>
              </div>
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                 <Binary size={300} className="absolute -left-10 md:-left-20 -bottom-10 md:-bottom-20" />
              </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}