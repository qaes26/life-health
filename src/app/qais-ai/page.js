'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

const CATEGORY_SUGGESTIONS = {
    all: [
        'ما هي خطوات الإسعاف الأولي عند حدوث حروق بسيطة؟',
        'كيف أحافظ على مستوى ضغط الدم والسكر في المعدل الطبيعي؟',
        'ما هي أفضل الأطعمة المقوية لجهاز المناعة؟',
        'نصائح أساسية للحفاظ على صحة الأسنان واللثة',
    ],
    firstAid: [
        'كيف أتصرف فوراً في حالة الرعاف ونزيف الأنف؟',
        'ما هي علامات السكتة الدماغية (FAST)؟',
        'خطوات التعامل مع ضربة الشمس والإغماء؟',
    ],
    chronic: [
        'ما هو المعدل الطبيعي لضغط الدم وما علامات ارتفاعه؟',
        'كيف أتعايش مع مرض السكري بطرق غذائية صحية؟',
        'نصائح للحفاظ على صحة القلب والشرايين',
    ],
    nutrition: [
        'ما هي الأطعمة الغنية بفيتامين د والحديد؟',
        'كم لتراً من الماء يحتاجه الجسم يومياً ولماذا؟',
        'بدائل صحية للسكريات والدهون المشبعة',
    ],
    child: [
        'متى يبدأ إدخال الأطعمة الصلبة للرضيع؟',
        'كيف أتعامل مع ارتفاع درجة حرارة الطفل؟',
        'نصائح لنوم آمن للرضع وتجنب المخاطر',
    ],
    women: [
        'أهمية حمض الفوليك قبل وخلال شهور الحمل الأولى؟',
        'نصائح لتخفيف غثيان الحمل بطرق طبيعية',
        'العناية بالتغذية والحديد أثناء فترة الحمل والرضاعة',
    ]
};

const CATEGORIES = [
    { key: 'all', label: '🌟 عام' },
    { key: 'firstAid', label: '🚑 إسعافات أولية' },
    { key: 'chronic', label: '❤️ ضغط وسكر' },
    { key: 'nutrition', label: '🥗 تغذية ومناعة' },
    { key: 'child', label: '👶 صحة الطفل' },
    { key: 'women', label: '👩‍⚕️ صحة المرأة' },
];

