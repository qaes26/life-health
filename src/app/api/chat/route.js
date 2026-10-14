import { NextResponse } from 'next/server';
import { buildMedicalSystemPrompt, searchMedicalKnowledge, MEDICAL_SECTIONS } from '@/lib/medicalKnowledge';

// Groq models for ultra-fast medical inference
const GROQ_MODELS = [
    'qwen/qwen3.8-27b',
    'allam-2-7b',
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b'
];

// Gemini models fallback
const GEMINI_MODELS = [
    'gemini-3.5-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-3.8-flash'
];

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-groq-key, x-gemini-key',
};

// Shuffles an array randomly for load balancing and key rotation
function shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Retrieves configured Groq keys as an array
function getGroqKeys(headerKey = null) {
    if (headerKey) return [headerKey];

    const raw = process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || '';
    const keys = raw
        .split(/[,\n\r\s]+/)
        .map(k => k.trim())
        .filter(k => k.startsWith('gsk_'));

    return keys;
}

// Preflight CORS handler
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
}

// GET /api/chat - Status & API Documentation
export async function GET() {
    const configuredGroqKeys = getGroqKeys();
    return NextResponse.json({
        name: "Qais AI Medical API",
        version: "2.1.0",
        author: "قيس طلال الجازي",
        platform: "دليل قيس الطبي | Qais Medical Guide",
        description: "واجهة برمجة تطبيقات الذكاء الاصطناعي الطبي بدعم التدوير العشوائي للمفاتيح (Random Key Rotation) لأقصى سرعة واستقرار.",
        status: "active",
        keyRotation: {
            enabled: true,
            activeKeysCount: configuredGroqKeys.length,
            strategy: "Random Load-Balancing & Failover Rotation"
        },
        models: {
            primaryEngine: "Groq Ultra-Fast API",
            primaryModels: GROQ_MODELS,
            fallbackEngine: "Google Gemini",
            fallbackModels: GEMINI_MODELS
        },
        usage: {
            endpoint: "/api/chat",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-groq-key": "(اختياري) مفتاح Groq مخصص",
                "x-gemini-key": "(اختياري) مفتاح Gemini مخصص"
            },
            examplePayload: {
                message: "ما هي خطوات الإسعاف الأولي عند حدوث حروق بسيطة؟"
            }
        },
        sections: MEDICAL_SECTIONS
    }, {
        headers: CORS_HEADERS
    });
}

