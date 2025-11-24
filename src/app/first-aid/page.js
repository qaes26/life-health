import styles from "../section.module.css";

export const metadata = {
    title: "الإسعافات الأولية | دليل قيس الطبي",
};

export default function FirstAid() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>الإسعافات الأولية</h1>
                    <p className={styles.subtitle}>كن مستعداً لإنقاذ حياة في أي لحظة</p>
                </div>
            </header>

            <div className={`container ${styles.content}`}>
                <article className={styles.article}>
                    <h2>أساسيات الإنعاش القلبي الرئوي (CPR)</h2>
                    <p>
                        إذا وجدت شخصاً فاقداً للوعي ولا يتنفس:
                    </p>
                    <ul>
                        <li>اتصل بالطوارئ فوراً.</li>
                        <li>ابدأ بالضغط على منتصف الصدر بقوة وسرعة (100-120 ضغطة في الدقيقة).</li>
                        <li>استمر حتى وصول المساعدة الطبية.</li>
                    </ul>
                </article>

                <article className={styles.article}>
                    <h2>علاج الحروق</h2>
                    <p>
                        <strong>الحروق البسيطة:</strong> ضع المنطقة المصابة تحت ماء بارد (وليس ثلج) لمدة 10-15 دقيقة. غطها بضمادة نظيفة.
                        <br />
                        <strong>الحروق الشديدة:</strong> لا تلمس الحرق ولا تضع أي مراهم، اتصل بالطوارئ فوراً.
                    </p>
                </article>

                <article className={styles.article}>
                    <h2>الاختناق (غصة الطعام)</h2>
                    <p>
                        إذا كان الشخص يختنق ولا يستطيع التنفس، قم بإجراء "مناورة هيمليك":
                    </p>
                    <ul>
                        <li>قف خلف الشخص ولف ذراعيك حول خصره.</li>
                        <li>اصنع قبضة بيدك وضعها فوق السرة.</li>
                        <li>اضغط بقوة للداخل ولأعلى بحركة سريعة حتى يخرج الجسم الغريب.</li>
                    </ul>
                </article>
            </div>
        </div>
    );
}
