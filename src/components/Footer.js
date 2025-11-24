import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p>© {new Date().getFullYear()} دليل قيس الطبي. جميع الحقوق محفوظة.</p>
                <p className={styles.owner}>المالك: قيس طلال الجازي</p>
            </div>
        </footer>
    );
}
