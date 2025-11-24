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
                        موسوعتك الطبية الشاملة. أكثر من 800 نصيحة طبية موثوقة في مختلف المجالات الصحية.
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
                            <p>100 نصيحة للحمل والولادة وصحة المرأة.</p>
                        </Link>

                        <Link href="/child-health" className="card">
                            <div className={styles.icon}>👶</div>
                            <h3>صحة الطفل</h3>
                            <p>100 نصيحة للعناية بطفلك من الرضاعة للمراهقة.</p>
                        </Link>

                        <Link href="/dental" className="card">
                            <div className={styles.icon}>🦷</div>
                            <h3>طب الأسنان</h3>
                            <p>100 نصيحة لابتسامة مشرقة وصحية.</p>
                        </Link>

                        <Link href="/nutrition" className="card">
                            <div className={styles.icon}>🥗</div>
                            <h3>التغذية السليمة</h3>
                            <p>100 نصيحة لنمط حياة صحي ومتوازن.</p>
                        </Link>

                        <Link href="/skin-care" className="card">
                            <div className={styles.icon}>✨</div>
                            <h3>العناية بالبشرة</h3>
                            <p>100 سر لجمال ونضارة بشرتك.</p>
                        </Link>

                        <Link href="/mental-health" className="card">
                            <div className={styles.icon}>🧠</div>
                            <h3>الصحة النفسية</h3>
                            <p>100 خطوة نحو راحة البال.</p>
                        </Link>

                        <Link href="/chronic-diseases" className="card">
                            <div className={styles.icon}>❤️</div>
                            <h3>الأمراض المزمنة</h3>
                            <p>100 نصيحة للتعايش مع السكري والضغط.</p>
                        </Link>

                        <Link href="/first-aid" className="card">
                            <div className={styles.icon}>🚑</div>
                            <h3>الإسعافات الأولية</h3>
                            <p>100 إجراء لإنقاذ الحياة في الطوارئ.</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className={styles.about}>
                <div className="container">
                    <h2>عن الدليل</h2>
                    <p>
                        تم تطوير هذا الدليل الشامل بواسطة <strong>قيس طلال الجازي</strong> ليكون مرجعك الأول للمعلومة الطبية السريعة والموثوقة.
                    </p>
                </div>
            </section>
        </div>
    );
}
