import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord, FaTelegram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] pt-16 pb-8 overflow-hidden">
            {/* Terminal-Style Top Border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-50"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Terminal Header */}
                <div className="mb-12 pb-6 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-[var(--trading-green)] rounded-full animate-pulse"></div>
                        <span className="text-[var(--trading-green)] font-mono text-[10px] uppercase tracking-wider">
                            System Online
                        </span>
                    </div>
                    <div className="mb-2">
                        <img src="/logo.png" alt="KEEP TRADING" className="h-12 w-auto object-contain" />
                    </div>
                    <p className="text-[var(--text-secondary)] font-mono text-xs max-w-lg">
                        {'>'} Autonomous liquidity infrastructure for institutional digital asset markets
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Platform Links */}
                    <div>
                        <h4 className="text-white font-mono text-sm mb-6 uppercase tracking-wider">Platform</h4>
                        <ul className="space-y-3 text-sm text-[var(--text-secondary)] font-light">
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Execution Algorithms
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Dark Pool Access
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Analytics Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    API Documentation
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Markets */}
                    <div>
                        <h4 className="text-white font-mono text-sm mb-6 uppercase tracking-wider">Markets</h4>
                        <ul className="space-y-3 text-sm text-[var(--text-secondary)] font-light">
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Spot Trading
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Perpetual Futures
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Options
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    OTC Desk
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-mono text-sm mb-6 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3 text-sm text-[var(--text-secondary)] font-light">
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Press & Media
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Press & Media
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div>
                        <h4 className="text-white font-mono text-sm mb-6 uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-3 text-sm text-[var(--text-secondary)] font-light mb-6">
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                    <span className="text-[var(--trading-green)]">{'>'}</span>
                                    Risk Disclosure
                                </a>
                            </li>
                        </ul>

                        {/* Social Links */}
                        <div className="flex gap-4 mb-6">
                            <a href="https://x.com/keeptrader" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--trading-green)] transition-colors">
                                <FaTwitter size={18} />
                            </a>
                            <a href="https://www.linkedin.com/company/keeptrading" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--trading-green)] transition-colors">
                                <FaLinkedin size={18} />
                            </a>
                        </div>

                        {/* Contact Emails */}
                        <div className="flex flex-col gap-2">
                            <a href="mailto:partnership@keep.trading" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                <span className="text-[var(--trading-green)]">@</span>
                                partnership@keep.trading
                            </a>
                            <a href="mailto:info@keep.trading" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                                <span className="text-[var(--trading-green)]">@</span>
                                info@keep.trading
                            </a>
                        </div>
                    </div>
                </div>

                {/* Terminal Bottom Bar */}
                <div className="border-t border-[var(--border-subtle)] pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="font-mono text-[var(--text-secondary)] text-xs">
                            <span className="text-[var(--trading-green)]">{'>'}</span> © 2024 Keep Trading Technologies Ltd. All rights reserved.
                        </div>

                        <div className="flex items-center gap-6 font-mono text-[var(--text-secondary)] text-xs">
                            <span>Hong Kong</span>
                            <span className="text-[var(--border-subtle)]">|</span>
                            <span>Singapore</span>
                            <span className="text-[var(--border-subtle)]">|</span>
                            <span>London</span>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="mt-6 p-3 bg-black/40 border border-[var(--border-subtle)] font-mono text-[10px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[var(--trading-green)]">
                                <div className="w-1.5 h-1.5 bg-[var(--trading-green)] rounded-full animate-pulse"></div>
                                <span>ALL SYSTEMS OPERATIONAL</span>
                            </div>
                            <span className="text-[var(--text-secondary)]">
                                UPTIME: 99.99% | LATENCY: &lt;1ms
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
