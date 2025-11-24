# Qais AI Setup Instructions

## 🔑 Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## ⚙️ Configure the Application

1. Create a file named `.env.local` in the root directory of your project:
   ```
   c:\Users\طلال ابو قيس\Desktop\my new code\.env.local
   ```

2. Add your API key to the file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. Save the file

## 🚀 Run the Application

1. Open terminal in your project directory
2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Click on the **"قيس AI - المساعد الذكي"** card on the homepage

5. Start asking questions!

## ✨ Features

- **Arabic Language Support**: All responses in Arabic
- **Medical Focus**: Specialized in health and medical questions
- **Beautiful UI**: Modern, gradient-based design
- **Responsive**: Works on desktop and mobile
- **Real-time Chat**: Get instant AI responses

## 📝 Example Questions

Try asking:
- ما هي أفضل الأطعمة لتقوية المناعة؟
- كيف أعتني بصحتي النفسية؟
- ما هي أعراض نقص فيتامين د؟
- نصائح للحفاظ على صحة القلب

---

**Note**: The API key is free to use with generous limits. Keep it secret and never commit `.env.local` to Git!
