'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function QaisAI() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const suggestions = [
        'ما هي أفضل الأطعمة لتقوية المناعة؟',
        'كيف أعتني بصحتي النفسية؟',
        'ما هي أعراض نقص فيتامين د؟',
        'نصائح للحفاظ على صحة القلب',
    ];

    const handleSendMessage = async (message) => {
        const messageToSend = message || input.trim();

        if (!messageToSend) return;

        // Add user message
        const userMessage = { role: 'user', content: messageToSend };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: messageToSend }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'حدث خطأ في الاتصال');
            }

            // Add AI response
            const aiMessage = { role: 'ai', content: data.response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                role: 'ai',
                content: `عذراً، حدث خطأ: ${error.message}. الرجاء المحاولة مرة أخرى.`
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSendMessage();
    };

    const handleSuggestionClick = (suggestion) => {
        handleSendMessage(suggestion);
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
                {/* Header */}
                <div className={styles.header}>
                    <h1>
                        <span>🤖</span>
                        قيس AI - مساعدك الذكي
                    </h1>
                    <p>اسألني أي سؤال طبي أو صحي وسأكون سعيداً بمساعدتك!</p>
                    <Link href="/" style={{ color: 'white', marginTop: '1rem', display: 'inline-block', opacity: 0.9 }}>
                        ← العودة للصفحة الرئيسية
                    </Link>
                </div>

                {/* Messages */}
                <div className={styles.messagesContainer}>
                    {messages.length === 0 ? (
                        <div className={styles.emptyState}>
                            <h2>مرحباً بك في قيس AI! 👋</h2>
                            <p>اختر أحد الأسئلة المقترحة أو اكتب سؤالك الخاص:</p>
                            <div className={styles.suggestionsList}>
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        className={styles.suggestionButton}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`${styles.message} ${message.role === 'user' ? styles.messageUser : styles.messageAi
                                        }`}
                                >
                                    <div
                                        className={`${styles.avatar} ${message.role === 'user' ? styles.userAvatar : styles.aiAvatar
                                            }`}
                                    >
                                        {message.role === 'user' ? '👤' : '🤖'}
                                    </div>
                                    <div
                                        className={`${styles.messageBubble} ${message.role === 'user' ? styles.userBubble : styles.aiBubble
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className={styles.messageAi}>
                                    <div className={`${styles.avatar} ${styles.aiAvatar}`}>
                                        🤖
                                    </div>
                                    <div className={styles.loading}>
                                        <span>جاري التفكير</span>
                                        <div className={styles.loadingDots}>
                                            <div className={styles.loadingDot}></div>
                                            <div className={styles.loadingDot}></div>
                                            <div className={styles.loadingDot}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Input */}
                <div className={styles.inputContainer}>
                    <form onSubmit={handleSubmit} className={styles.inputForm}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="اكتب سؤالك هنا..."
                            className={styles.input}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className={styles.sendButton}
                            disabled={isLoading || !input.trim()}
                        >
                            {isLoading ? 'جاري الإرسال...' : 'إرسال'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
