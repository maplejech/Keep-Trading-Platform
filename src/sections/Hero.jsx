import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    const canvasRef = useRef(null);
    const tubesInstance = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Dynamic import to handle the UMD/CDN module correctly
        const loadTubes = async () => {
            try {
                // Using the exact CDN link provided by the user (or a reliable NPM CDN)
                // We use a dynamic import which Vite handles well for external URLs
                const module = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
                const TubesFrom = module.default;

                tubesInstance.current = TubesFrom(canvasRef.current, {
                    tubes: {
                        colors: ["#D4AF37", "#E5E4E2", "#0A192F"],
                        lights: {
                            intensity: 30,
                            colors: ["#F4C430", "#FFFFFF", "#38BDF8", "#020204"]
                        }
                    }
                });
            } catch (error) {
                console.error("Failed to load Tubes effect:", error);
            }
        };

        loadTubes();

        return () => {
            // Cleanup if available
        };
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo('.hero-anim',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
        );
    });

    return (
        <section className="relative h-screen w-full bg-[#020204] overflow-hidden flex items-center justify-center" id="hero">
            {/* Canvas Background */}
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            />

            {/* Interactive layer to pass mouse events to canvas if needed, or let canvas handle it if it listens to window */}
            {/* The library likely listens to mousemove on window or the element passed. 
          If it listens to the element, we need pointer-events-auto on canvas. 
          The snippet implies it follows cursor. */}

            {/* Content Overlay */}
            <div className="relative z-10 w-full container mx-auto px-6 text-center">
                <div className="mb-6 overflow-hidden">
                    <span className="hero-anim inline-block py-1 px-3 rounded-full glass text-xs font-medium tracking-widest text-[var(--accent-gold)] uppercase mb-4 border border-[var(--accent-gold)]/20 shadow-lg backdrop-blur-md bg-black/30">
                        InnoHK Incubated
                    </span>
                </div>

                <h1 className="hero-anim text-5xl md:text-8xl font-serif text-white leading-tight tracking-tight mb-8 drop-shadow-2xl">
                    The Future of <br />
                    <span className="text-gradient-gold italic pr-4">Liquid Markets</span>
                </h1>

                <p className="hero-anim text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-md">
                    Keep Trading is the institutional-grade bridge between traditional finance and the digital asset economy, powered by autonomous AI.
                </p>

                <div className="hero-anim flex justify-center gap-6">
                    <button className="btn-shine w-48 h-12 font-semibold tracking-wide text-sm">
                        <span>Partner With Us</span>
                    </button>
                    <button className="btn-shine w-48 h-12 font-semibold tracking-wide text-sm">
                        <span>View Strategies</span>
                    </button>
                </div>
            </div>

            {/* Vignette / Fade */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#020204_100%)] opacity-60"></div>
        </section>
    );
};

export default Hero;
