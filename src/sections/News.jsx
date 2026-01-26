import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const NewsCard = ({ category, timestamp, title, source, impact }) => {
    const getImpactColor = () => {
        if (impact === 'BULLISH') return 'text-[var(--trading-green)]';
        if (impact === 'BEARISH') return 'text-[var(--trading-red)]';
        return 'text-[var(--text-secondary)]';
    };

    const getImpactSymbol = () => {
        if (impact === 'BULLISH') return '↗';
        if (impact === 'BEARISH') return '↘';
        return '→';
    };

    return (
        <div className="group bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-all duration-300 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                    <span className="text-[var(--accent-gold)] font-mono text-[10px] uppercase tracking-wider">
                        {category}
                    </span>
                    <div className="h-3 w-px bg-[var(--border-subtle)]"></div>
                    <span className="text-[var(--text-secondary)] font-mono text-[9px]">
                        {timestamp}
                    </span>
                </div>
                <div className={`flex items-center gap-1 ${getImpactColor()} font-mono text-[10px]`}>
                    <span>{getImpactSymbol()}</span>
                    <span>{impact}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-lg font-serif text-white group-hover:text-[var(--accent-gold)] transition-colors duration-300 leading-relaxed mb-4">
                    {title}
                </h3>

                <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)] font-mono text-[10px]">
                        SOURCE: {source}
                    </span>
                    <button className="text-[var(--trading-cyan)] font-mono text-[10px] hover:text-white transition-colors">
                        READ MORE →
                    </button>
                </div>
            </div>

            {/* Timestamp Footer */}
            <div className="px-4 py-2 bg-black/20 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[var(--trading-green)] rounded-full animate-pulse"></div>
                    <span className="text-[var(--trading-green)] font-mono text-[8px]">LIVE FEED</span>
                </div>
            </div>
        </div>
    );
};

const News = () => {
    const container = useRef();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useGSAP(() => {
        gsap.fromTo('.news-card',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 80%',
                }
            }
        );
    }, { scope: container });

    const newsItems = [
        {
            category: 'ANALYSIS',
            timestamp: '2m ago',
            title: 'Institutional Demand Surges as Bitcoin ETF Inflows Hit $2.1B This Week',
            source: 'BLOOMBERG TERMINAL',
            impact: 'BULLISH'
        },
        {
            category: 'REGULATORY',
            timestamp: '14m ago',
            title: 'SEC Approves Framework for Tokenized Securities Trading on Regulated Venues',
            source: 'REUTERS',
            impact: 'BULLISH'
        },
        {
            category: 'TECHNOLOGY',
            timestamp: '45m ago',
            title: 'Zero-Knowledge Proofs Enable Anonymous Large Block Trades Without Information Leakage',
            source: 'COINDESK',
            impact: 'NEUTRAL'
        },
        {
            category: 'MARKET DATA',
            timestamp: '1h ago',
            title: 'Dark Pool Volumes Reach All-Time High as Institutional Activity Intensifies',
            source: 'THE BLOCK',
            impact: 'BULLISH'
        },
        {
            category: 'RESEARCH',
            timestamp: '2h ago',
            title: 'AI-Driven Trading Models Outperform Traditional Strategies by 34% in Q4 2024',
            source: 'MESSARI',
            impact: 'BULLISH'
        },
        {
            category: 'LIQUIDITY',
            timestamp: '3h ago',
            title: 'Major Exchange Announces Integration with Institutional Settlement Network',
            source: 'FINANCIAL TIMES',
            impact: 'BULLISH'
        }
    ];

    return (
        <section id="news" ref={container} className="py-20 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
            <div className="container mx-auto px-6">
                {/* Header with Live Clock */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-mono text-[var(--trading-green)] text-xs">{'>'}</span>
                            <span className="font-mono text-[var(--text-secondary)] text-xs uppercase tracking-wider">
                                Market Intelligence
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white">
                            Real-Time <span className="text-[var(--accent-gold)]">News Feed</span>
                        </h2>
                    </div>

                    {/* Live Clock */}
                    <div className="hidden md:block bg-black/40 border border-[var(--border-subtle)] px-6 py-3">
                        <div className="text-[var(--text-secondary)] font-mono text-[9px] uppercase mb-1">
                            Market Time (UTC)
                        </div>
                        <div className="text-white font-mono text-2xl">
                            {currentTime.toUTCString().split(' ')[4]}
                        </div>
                    </div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsItems.map((item, i) => (
                        <div key={i} className="news-card">
                            <NewsCard {...item} />
                        </div>
                    ))}
                </div>

                {/* Terminal Footer */}
                <div className="mt-12 p-4 bg-black/40 border border-[var(--border-subtle)] font-mono text-xs">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[var(--trading-green)]">
                            <span>{'>'}</span>
                            <span className="animate-pulse">_</span>
                            <span className="text-[var(--text-secondary)]">
                                Auto-refresh enabled | Next update in 60s
                            </span>
                        </div>
                        <button className="text-[var(--trading-cyan)] hover:text-white transition-colors">
                            VIEW ALL SIGNALS →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default News;
