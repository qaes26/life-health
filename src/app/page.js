import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>دليل قيس الطبي</h1>
                    <p className={styles.heroSubtitle}>
                        رفيقك الموثوق لصحة أفضل. نصائح طبية شاملة في صحة المرأة، الأسنان، التغذية، والإسعافات الأولية.
                    </p>
                    <Link href="/first-aid" className="btn">
                        تعلم الإسعافات الأولية الآن
                    </Link>
                </div>
            </section>

            {/* Categories Section */}
            <section className={styles.categories}>
                <div className="container">
                    <h2 className="section-title">أقسام الدليل</h2>
                    <div className={styles.grid}>
                        <Link href="/women-health" className="card">
                            <div className={styles.icon}>👩‍⚕️</div>
                            <h3>صحة المرأة والحوامل</h3>
                            <p>نصائح شاملة للحمل، الولادة، وصحة المرأة العامة.</p>
                        </Link>

                        <Link href="/dental" className="card">
                            <div className={styles.icon}>🦷</div>
                            <h3>طب الأسنان</h3>
                            <p>العناية بالأسنان، الوقاية من التسوس، وصحة اللثة.</p>
                        </Link>

                        <Link href="/nutrition" className="card">
                            <div className={styles.icon}>🥗</div>
                            <h3>التغذية السليمة</h3>
                            <p>أنظمة غذائية متوازنة، فيتامينات، وحياة صحية.</p>
                        </Link>

                        <Link href="/first-aid" className="card">
                            <div className={styles.icon}>🚑</div>
                            <h3>الإسعافات الأولية</h3>
                            <p>دليلك السريع للتعامل مع الحالات الطارئة.</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className={styles.about}>
                <div className="container">
                    <h2>عن الدليل</h2>
                    <p>
                        تم إنشاء هذا الدليل بواسطة <strong>قيس طلال الجازي</strong> بهدف نشر الوعي الصحي وتقديم معلومات طبية موثوقة وسهلة الوصول للجميع.
                    </p>
                </div>
            </section>
        </div>
    );
}
