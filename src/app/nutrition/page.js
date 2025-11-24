import styles from "../section.module.css";

export const metadata = {
    title: "التغذية | دليل قيس الطبي",
};

export default function Nutrition() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>التغذية السليمة</h1>
                    <p className={styles.subtitle}>الغذاء هو الدواء، اختر ما تأكله بحكمة</p>
                </div>
            </header>

            <div className={`container ${styles.content}`}>
                <article className={styles.article}>
                    <h2>أساسيات الغذاء المتوازن</h2>
                    <p>
                        يجب أن يحتوي طبقك اليومي على تنوع من العناصر الغذائية:
                    </p>
                    <ul>
                        <li><strong>البروتينات:</strong> اللحوم، الأسماك، البيض، والبقوليات.</li>
                        <li><strong>الكربوهيدرات المعقدة:</strong> الحبوب الكاملة، الشوفان، والأرز البني.</li>
                        <li><strong>الدهون الصحية:</strong> زيت الزيتون، المكسرات، والأفوكادو.</li>
                        <li><strong>الفيتامينات والمعادن:</strong> الخضروات والفواكه الطازجة.</li>
                    </ul>
                </article>

                <article className={styles.article}>
                    <h2>أهمية شرب الماء</h2>
                    <p>
                        الماء ضروري لجميع وظائف الجسم الحيوية. يُنصح بشرب 8 أكواب (حوالي 2 لتر) يومياً على الأقل، وتزداد الحاجة عند ممارسة الرياضة أو في الطقس الحار.
                    </p>
                </article>

                <article className={styles.article}>
                    <h2>نصائح لإنقاص الوزن بطريقة صحية</h2>
                    <p>
                        تجنب الحميات القاسية. بدلاً من ذلك، ركز على تقليل السكريات والنشويات المكررة، وزيادة النشاط البدني، والنوم الكافي.
                    </p>
                </article>
            </div>
        </div>
    );
}
