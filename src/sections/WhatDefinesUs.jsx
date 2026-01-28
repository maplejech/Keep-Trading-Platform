import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// 3D Bar Chart Visualization
const BarChart3D = () => {
    const groupRef = useRef();
    const barsRef = useRef([]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
        }

        // Animate bar heights
        barsRef.current.forEach((bar, i) => {
            if (bar) {
                const scale = 0.5 + Math.sin(state.clock.elapsedTime + i) * 0.5;
                bar.scale.y = scale;
            }
        });
    });

    const bars = Array.from({ length: 15 }, (_, i) => ({
        x: (i - 7) * 0.6,
        color: i % 3 === 0 ? '#00FF88' : i % 3 === 1 ? '#D4AF37' : '#38BDF8'
    }));

    return (
        <group ref={groupRef} position={[0, 0, -8]}>
            {bars.map((bar, i) => (
                <mesh
                    key={i}
                    position={[bar.x, 0, 0]}
                    ref={(el) => (barsRef.current[i] = el)}
                >
                    <boxGeometry args={[0.4, 2, 0.4]} />
                    <meshStandardMaterial
                        color={bar.color}
                        transparent
                        opacity={0.6}
                        emissive={bar.color}
                        emissiveIntensity={0.3}
                    />
                </mesh>
            ))}
        </group>
    );
};

// Live Market Ticker Component
const MarketTicker = () => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset((prev) => (prev - 1) % 100);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const tickers = [
        { symbol: 'BTC/USD', price: '94,234.50', change: '+2.34%', isUp: true },
        { symbol: 'ETH/USD', price: '3,456.78', change: '+1.89%', isUp: true },
        { symbol: 'SOL/USD', price: '234.56', change: '-0.45%', isUp: false },
        { symbol: 'BNB/USD', price: '567.89', change: '+3.21%', isUp: true },
        { symbol: 'XRP/USD', price: '2.34', change: '+5.67%', isUp: true },
        { symbol: 'ADA/USD', price: '1.23', change: '-1.23%', isUp: false },
    ];

    return (
        <div className="overflow-hidden bg-black/40 border-y border-[var(--border-subtle)] py-3">
            <div
                className="flex gap-12 font-mono text-sm whitespace-nowrap"
                style={{ transform: `translateX(${offset}%)` }}
            >
                {[...tickers, ...tickers, ...tickers].map((ticker, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <span className="text-[var(--accent-gold)] font-semibold">{ticker.symbol}</span>
                        <span className="text-white">{ticker.price}</span>
                        <span className={ticker.isUp ? 'text-[var(--trading-green)]' : 'text-[var(--trading-red)]'}>
                            {ticker.isUp ? '↑' : '↓'} {ticker.change}
                        </span>
                    </div>
                ))}
            </div>
        </div >
    );
};

// Counter Animation Hook
const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const hasStartedRef = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStartedRef.current) {
                    hasStartedRef.current = true;
                    let start = 0;
                    const increment = end / (duration / 16);

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(start);
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return [count, elementRef];
};

