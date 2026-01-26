import React, { useRef, useState, useEffect } from 'react';
import { FaRobot, FaBrain, FaChartLine } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// 3D Candlestick Chart Background
const CandlestickChart = () => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    const candlesticks = Array.from({ length: 12 }, (_, i) => ({
        x: (i - 6) * 0.8,
        height: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? '#00FF88' : '#FF3366'
    }));

    return (
        <group ref={groupRef} position={[0, -1, -5]}>
            {candlesticks.map((candle, i) => (
                <mesh key={i} position={[candle.x, candle.height / 2, 0]}>
                    <boxGeometry args={[0.3, candle.height, 0.3]} />
                    <meshStandardMaterial
                        color={candle.color}
                        transparent
                        opacity={0.6}
                        emissive={candle.color}
                        emissiveIntensity={0.4}
                    />
                </mesh>
            ))}
        </group>
    );
};

// Trading Terminal Feature Card
const TerminalCard = ({ icon, title, description, metric, change, isPositive }) => {
    const [displayMetric, setDisplayMetric] = useState('0');

    useEffect(() => {
        let current = 0;
        const target = parseFloat(metric) || 0;
        const increment = target / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setDisplayMetric(metric);
                clearInterval(timer);
            } else {
                setDisplayMetric(current.toFixed(2));
            }
        }, 20);

        return () => clearInterval(timer);
    }, [metric]);

    return (
        <div className="group relative bg-[var(--bg-tertiary)] glow-border hover:glow-border-green transition-all duration-500 overflow-hidden holographic">
            {/* Ambient Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--trading-green)] opacity-5 blur-[60px]"></div>
            </div>

            {/* Terminal Header Bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm border-b border-[var(--border-subtle)]">
                <div className="w-2 h-2 rounded-full bg-[var(--trading-red)] shadow-[0_0_8px_rgba(255,51,102,0.6)]"></div>
                <div className="w-2 h-2 rounded-full bg-[var(--trading-amber)] shadow-[0_0_8px_rgba(255,184,0,0.6)]"></div>
                <div className="w-2 h-2 rounded-full bg-[var(--trading-green)] shadow-[0_0_8px_rgba(0,255,136,0.6)] animate-pulse"></div>
                <span className="ml-2 text-[10px] font-mono text-[var(--text-secondary)]">SYSTEM_ACTIVE</span>
            </div>

            {/* Card Content */}
            <div className="p-6 relative">
                {/* Icon and Live Indicator */}
                <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl text-[var(--accent-gold)] group-hover:text-[var(--trading-green)] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                        {icon}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--trading-green)] shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></div>
                        <span className="text-[9px] font-mono text-[var(--trading-green)] uppercase neon-text">Live</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-serif text-white mb-3 tracking-wide">
                    {title}
                </h3>

                {/* Live Metric */}
                <div className="mb-4 p-3 bg-black/60 backdrop-blur-sm border border-[var(--border-subtle)] font-mono shadow-[inset_0_0_20px_rgba(0,255,136,0.05)]">
                    <div className="text-xs text-[var(--text-secondary)] mb-1">Performance</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{displayMetric}</span>
                        <span className={`text-xs ${isPositive ? 'text-[var(--trading-green)]' : 'text-[var(--trading-red)]'}`}>
                            {isPositive ? '↑' : '↓'} {change}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-xs leading-relaxed font-light">
                    {description}
                </p>

                {/* Terminal Cursor */}
                <div className="mt-4 flex items-center gap-1">
                    <span className="text-[var(--trading-green)] font-mono text-xs neon-text">{'>'}</span>
                    <span className="w-1.5 h-3 bg-[var(--trading-green)] shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></span>
                </div>
            </div>
        </div>
    );
};

const KeyFeatures = () => {
    const container = useRef();

    useGSAP(() => {
        gsap.fromTo('.terminal-card',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 75%',
                }
            }
        );
    }, { scope: container });

    return (
        <section id="features" ref={container} className="py-20 relative bg-[var(--bg-secondary)] overflow-hidden scan-lines tech-grid">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-30 blur-xl"></div>

            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={0.8} color="#00FF88" />
                    <pointLight position={[-10, -10, 10]} intensity={0.5} color="#D4AF37" />
                    <CandlestickChart />
                    <fog attach="fog" args={['#020204', 8, 20]} />
                </Canvas>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-1 bg-[var(--trading-green)] shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></div>
                        <span className="text-[var(--trading-green)] text-[10px] font-mono tracking-[0.3em] uppercase neon-text">
                            System_Status: Operational
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Execution <span className="text-[var(--accent-gold)] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">Infrastructure</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-sm max-w-2xl">
                        Institutional-grade trading systems powered by autonomous AI agents and real-time market intelligence.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="terminal-card">
                        <TerminalCard
                            icon={<FaRobot />}
                            title="Autonomous Execution"
                            metric="99.7"
                            change="+2.3%"
                            isPositive={true}
                            description="Self-learning agents execute high-frequency strategies with sub-millisecond precision across multiple venues simultaneously."
                        />
                    </div>
                    <div className="terminal-card">
                        <TerminalCard
                            icon={<FaBrain />}
                            title="Predictive Models"
                            metric="94.2"
                            change="+5.8%"
                            isPositive={true}
                            description="Neural networks analyze petabytes of market data to identify alpha opportunities and predict price movements."
                        />
                    </div>
                    <div className="terminal-card">
                        <TerminalCard
                            icon={<FaChartLine />}
                            title="Dark Pool Access"
                            metric="$8.4B"
                            change="+12.1%"
                            isPositive={true}
                            description="Direct access to institutional liquidity pools with minimal slippage and zero market impact for large orders."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
