import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Insights', href: '#news' },
    ];

    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${isScrolled
                ? 'top-4 w-[90%] md:w-auto md:min-w-[600px] rounded-full bg-[rgba(2,2,4,0.6)] backdrop-blur-2xl border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] py-3 px-6 ring-1 ring-white/5'
                : 'top-0 w-full bg-transparent border-transparent py-6 px-6 md:px-12'
                }`}
            style={{
                backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
                WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
            }}
        >
            <div className={`flex justify-between items-center ${isScrolled ? 'gap-8' : ''}`}>
                {/* Elegant Logo */}
                <div className={`h-8 md:h-10 cursor-pointer select-none transition-all duration-500 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                    <img src="/logo.png" alt="KEEP TRADING" className="h-full w-auto object-contain" />
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-white transition-all duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent-gold)] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Call to Action */}
                <div className="hidden md:block">
                    <button className="btn-shine w-36 h-10 text-[10px] font-bold uppercase tracking-widest">
                        <span>Client Access</span>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden text-white text-xl cursor-pointer hover:text-[var(--accent-gold)] transition-colors" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu - Dynamic Island expansion */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-4 w-full bg-[rgba(2,2,4,0.95)] backdrop-blur-2xl rounded-2xl border border-[var(--border-subtle)] p-6 md:hidden flex flex-col gap-6 shadow-2xl animate-fade-in-down origin-top">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[var(--text-primary)] hover:text-[var(--accent-gold)] font-serif text-lg tracking-wide text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="btn-shine w-full py-3 mt-2 text-[10px] font-bold uppercase tracking-widest">
                        <span>Client Access</span>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
