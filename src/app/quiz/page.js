"use client";
import { useState } from "react";
import styles from "../section.module.css";
import quizStyles from "./quiz.module.css";

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const questions = [
        {
            question: "ما هو المعدل الطبيعي لضغط الدم؟",
            options: ["120/80", "140/90", "100/60", "130/85"],
            answer: "120/80",
        },
        {
            question: "أي فيتامين يتم إنتاجه في الجلد عند التعرض للشمس؟",
            options: ["فيتامين C", "فيتامين D", "فيتامين A", "فيتامين B12"],
            answer: "فيتامين D",
        },
        {
            question: "كم عدد عظام جسم الإنسان البالغ؟",
            options: ["206", "250", "180", "300"],
            answer: "206",
        },
        {
            question: "ما هو العضو المسؤول عن تنقية الدم من السموم؟",
            options: ["القلب", "الكبد", "المعدة", "الرئة"],
            answer: "الكبد",
        },
        {
            question: "ما هو الهرمون المسؤول عن تنظيم مستوى السكر في الدم؟",
            options: ["الأدرينالين", "الإنسولين", "الثيروكسين", "الكورتيزون"],
            answer: "الإنسولين",
        },
        {
            question: "أي فصيلة دم تعتبر 'المعطي العام'؟",
            options: ["A+", "O-", "AB+", "B-"],
            answer: "O-",
        },
        {
            question: "ما هو أكبر عضو في جسم الإنسان؟",
            options: ["الكبد", "الجلد", "الرئة", "الأمعاء"],
            answer: "الجلد",
        },
        {
            question: "كم عدد حجرات القلب؟",
            options: ["2", "3", "4", "5"],
            answer: "4",
        },
        {
            question: "ما هو العنصر الكيميائي الذي يرمز له بـ Fe؟",
            options: ["الحديد", "الفلور", "الزنك", "النحاس"],
            answer: "الحديد",
        },
        {
            question: "ما هي المدة المثالية لغسل اليدين؟",
            options: ["5 ثواني", "10 ثواني", "20 ثانية", "دقيقة كاملة"],
            answer: "20 ثانية",
        },
    ];

    const handleAnswerClick = (option) => {
        if (selectedAnswer) return; // Prevent multiple clicks

        setSelectedAnswer(option);
        const correct = option === questions[currentQuestion].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                setShowScore(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>تحدي المعلومات الطبية</h1>
                    <p className={styles.subtitle}>اختبر معلوماتك الطبية في هذا الاختبار الممتع</p>
                </div>
            </header>

            <div className={`container ${styles.content}`}>
                <div className={quizStyles.quizContainer}>
                    {showScore ? (
                        <div className={quizStyles.scoreSection}>
                            <h2>نتيجتك النهائية</h2>
                            <div className={quizStyles.scoreCircle}>
                                {score} / {questions.length}
                            </div>
                            <p>
                                {score === questions.length
                                    ? "مذهل! أنت طبيب بالفطرة 🩺👨‍⚕️"
                                    : score >= questions.length / 2
                                        ? "جيد جداً! معلوماتك الطبية قوية 👍"
                                        : "حاول مرة أخرى لتعزيز معلوماتك 📚"}
                            </p>
                            <button onClick={resetQuiz} className="btn">
                                إعادة الاختبار
                            </button>
                        </div>
                    ) : (
                        <div className={quizStyles.questionSection}>
                            <div className={quizStyles.questionCount}>
                                <span>السؤال {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <h2 className={quizStyles.questionText}>
                                {questions[currentQuestion].question}
                            </h2>
                            <div className={quizStyles.answerOptions}>
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerClick(option)}
                                        className={`${quizStyles.answerBtn} ${selectedAnswer === option
                                                ? option === questions[currentQuestion].answer
                                                    ? quizStyles.correct
                                                    : quizStyles.wrong
                                                : ""
                                            }`}
                                        disabled={selectedAnswer !== null}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
