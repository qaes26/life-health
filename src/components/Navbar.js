"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoIcon}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="var(--primary-color)" />
                        <path d="M12 6v6m-3-3h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>دليل قيس الطبي</span>
                </Link>

                <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>

                <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
                    <li><Link href="/" onClick={() => setIsOpen(false)}>الرئيسية</Link></li>
                    <li><Link href="/women-health" onClick={() => setIsOpen(false)}>صحة المرأة</Link></li>
                    <li><Link href="/child-health" onClick={() => setIsOpen(false)}>صحة الطفل</Link></li>
                    <li><Link href="/dental" onClick={() => setIsOpen(false)}>الأسنان</Link></li>
                    <li><Link href="/nutrition" onClick={() => setIsOpen(false)}>التغذية</Link></li>
                    <li><Link href="/skin-care" onClick={() => setIsOpen(false)}>البشرة</Link></li>
                    <li><Link href="/mental-health" onClick={() => setIsOpen(false)}>النفسية</Link></li>
                    <li><Link href="/chronic-diseases" onClick={() => setIsOpen(false)}>الأمراض المزمنة</Link></li>
                    <li><Link href="/quiz" onClick={() => setIsOpen(false)} style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>اختبر معلوماتك 🧠</Link></li>
                    <li><Link href="/qais-ai" onClick={() => setIsOpen(false)} style={{ color: '#4f46e5', fontWeight: 'bold', background: 'rgba(79, 70, 229, 0.1)', padding: '0.25rem 0.6rem', borderRadius: '8px' }}>قيس AI 🤖</Link></li>
                    <li><Link href="/first-aid" onClick={() => setIsOpen(false)}>الإسعافات</Link></li>
                </ul>
            </div>
        </nav>
    );
}
