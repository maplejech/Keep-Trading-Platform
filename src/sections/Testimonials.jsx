import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const TraderCard = ({ name, role, firm, quote, performance, volume, trades }) => {
    return (
        <div className="flex-shrink-0 w-[400px] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-all duration-300">
            {/* Header */}
            <div className="border-b border-[var(--border-subtle)] p-4 bg-black/30">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-platinum)] flex items-center justify-center text-black font-bold text-lg">
                        {name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-white font-semibold">{name}</h4>
                        <p className="text-[var(--text-secondary)] text-xs font-mono">{role} @ {firm}</p>
                    </div>
                </div>
            </div>

            {/* Quote */}
            <div className="p-6 border-b border-[var(--border-subtle)]">
                <div className="text-[var(--accent-gold)] text-3xl font-serif mb-2">"</div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">
                    {quote}
                </p>
            </div>

            {/* Performance Metrics */}
            <div className="p-6 grid grid-cols-3 gap-4">
                <div>
                    <div className="text-[var(--text-secondary)] font-mono text-[9px] uppercase mb-1">Return</div>
                    <div className="text-[var(--trading-green)] font-mono text-xl font-bold">+{performance}%</div>
                </div>
                <div>
                    <div className="text-[var(--text-secondary)] font-mono text-[9px] uppercase mb-1">Volume</div>
                    <div className="text-white font-mono text-xl font-bold">${volume}M</div>
                </div>
                <div>
                    <div className="text-[var(--text-secondary)] font-mono text-[9px] uppercase mb-1">Trades</div>
                    <div className="text-[var(--trading-cyan)] font-mono text-xl font-bold">{trades}K</div>
                </div>
            </div>

            {/* Status */}
            <div className="px-6 pb-4">
                <div className="flex items-center gap-2 text-[var(--trading-green)] font-mono text-[10px]">
                    <div className="w-1.5 h-1.5 bg-[var(--trading-green)] rounded-full animate-pulse"></div>
                    <span>VERIFIED TRADER</span>
                </div>
            </div>
        </div>
    );
};

const Testimonials = () => {
    const containerRef = useRef();
    const scrollRef = useRef();

    useGSAP(() => {
        if (scrollRef.current) {
            gsap.to(scrollRef.current, {
                x: '-50%',
                duration: 30,
                ease: 'none',
                repeat: -1,
            });
        }
    }, { scope: containerRef });

    const traders = [
        {
            name: "James Chen",
            role: "Chief Investment Officer",
            firm: "Apex Capital",
            quote: "The execution speed and liquidity depth have fundamentally changed how we approach large block trades. Slippage is practically non-existent.",
            performance: 34.7,
            volume: 284,
            trades: 12.3
        },
        {
            name: "Sarah Williams",
            role: "Head of Algorithmic Trading",
            firm: "QuantFlow Partners",
            quote: "Their AI models consistently identify alpha opportunities our traditional systems miss. ROI has improved by 40% since integration.",
            performance: 42.3,
            volume: 517,
            trades: 28.9
        },
        {
            name: "Michael Ross",
            role: "Portfolio Manager",
            firm: "BlockTower Capital",
            quote: "Finally, an institutional-grade platform built for serious digital asset trading. The uptime and reliability are unmatched.",
            performance: 28.9,
            volume: 392,
            trades: 15.7
        },
        {
            name: "Elena Rodriguez",
            role: "Trading Desk Lead",
            firm: "Infinity Markets",
            quote: "Dark pool access has been a game-changer for protecting our order flow. Zero information leakage, maximum execution quality.",
            performance: 51.2,
            volume: 628,
            trades: 34.2
        }
    ];

    return (
        <section id="testimonials" ref={containerRef} className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-[var(--trading-green)] text-xs">{'>'}</span>
                    <span className="font-mono text-[var(--text-secondary)] text-xs uppercase tracking-wider">
                        Verified Performance
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white">
                    Trusted by <span className="text-[var(--accent-gold)]">Elite Traders</span>
                </h2>
            </div>

            {/* Scrolling Cards */}
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10"></div>

                <div ref={scrollRef} className="flex gap-6">
                    {[...traders, ...traders].map((trader, i) => (
                        <TraderCard key={i} {...trader} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
