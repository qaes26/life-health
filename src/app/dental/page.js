import styles from "../section.module.css";

export const metadata = {
    title: "طب الأسنان | دليل قيس الطبي",
};

export default function Dental() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>طب الأسنان</h1>
                    <p className={styles.subtitle}>ابتسامة صحية تعني حياة صحية</p>
                </div>
            </header>

            <div className={`container ${styles.content}`}>
                <article className={styles.article}>
                    <h2>العناية اليومية</h2>
                    <p>
                        الحفاظ على نظافة الأسنان هو الخطوة الأولى للوقاية من الأمراض:
                    </p>
                    <ul>
                        <li>نظف أسنانك مرتين يومياً على الأقل بمعجون يحتوي على الفلورايد.</li>
                        <li>استخدم خيط الأسنان يومياً لإزالة البقايا بين الأسنان.</li>
                        <li>غير فرشاة الأسنان كل 3-4 أشهر.</li>
                    </ul>
                </article>

                <article className={styles.article}>
                    <h2>مشاكل شائعة وحلولها</h2>
                    <p>
                        <strong>حساسية الأسنان:</strong> تجنب المشروبات الباردة جداً أو الساخنة جداً واستخدم معجون خاص بالحساسية.
                        <br />
                        <strong>نزيف اللثة:</strong> قد يكون مؤشراً على التهاب اللثة، احرص على التنظيف الجيد وراجع الطبيب.
                    </p>
                </article>

                <article className={styles.article}>
                    <h2>أسنان الأطفال</h2>
                    <p>
                        ابدأ بتنظيف أسنان طفلك بمجرد ظهورها. تجنب إعطاء الطفل زجاجة الحليب أثناء النوم لمنع "تسوس الرضاعة".
                        زيارة طبيب الأسنان يجب أن تبدأ مع ظهور السن الأول.
                    </p>
                </article>
            </div>
        </div>
    );
}
