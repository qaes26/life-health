"use client";
import { useState, useEffect } from "react";
import styles from "./Disclaimer.module.css";

export default function Disclaimer() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className={styles.disclaimerBar}>
            <div className="container">
                <p>
                    <strong>تنبيه هام:</strong> المحتوى في هذا التطبيق هو لأغراض إعلامية فقط ولا يغني عن الاستشارة الطبية المتخصصة.
                </p>
                <button onClick={() => setIsVisible(false)} className={styles.closeBtn}>
                    فهمت
                </button>
            </div>
        </div>
    );
}