export default function QaisAI() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [showApiModal, setShowApiModal] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (customMessage) => {
        const messageToSend = customMessage || input.trim();
        if (!messageToSend || isLoading) return;

        const userMsg = { role: 'user', content: messageToSend };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            // Build conversation history for multi-turn AI context
            const payloadMessages = updatedMessages.map(m => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                content: m.content
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageToSend,
                    messages: payloadMessages
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'حدث خطأ في الاتصال بالذكاء الاصطناعي');
            }

            const aiMsg = {
                role: 'ai',
                content: data.response,
                model: data.model,
                relevantTips: data.relevantTips || []
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg = {
                role: 'ai',
                content: `⚠️ عذراً: ${error.message || 'تعذر الحصول على رد حالياً'}. يرجى المحاولة مرة أخرى.`,
                isError: true
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSendMessage();
    };

    const handleCopy = (text, index) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        }
    };

    const handleClearChat = () => {
        if (messages.length > 0 && window.confirm('هل تريد مسح المحادثة وبدء استشارة جديدة؟')) {
            setMessages([]);
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <div>
                            <h1>
                                <span>🤖</span>
                                قيس AI - المساعد الطبي الذكي
                            </h1>
                            <p className={styles.headerSubtitle}>
                                موسوعة دليل قيس الطبي المدعومة بالذكاء الاصطناعي (أكثر من 800 نصيحة طبية موثوقة)
                            </p>
                        </div>
                        <div className={styles.headerActions}>
                            <button
                                className={styles.headerBtn}
                                onClick={() => setShowApiModal(true)}
                                title="توثيق وطريقة رفع الـ API"
                            >
                                <span>🔌</span> واجهة الـ API
                            </button>
                            {messages.length > 0 && (
                                <button
                                    className={styles.headerBtn}
                                    onClick={handleClearChat}
                                    title="مسح المحادثة"
                                >
                                    <span>🗑️</span> مسح
                                </button>
                            )}
                            <Link href="/" className={styles.headerBtn}>
                                <span>🏠</span> الرئيسية
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Category Pills */}
                <div className={styles.categoryBar}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.key}
                            className={`${styles.categoryPill} ${activeCategory === cat.key ? styles.categoryPillActive : ''}`}
                            onClick={() => setActiveCategory(cat.key)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Messages Body */}
                <div className={styles.messagesContainer}>
                    {messages.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>🩺</div>
                            <h2>مرحباً بك في قيس AI الطبي!</h2>
                            <p>
                                اسألني أي سؤال عن الإسعافات الأولية، صحة الأسنان، التغذية، صحة الطفل والمرأة، أو الأمراض المزمنة، وسأجيبك فوراً استناداً إلى قاعدة بيانات دليل قيس الطبي.
                            </p>

                            <div className={styles.suggestionsGrid}>
                                {(CATEGORY_SUGGESTIONS[activeCategory] || CATEGORY_SUGGESTIONS.all).map((suggestion, idx) => (
                                    <button
                                        key={idx}
                                        className={styles.suggestionButton}
                                        onClick={() => handleSendMessage(suggestion)}
                                    >
                                        <span>{suggestion}</span>
                                        <span>←</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`${styles.message} ${message.role === 'user' ? styles.messageUser : styles.messageAi}`}
                                >
                                    <div
                                        className={`${styles.avatar} ${message.role === 'user' ? styles.userAvatar : styles.aiAvatar}`}
                                    >
                                        {message.role === 'user' ? '👤' : '🤖'}
                                    </div>
                                    <div
                                        className={`${styles.messageBubble} ${message.role === 'user' ? styles.userBubble : styles.aiBubble}`}
                                    >
                                        <div className={styles.aiBubbleContent}>
                                            {message.content}
                                        </div>

                                        {/* Cited Tips / Sources */}
                                        {message.relevantTips && message.relevantTips.length > 0 && (
                                            <div className={styles.sourcesBox}>
                                                <div className={styles.sourceBadge}>
                                                    📚 مراجع مستندة من دليل قيس الطبي:
                                                </div>
                                                <ul>
                                                    {message.relevantTips.map((tipObj, tIdx) => (
                                                        <li key={tIdx}>
                                                            <strong>[{tipObj.category}]</strong> {tipObj.tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Bubble Actions */}
                                        <div className={styles.bubbleActions}>
                                            {message.model && (
                                                <span className={styles.modelBadge}>
                                                    نموذج: {message.model}
                                                </span>
                                            )}
                                            <button
                                                className={styles.actionBtn}
                                                onClick={() => handleCopy(message.content, index)}
                                                title="نسخ النص"
                                            >
                                                {copiedIndex === index ? '✓ تم النسخ' : '📋 نسخ'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className={styles.messageAi}>
                                    <div className={`${styles.avatar} ${styles.aiAvatar}`}>
                                        🤖
                                    </div>
                                    <div className={styles.loadingBubble}>
                                        <span>قيس AI يقوم بتحليل السؤال والبحث في الموسوعة الطبية</span>
                                        <div className={styles.loadingDots}>
                                            <div className={styles.loadingDot}></div>
                                            <div className={styles.loadingDot}></div>
                                            <div className={styles.loadingDot}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input Area */}
                <div className={styles.inputContainer}>
                    <form onSubmit={handleSubmit} className={styles.inputForm}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="اكتب استشارتك أو سؤالك الطبي هنا..."
                            className={styles.input}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className={styles.sendButton}
                            disabled={isLoading || !input.trim()}
                        >
                            {isLoading ? 'جاري الإرسال...' : 'إرسال'}
                            <span>✈️</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Developer API Documentation Modal */}
            {showApiModal && (
                <div className={styles.modalOverlay} onClick={() => setShowApiModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3><span>🔌</span> واجهة برمجة التطبيقات (API Guide)</h3>
                            <button className={styles.closeBtn} onClick={() => setShowApiModal(false)}>✕</button>
                        </div>
                        <p>
                            يمكنك استخدام واجهة الذكاء الاصطناعي <strong>قيس AI</strong> كـ API مستقل لربطه مع أي موقع، تطبيق جوال (Flutter / React Native)، أو خدمة أخرى:
                        </p>

                        <h4>📌 مسار الـ Endpoint:</h4>
                        <div className={styles.codeBlock}>
                            POST /api/chat
                        </div>

                        <h4>✨ طلب التجربة عبر cURL:</h4>
                        <div className={styles.codeBlock}>
                            {`curl -X POST https://your-domain.com/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "ما هي خطوات إسعاف الحروق البسيطة؟"}'`}
                        </div>

                        <h4>💻 طلب التجربة عبر JavaScript / Fetch:</h4>
                        <div className={styles.codeBlock}>
                            {`const res = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'ما هي أعراض نقص فيتامين د؟'
  })
});
const data = await res.json();
console.log(data.response);`}
                        </div>

                        <h4>🛡️ المميزات التقنية المدمجة:</h4>
                        <ul>
                            <li><strong>دعم CORS كامل:</strong> يمكن استدعاؤه من أي نطاق خارجي أو تطبيق.</li>
                            <li><strong>تبديل تلقائي للنماذج (Failover Fallback):</strong> ينتقل بين أحدث نماذج Gemini تلقائياً لتفادي أي انقطاع.</li>
                            <li><strong>تضمين المعرفة الطبية:</strong> يبحث في أكثر من 800 نصيحة طبية متخصصة لدليل قيس الطبي ويزود الذكاء الاصطناعي بها مع كل استفسار.</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