const WhatDefinesUs = () => {
    const containerRef = useRef();
    const [uptimeCount, uptimeRef] = useCounter(99.5);
    const [volumeCount, volumeRef] = useCounter(1.8);
    const [ordersCount, ordersRef] = useCounter(850);

    useGSAP(() => {
        gsap.fromTo('.principle-card',
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.principles-grid',
                    start: 'top 80%'
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="relative py-20 bg-[var(--bg-primary)] overflow-hidden scan-lines tech-grid">
            {/* Market Ticker */}
            <MarketTicker />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-[var(--accent-gold)] opacity-5 blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-[var(--trading-cyan)] opacity-5 blur-[100px]"></div>

            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={0.8} color="#00FF88" />
                    <pointLight position={[-10, -10, 10]} intensity={0.5} color="#D4AF37" />
                    <BarChart3D />
                    <fog attach="fog" args={['#020204', 10, 25]} />
                </Canvas>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-terminal)] border border-[var(--trading-green)] glow-border-green mb-6 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-[var(--trading-green)] rounded-full shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></div>
                        <span className="text-[var(--trading-green)] font-mono text-xs uppercase tracking-wider neon-text">
                            Trading Philosophy
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Defining <span className="text-[var(--accent-gold)] drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">Institutional Standards</span>
                        <br />
                        <span className="text-[var(--text-secondary)] text-3xl md:text-4xl font-light italic">
                            for Digital Asset Markets
                        </span>
                    </h2>
                </div>

                {/* Live Metrics Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div ref={uptimeRef} className="bg-[var(--bg-tertiary)] glow-border-green p-6 holographic backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--trading-green)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[var(--text-secondary)] font-mono text-xs uppercase">Uptime</span>
                                <div className="w-1.5 h-1.5 bg-[var(--trading-green)] rounded-full shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></div>
                            </div>
                            <div className="text-4xl font-mono text-white mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{uptimeCount.toFixed(2)}%</div>
                            <div className="text-xs text-[var(--trading-green)] font-mono">+0.01% MTD</div>
                        </div>
                    </div>

                    <div ref={volumeRef} className="bg-[var(--bg-tertiary)] glow-border p-6 holographic backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[var(--text-secondary)] font-mono text-xs uppercase">Daily Volume</span>
                                <div className="w-1.5 h-1.5 bg-[var(--trading-green)] rounded-full shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></div>
                            </div>
                            <div className="text-4xl font-mono text-white mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">${volumeCount.toFixed(1)}B</div>
                            <div className="text-xs text-[var(--trading-green)] font-mono">+12.4% vs Yesterday</div>
                        </div>
                    </div>

                    <div ref={ordersRef} className="bg-[var(--bg-tertiary)] glow-border p-6 holographic backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--trading-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[var(--text-secondary)] font-mono text-xs uppercase">Active Orders/s</span>
                                <div className="w-1.5 h-1.5 bg-[var(--trading-green)] rounded-full shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></div>
                            </div>
                            <div className="text-4xl font-mono text-white mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{Math.floor(ordersCount)}K</div>
                            <div className="text-xs text-[var(--trading-green)] font-mono">+8.9% vs Last Hour</div>
                        </div>
                    </div>
                </div>

                {/* Core Principles */}
                <div className="principles-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="principle-card bg-[var(--bg-tertiary)] border-l-2 border-[var(--trading-green)] p-6 hover:bg-[var(--bg-glass)] transition-all duration-300 glow-border-green holographic relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--trading-green)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[var(--trading-green)] font-mono text-xs neon-text">01</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-[var(--trading-green)] to-transparent shadow-[0_0_5px_rgba(0,255,136,0.5)]"></div>
                            </div>
                            <h3 className="text-xl font-serif text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Algorithmic Precision</h3>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                AI-driven execution models that learn from every trade, continuously optimizing for minimal slippage and maximum alpha generation.
                            </p>
                        </div>
                    </div>

                    <div className="principle-card bg-[var(--bg-tertiary)] border-l-2 border-[var(--accent-gold)] p-6 hover:bg-[var(--bg-glass)] transition-all duration-300 glow-border holographic relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[var(--accent-gold)] font-mono text-xs drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">02</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent-gold)] to-transparent shadow-[0_0_5px_rgba(212,175,55,0.5)]"></div>
                            </div>
                            <h3 className="text-xl font-serif text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Institutional Liquidity</h3>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                Direct access to the deepest liquidity pools with institutional-grade settlement and custody infrastructure.
                            </p>
                        </div>
                    </div>

                    <div className="principle-card bg-[var(--bg-tertiary)] border-l-2 border-[var(--trading-cyan)] p-6 hover:bg-[var(--bg-glass)] transition-all duration-300 glow-border holographic relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--trading-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[var(--trading-cyan)] font-mono text-xs drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]">03</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-[var(--trading-cyan)] to-transparent shadow-[0_0_5px_rgba(0,243,255,0.5)]"></div>
                            </div>
                            <h3 className="text-xl font-serif text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Zero Trust Security</h3>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                Military-grade encryption and multi-party computation ensuring complete protection of order flow and trade data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatDefinesUs;
