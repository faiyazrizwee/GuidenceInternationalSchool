
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { API_URL } from "@/config";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isActive = (path: string) => pathname === path ? "active" : "";
    const [announcement, setAnnouncement] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnnouncement = async () => {
             try {
                 const res = await fetch(`${API_URL}/announcement/active`);
                 if (res.ok) {
                     const data = await res.json();
                     if (data.length > 0) {
                         // Join multiple announcements with a separator
                         const combinedText = data.map((a: any) => a.text).join("  |  ");
                         setAnnouncement(prev => prev !== combinedText ? combinedText : prev);
                     } else {
                         setAnnouncement(null);
                     }
                 }
             } catch (error) {
                 console.error("Failed to fetch announcements");
             }
         };
         
         fetchAnnouncement();
         const interval = setInterval(fetchAnnouncement, 30000); // Poll every 30 seconds
         return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container container-flex">
                    <div className="top-bar-left">
                        <div className="admissions-pill overflow-hidden relative w-[400px]">
                            <div className="marquee-content flex whitespace-nowrap">
                                {[1, 2, 3, 4].map((_, i) => (
                                    <span key={i} className="marquee-item pr-8">
                                        {announcement || "ADMISSIONS OPEN FOR ACADEMIC YEAR 2025 - 26"}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="top-bar-right">
                        <span><i className="far fa-paper-plane"></i> info@guidanceinternationalschool.com</span>
                        <span><i className="fas fa-phone-alt"></i> +91 8865 091 309</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="main-header">
                <div className="container container-flex">
                    <div className="logo-box">
                        <Link href="/" className="header-logo">
                            <Image 
                                src="/assets/images/logo.jpeg" 
                                alt="GIS Logo" 
                                width={90} 
                                height={70} 
                                className="logo-img"
                                priority
                                unoptimized 
                            />
                        </Link>
                    </div>
                    
                    <nav className="main-nav" aria-label="Main navigation">
                        <ul className="nav-menu">
                            {/* Home with Submenu */}
                            <li className="dropdown">
                                <Link href="/" className={isActive("/")}>Home <i className="fas fa-chevron-down" style={{fontSize: "0.7em", marginLeft: "5px"}}></i></Link>
                                <ul className="dropdown-menu">
                                    <li><Link href="/about">About us</Link></li>
                                    <li><Link href="/our-principles">Our Principle</Link></li>
                                    <li><Link href="/staff">Staff list</Link></li>
                                    <li><Link href="/national-anthem">National anthem</Link></li>
                                    <li><Link href="/school-pledge">School pledge</Link></li>
                                    <li><Link href="/goals">Our goals and objectives</Link></li>
                                </ul>
                            </li>

                            {/* Mandatory Disclosure */}
                            <li><Link href="/mandatory-disclosure" className={isActive("/mandatory-disclosure")}>Mandatory disclosure</Link></li>

                            {/* School Information */}
                            <li className="dropdown">
                                <Link href="/school-info" className={isActive("/school-info")}>School information <i className="fas fa-chevron-down" style={{fontSize: "0.7em", marginLeft: "5px"}}></i></Link>
                                <ul className="dropdown-menu">
                                    <li><Link href="/school-info">School Uniform</Link></li>
                                    <li><Link href="/school-timings">School Timing</Link></li>
                                    <li><Link href="/year-plan">Year Plan 2023-2024</Link></li>
                                    <li><Link href="/class-test-schedule">Class Test Schedule</Link></li>
                                    <li><Link href="/academic-calendar">Academic Calendar (2024-2025)</Link></li>
                                    <li><Link href="/admission-form">ADMISSIONS OPEN FOR ACADEMIC YEAR 2025-26</Link></li>
                                </ul>
                            </li>

                            {/* Prospectus */}
                            <li className="dropdown">
                                <a href="#" className={isActive("/prospectus")} onClick={(e) => e.preventDefault()}>Prospectus <i className="fas fa-chevron-down" style={{fontSize: "0.7em", marginLeft: "5px"}}></i></a>
                                <ul className="dropdown-menu">
                                    <li><Link href="/infrastructure">Infrastructure</Link></li>
                                    <li><Link href="/admission-process">Admission process</Link></li>
                                </ul>
                            </li>

                            {/* Gallery */}
                            <li><Link href="/gallery" className={isActive("/gallery")}>Gallery</Link></li>

                            {/* Achievements */}
                            <li><Link href="/achievements" className={isActive("/achievements")}>Achievements</Link></li>

                            {/* Contact Us */}
                            <li className="dropdown">
                                <Link href="/contact" className={isActive("/contact")}>Contact us <i className="fas fa-chevron-down" style={{fontSize: "0.7em", marginLeft: "5px"}}></i></Link>
                                <ul className="dropdown-menu">
                                    <li><Link href="/contact?type=general">General enquiries</Link></li>
                                    <li><Link href="/admission-form">Admission form</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                    <button 
                        className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
                        aria-label="Toggle menu" 
                        aria-expanded={isMobileMenuOpen}
                        onClick={toggleMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>

            {/* Mobile Navigation */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`} aria-label="Mobile navigation" aria-hidden={!isMobileMenuOpen}>
                <div className="mobile-nav-header">
                    <div className="mobile-nav-info">
                        <span className="mobile-school-name">GUIDANCE INTERNATIONAL SCHOOL</span>
                        <span className="mobile-school-tagline">A Step to lasting Success</span>
                    </div>
                    <button className="mobile-nav-close" aria-label="Close menu" onClick={toggleMenu}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="mobile-nav-body">
                    <div className="mobile-nav-links">
                        <Link href="/" onClick={toggleMenu}>Home</Link>
                        
                        <Link href="/about" onClick={toggleMenu}>About</Link>
                        <Link href="/about" onClick={toggleMenu} className="mobile-sub-link">About us</Link>
                        <Link href="/our-principles" onClick={toggleMenu} className="mobile-sub-link">Our Principle</Link>
                        <Link href="/staff" onClick={toggleMenu} className="mobile-sub-link">Staff list</Link>
                        <Link href="/national-anthem" onClick={toggleMenu} className="mobile-sub-link">National anthem</Link>
                        <Link href="/school-pledge" onClick={toggleMenu} className="mobile-sub-link">School pledge</Link>
                        <Link href="/goals" onClick={toggleMenu} className="mobile-sub-link">Our goals and objectives</Link>

                        <Link href="/mandatory-disclosure" onClick={toggleMenu}>Mandatory Disclosure</Link>
                        
                        <Link href="/school-info" onClick={toggleMenu}>School Information</Link>
                        <Link href="/school-info" onClick={toggleMenu} className="mobile-sub-link">School Uniform</Link>
                        <Link href="/school-timings" onClick={toggleMenu} className="mobile-sub-link">School Timing</Link>
                        <Link href="/year-plan" onClick={toggleMenu} className="mobile-sub-link">Year Plan 2023-2024</Link>
                        <Link href="/class-test-schedule" onClick={toggleMenu} className="mobile-sub-link">Class Test Schedule</Link>
                        <Link href="/academic-calendar" onClick={toggleMenu} className="mobile-sub-link">Academic Calendar</Link>
                        <Link href="/admission-form" onClick={toggleMenu} className="mobile-sub-link">Admission Open 2025-26</Link>

                        <a href="#" onClick={(e) => e.preventDefault()}>Prospectus</a>
                        <Link href="/infrastructure" onClick={toggleMenu} className="mobile-sub-link">Infrastructure</Link>
                        <Link href="/admission-process" onClick={toggleMenu} className="mobile-sub-link">Admission process</Link>

                        <Link href="/gallery" onClick={toggleMenu}>Gallery</Link>
                        <Link href="/achievements" onClick={toggleMenu}>Achievements</Link>
                        
                        <Link href="/contact" onClick={toggleMenu}>Contact us</Link>
                        <Link href="/contact?type=general" onClick={toggleMenu} className="mobile-sub-link">General enquiries</Link>
                        <Link href="/admission-form" onClick={toggleMenu} className="mobile-sub-link">Admission form</Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
