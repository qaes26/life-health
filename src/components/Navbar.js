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
                    دليل قيس الطبي 🩺
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
                    <li><Link href="/first-aid" onClick={() => setIsOpen(false)}>الإسعافات</Link></li>
                </ul>
            </div>
        </nav>
    );
}
