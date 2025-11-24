import styles from "../section.module.css";

export const metadata = {
    title: "صحة المرأة والحوامل | دليل قيس الطبي",
};

export default function WomenHealth() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>صحة المرأة والحوامل</h1>
                    <p className={styles.subtitle}>نصائح وإرشادات لكل مرحلة من مراحل حياتك</p>
                </div>
            </header>

            <div className={`container ${styles.content}`}>
                <article className={styles.article}>
                    <h2>نصائح للحوامل</h2>
                    <p>
                        فترة الحمل هي فترة حساسة تتطلب عناية خاصة. إليك بعض النصائح الأساسية:
                    </p>
                    <ul>
                        <li>تناولي حمض الفوليك يومياً في الأشهر الأولى.</li>
                        <li>حافظي على نظام غذائي متوازن غني بالبروتين والكالسيوم.</li>
                        <li>تجنبي الأطعمة النيئة والأسماك التي تحتوي على زئبق عالي.</li>
                        <li>اشربي كميات كافية من الماء للحفاظ على الترطيب.</li>
                    </ul>
                </article>

                <article className={styles.article}>
                    <h2>الفحوصات الدورية</h2>
                    <p>
                        من الضروري إجراء فحوصات دورية للكشف المبكر عن أي مشاكل صحية. تشمل هذه الفحوصات:
                    </p>
                    <ul>
                        <li>فحص الثدي الذاتي شهرياً.</li>
                        <li>فحص عنق الرحم (Pap Smear) بانتظام.</li>
                        <li>قياس ضغط الدم ومستويات السكر.</li>
                    </ul>
                </article>

                <article className={styles.article}>
                    <h2>التغذية والرياضة</h2>
                    <p>
                        ممارسة الرياضة الخفيفة مثل المشي أو اليوغا تساعد في تحسين المزاج وتقليل التوتر.
                        تأكدي من استشارة طبيبك قبل البدء بأي برنامج رياضي جديد.
                    </p>
                </article>
            </div>
        </div>
    );
}
