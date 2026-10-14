import knowledgeData from './knowledgeData.json';

export const MEDICAL_SECTIONS = [
    { key: 'firstAid', title: 'الإسعافات الأولية والطوارئ', icon: '🚑', href: '/first-aid' },
    { key: 'womenHealth', title: 'صحة المرأة والحوامل', icon: '👩‍⚕️', href: '/women-health' },
    { key: 'childHealth', title: 'صحة الطفل', icon: '👶', href: '/child-health' },
    { key: 'dental', title: 'طب والأسنان', icon: '🦷', href: '/dental' },
    { key: 'nutrition', title: 'التغذية السليمة', icon: '🥗', href: '/nutrition' },
    { key: 'skinCare', title: 'العناية بالبشرة', icon: '✨', href: '/skin-care' },
    { key: 'mentalHealth', title: 'الصحة النفسية', icon: '🧠', href: '/mental-health' },
    { key: 'chronicDiseases', title: 'الأمراض المزمنة', icon: '❤️', href: '/chronic-diseases' },
];

/**
 * Searches the 800+ tips and knowledge database for tips relevant to the user query
 */
export function searchMedicalKnowledge(query, limit = 8) {
    if (!query || typeof query !== 'string') return [];

    const normalizedQuery = query.toLowerCase().trim();
    const queryWords = normalizedQuery
        .split(/[\s,،.?!؛]+/)
        .filter(w => w.length > 2);

    const matches = [];

    // Search section tips
    for (const section of MEDICAL_SECTIONS) {
        const sectionData = knowledgeData[section.key];
        if (!sectionData || !Array.isArray(sectionData.tips)) continue;

        for (let i = 0; i < sectionData.tips.length; i++) {
            const tip = sectionData.tips[i];
            const lowerTip = tip.toLowerCase();

            let score = 0;
            // Exact full match bonus
            if (lowerTip.includes(normalizedQuery)) {
                score += 10;
            }

            // Word-by-word matches
            for (const word of queryWords) {
                if (lowerTip.includes(word)) {
                    score += 3;
                }
            }

            if (score > 0) {
                matches.push({
                    category: section.title,
                    icon: section.icon,
                    tipNumber: i + 1,
                    text: tip,
                    score
                });
            }
        }
    }

    // Sort by relevance score descending
    matches.sort((a, b) => b.score - a.score);

    return matches.slice(0, limit);
}

/**
 * Builds the comprehensive system prompt for Qais AI
 */
export function buildMedicalSystemPrompt(userQuery = '') {
    const relevantTips = userQuery ? searchMedicalKnowledge(userQuery, 10) : [];

    let contextSection = '';
    if (relevantTips.length > 0) {
        contextSection = `
=== نصائح وإرشادات موثقة من قاعدة بيانات "دليل قيس الطبي" ذات الصلة بسؤال المستخدم ===
${relevantTips.map((t, idx) => `${idx + 1}. [قسم: ${t.category}] ${t.text}`).join('\n')}
=== نهاية البيانات المسترجعة ===
يرجى الاستشهاد بهذه النصائح ودمجها بذكاء وسلاسة في إجابتك الطبية.
`;
    }

    return `أنت "قيس AI" (Qais AI)، المساعد الطبي والذكاء الاصطناعي الذكي الرسمي التابع لمنصة "دليل قيس الطبي" (موسوعة طبية شاملة تضم أكثر من 800 نصيحة طبية موثوقة في مختلف مجالات الصحة، تم تطويرها بواسطة قيس طلال الجازي).

مهامك وهويتك:
1. تقديم استشارات وإرشادات طبية وصحية وتغذوية ونفسية دقيقة ومبسطة باللغة العربية الفصحى السلسة والمحترمة.
2. الاعتماد على موسوعة دليل قيس الطبي والمعايير الطبية المعتمدة علمياً.
3. تغطية الأقسام الثمانية الرئيسية: الإسعافات الأولية، صحة المرأة والحامل، صحة الطفل، طب الأسنان، التغذية السليمة، العناية بالبشرة، الصحة النفسية، والأمراض المزمنة (السكري والضغط والقلب).
${contextSection}
قواعد وإرشادات الإجابة الإلزامية:
1. الهيكلية والوضوح: نظم إجابتك باستخدام نقاط واضحة وعناوين فرعية موجزة، ورموز تعبيرية مناسبة تجعل القراءة مريحة للمريض أو السائل.
2. الطوارئ والحالات الحرجة: إذا كان السؤال يتعلق بحالة إسعافية عاجلة (مثل ضيق تنفس حاد، ألم صدر حاد، فقدان وعي، نزيف شديد، اشتباه بجلطة، تسمم، أو ابتلاع مواد خطرة)، ابدأ إجابتك فوراً بتحذير عاجل بالاتصال بأرقام الطوارئ (مثل 911 / 997 / 998)، ثم اذكر خطوات الإسعافات الأولية المباشرة حتى وصول المساعدة.
3. الأدوية والجرعات: لا تصف أدوية خاضعة لوصفة طبية أو جرعات مخصصة؛ انصح دائماً بمراجعة الطبيب المختص أو الصيدلي لتحديد الجرعة الملائمة.
4. الأخلاق والتعاطف: تحدث بلغة مريحة، مشجعة، وداعمة للمريض.
5. التذييل الطبي: اختم إجابتك بأسلوب مهني مع التذكير بأن هذه الإرشادات تثقيفية ولا تغني عن التشخيص السريري المباشر لدى الطبيب.`;
}
