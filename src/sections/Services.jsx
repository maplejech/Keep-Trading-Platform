import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// 3D Network Visualization
const NetworkNodes = () => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    const nodes = [
        { pos: [0, 0, 0], color: '#D4AF37' },
        { pos: [2, 1, -1], color: '#00FF88' },
        { pos: [-2, 1, -1], color: '#38BDF8' },
        { pos: [1, -1, 1], color: '#00FF88' },
        { pos: [-1, -1, 1], color: '#38BDF8' },
    ];

    return (
        <group ref={groupRef}>
            {nodes.map((node, i) => (
                <Sphere key={i} position={node.pos} args={[0.15, 16, 16]}>
                    <meshStandardMaterial
                        color={node.color}
                        emissive={node.color}
                        emissiveIntensity={0.8}
                    />
                </Sphere>
            ))}

            {/* Connection Lines */}
            {nodes.slice(1).map((node, i) => (
                <Line
                    key={`line-${i}`}
                    points={[[0, 0, 0], node.pos]}
                    color="#00FF88"
                    lineWidth={1.5}
                    transparent
                    opacity={0.4}
                />
            ))}
        </group>
    );
};

const Services = () => {
    const container = useRef();

    useGSAP(() => {
        gsap.fromTo('.metric-card',
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.4)',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 75%',
                }
            }
        );
    }, { scope: container });

    return (
        <section id="services" ref={container} className="py-20 relative bg-[var(--bg-secondary)] overflow-hidden border-t border-[var(--border-subtle)] scan-lines tech-grid">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[var(--trading-cyan)] opacity-5 blur-[120px]"></div>

            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[5, 5, 5]} intensity={0.8} color="#00FF88" />
                    <pointLight position={[-5, -5, 5]} intensity={0.6} color="#38BDF8" />
                    <NetworkNodes />
                    <fog attach="fog" args={['#08080a', 5, 15]} />
                </Canvas>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="font-mono text-[var(--trading-green)] text-xs neon-text">{'>'}</span>
                        <span className="font-mono text-[var(--text-secondary)] text-xs uppercase tracking-wider">
                            Performance Metrics
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Edge Over <span className="text-[var(--accent-gold)] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">Competition</span>
                    </h2>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Latency Card */}
                    <div className="metric-card relative bg-[var(--bg-tertiary)] glow-border-green overflow-hidden group holographic">
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--trading-green)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--trading-green)] opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-500"></div>

                        <div className="relative p-8">
                            {/* Label */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[var(--text-secondary)] font-mono text-[10px] uppercase tracking-[0.2em]">
                                    Network Latency
                                </span>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 bg-[var(--trading-green)] rounded-full shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></div>
                                    <span className="text-[var(--trading-green)] font-mono text-[8px] neon-text">LIVE</span>
                                </div>
                            </div>

                            {/* Metric Value */}
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-6xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">&lt;1</span>
                                    <span className="text-2xl font-mono text-[var(--accent-gold)] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">ms</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--trading-green)] font-mono text-sm">↓ -0.12ms</span>
                                    <span className="text-[var(--text-secondary)] font-mono text-xs">vs 24h avg</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-1 bg-black/60 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                                <div className="absolute inset-y-0 left-0 w-[97%] bg-gradient-to-r from-[var(--trading-green)] to-[var(--trading-cyan)] shadow-[0_0_10px_rgba(0,255,136,0.5)] animate-pulse"></div>
                            </div>

                            {/* Description */}
                            <p className="text-[var(--text-secondary)] text-xs mt-4 leading-relaxed">
                                Co-located infrastructure across major exchanges with direct fiber connections.
                            </p>
                        </div>
                    </div>

                    {/* Uptime Card */}
                    <div className="metric-card relative bg-[var(--bg-tertiary)] glow-border overflow-hidden group holographic">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-gold)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--accent-gold)] opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-500"></div>

                        <div className="relative p-8">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[var(--text-secondary)] font-mono text-[10px] uppercase tracking-[0.2em]">
                                    System Uptime
                                </span>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 bg-[var(--trading-green)] rounded-full shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></div>
                                    <span className="text-[var(--trading-green)] font-mono text-[8px] neon-text">OPERATIONAL</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-6xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">99.99</span>
                                    <span className="text-2xl font-mono text-[var(--accent-gold)] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--trading-green)] font-mono text-sm">365 days</span>
                                    <span className="text-[var(--text-secondary)] font-mono text-xs">SLA guarantee</span>
                                </div>
                            </div>

                            <div className="relative h-1 bg-black/60 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                                <div className="absolute inset-y-0 left-0 w-[99.99%] bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-platinum)] shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                            </div>

                            <p className="text-[var(--text-secondary)] text-xs mt-4 leading-relaxed">
                                Redundant failover systems across multiple geographic regions with instant recovery.
                            </p>
                        </div>
                    </div>

                    {/* Volume Card */}
                    <div className="metric-card relative bg-[var(--bg-tertiary)] glow-border overflow-hidden group holographic">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--trading-cyan)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--trading-cyan)] opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-500"></div>

                        <div className="relative p-8">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[var(--text-secondary)] font-mono text-[10px] uppercase tracking-[0.2em]">
                                    Monthly Volume
                                </span>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 bg-[var(--trading-green)] rounded-full shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></div>
                                    <span className="text-[var(--trading-green)] font-mono text-[8px] neon-text">UPDATING</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-6xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">$8.4</span>
                                    <span className="text-2xl font-mono text-[var(--accent-gold)] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">B+</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--trading-green)] font-mono text-sm">↑ +23.7%</span>
                                    <span className="text-[var(--text-secondary)] font-mono text-xs">MoM growth</span>
                                </div>
                            </div>

                            <div className="relative h-1 bg-black/60 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                                <div className="absolute inset-y-0 left-0 w-[84%] bg-gradient-to-r from-[var(--trading-cyan)] to-[var(--accent-blue-vibrant)] shadow-[0_0_10px_rgba(0,243,255,0.5)] animate-pulse"></div>
                            </div>

                            <p className="text-[var(--text-secondary)] text-xs mt-4 leading-relaxed">
                                Aggregated volume across spot, futures, and options markets with deep order books.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Terminal Footer */}
                <div className="mt-12 p-4 bg-black/60 backdrop-blur-sm border border-[var(--border-subtle)] glow-border font-mono text-xs shadow-[inset_0_0_20px_rgba(0,255,136,0.03)]">
                    <div className="flex items-center gap-2 text-[var(--trading-green)]">
                        <span className="neon-text">{'>'}</span>
                        <span className="animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.8)]">_</span>
                        <span className="text-[var(--text-secondary)]">All systems operational | Last updated: {new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