// POST /api/chat - Main AI Inference with Random Key Rotation
export async function POST(request) {
    try {
        const body = await request.json().catch(() => ({}));
        const { message, messages } = body;

        // Resolve conversation input
        let lastUserMessage = '';
        const formattedMessages = [];

        if (Array.isArray(messages) && messages.length > 0) {
            for (const msg of messages) {
                const role = (msg.role === 'user' || msg.role === 'human') ? 'user' : 'assistant';
                const content = typeof msg.content === 'string' ? msg.content.trim() : '';
                if (content) {
                    formattedMessages.push({ role, content });
                    if (role === 'user') {
                        lastUserMessage = content;
                    }
                }
            }
        } else if (typeof message === 'string' && message.trim().length > 0) {
            lastUserMessage = message.trim();
            formattedMessages.push({
                role: 'user',
                content: lastUserMessage
            });
        }

        if (!lastUserMessage) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'الرجاء إدخال رسالة أو سؤال طبي صالح'
                },
                { status: 400, headers: CORS_HEADERS }
            );
        }

        // Search medical knowledge base (800+ tips) for matching context
        const relevantSources = searchMedicalKnowledge(lastUserMessage, 4);
        const systemPrompt = buildMedicalSystemPrompt(lastUserMessage);

        // Header keys (if passed by external clients)
        const customGroqKey = request.headers.get('x-groq-key');
        const customGeminiKey = request.headers.get('x-gemini-key');

        // Step 1: Try Groq with Random Key Rotation
        const availableGroqKeys = getGroqKeys(customGroqKey);
        const randomizedGroqKeys = shuffleArray(availableGroqKeys);

        let successfulResponse = null;
        let usedModel = null;
        let usedProvider = null;
        let lastError = null;

        if (randomizedGroqKeys.length > 0) {
            const groqMessages = [
                { role: 'system', content: systemPrompt },
                ...formattedMessages
            ];

            // Loop over randomized keys (distributes load and bypasses rate limits)
            keyLoop: for (let keyIdx = 0; keyIdx < randomizedGroqKeys.length; keyIdx++) {
                const currentKey = randomizedGroqKeys[keyIdx];

                // Try Groq models
                for (const model of GROQ_MODELS) {
                    try {
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 12000);

                        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${currentKey}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                model,
                                messages: groqMessages,
                                temperature: 0.6,
                                max_tokens: 1500
                            }),
                            signal: controller.signal
                        });

                        clearTimeout(timeoutId);

                        if (res.ok) {
                            const data = await res.json();
                            const text = data.choices?.[0]?.message?.content;
                            if (text) {
                                successfulResponse = text;
                                usedModel = model;
                                usedProvider = `Groq (Key #${keyIdx + 1})`;
                                break keyLoop; // Succeeded! Exit key loop
                            }
                        } else {
                            const errBody = await res.text();
                            lastError = `Groq key ${currentKey.slice(0, 8)}... (${model}) error ${res.status}: ${errBody}`;
                            console.warn(`[Qais AI] ${lastError}, rotating to next key/model...`);
                            // If rate limit (429), break model loop to switch key immediately
                            if (res.status === 429) {
                                break;
                            }
                        }
                    } catch (err) {
                        lastError = `Groq fetch error: ${err.message}`;
                        console.warn(`[Qais AI] ${lastError}`);
                    }
                }
            }
        }

        // Step 2: Fallback to Google Gemini if Groq was not available or failed
        if (!successfulResponse) {
            const geminiKey = customGeminiKey || process.env.GEMINI_API_KEY;
            if (geminiKey) {
                console.log('[Qais AI] Falling back to Gemini API...');

                const geminiContents = formattedMessages.map(m => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.content }]
                }));

                const geminiPayload = {
                    system_instruction: {
                        parts: [{ text: systemPrompt }]
                    },
                    contents: geminiContents,
                    generationConfig: {
                        temperature: 0.6,
                        maxOutputTokens: 1500
                    }
                };

                for (const model of GEMINI_MODELS) {
                    try {
                        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 15000);

                        const res = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(geminiPayload),
                            signal: controller.signal
                        });

                        clearTimeout(timeoutId);

                        if (res.ok) {
                            const data = await res.json();
                            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                            if (text) {
                                successfulResponse = text;
                                usedModel = model;
                                usedProvider = 'Google Gemini';
                                break;
                            }
                        }
                    } catch (err) {
                        console.warn(`[Qais AI] Gemini ${model} error:`, err.message);
                    }
                }
            }
        }

        if (!successfulResponse) {
            console.error('[Qais AI] All providers failed. Last error:', lastError);
            return NextResponse.json(
                {
                    success: false,
                    error: 'عذراً، تواجه خدمة الذكاء الاصطناعي ضغطاً حالياً. يرجى المحاولة بعد قليل.',
                    details: process.env.NODE_ENV === 'development' ? lastError : undefined
                },
                { status: 503, headers: CORS_HEADERS }
            );
        }

        return NextResponse.json({
            success: true,
            response: successfulResponse,
            model: usedModel,
            provider: usedProvider,
            relevantTips: relevantSources.map(s => ({ category: s.category, tip: s.text })),
            disclaimer: 'المعلومات والإرشادات الطبية الواردة من قيس AI هي لأغراض التوعية والتثقيف الصحي فقط، ولا تعد بديلاً عن الكشف الطبي والتشخيص السريري المباشر لدى الطبيب المختص.'
        }, {
            headers: CORS_HEADERS
        });

    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'حدث خطأ غير متوقع في معالجة الاستشارة الطبية.'
            },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}
