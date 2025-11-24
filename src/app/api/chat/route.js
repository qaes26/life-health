import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { message } = await request.json();

        if (!message || message.trim().length === 0) {
            return NextResponse.json(
                { error: 'الرجاء إدخال سؤال' },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key not configured. Please add GEMINI_API_KEY to .env.local' },
                { status: 500 }
            );
        }

        // Call Google Gemini API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `أنت "قيس AI"، مساعد ذكاء اصطناعي طبي متخصص في تقديم النصائح الطبية والصحية باللغة العربية. قدم إجابات مفيدة ودقيقة وواضحة.

السؤال: ${message}

الرجاء الإجابة بشكل واضح ومفيد باللغة العربية.`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API error:', errorData);
            return NextResponse.json(
                { error: 'حدث خطأ في الاتصال بالذكاء الاصطناعي' },
                { status: response.status }
            );
        }

        const data = await response.json();

        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text ||
            'عذراً، لم أتمكن من إنشاء إجابة. الرجاء المحاولة مرة أخرى.';

        return NextResponse.json({
            response: aiResponse
        });

    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.' },
            { status: 500 }
        );
    }
}
