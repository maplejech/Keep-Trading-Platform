import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="text-2xl font-bold tracking-tighter text-white mb-6 flex items-center gap-2">
                            <span className="text-[var(--accent-blue)]">Keep</span>
                            <span>Trading</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6">
                            Empowering institutional finance with autonomous AI-driven trading strategies and deep liquidity solutions.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-[var(--accent-blue)] transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="hover:text-[var(--accent-blue)] transition-colors"><FaLinkedin size={20} /></a>
                            <a href="#" className="hover:text-[var(--accent-blue)] transition-colors"><FaGithub size={20} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">AI Arbitrage</a></li>
                            <li><a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">Liquidity Pools</a></li>
                            <li><a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">HFT Engine</a></li>
                            <li><a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">Risk Management</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">Press</a></li>
                            <li><a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">Compliance</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li>Hong Kong Science Park</li>
                            <li>InnoHK Program</li>
                            <li>support@keeptrading.com</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-[var(--border-color)] pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>© 2025 Keep Trading. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
