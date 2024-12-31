# Web Wisdom 🧠

AI-Powered Contextual Chat for Websites using Next.js, Redis, and RAG

## Overview

Web Wisdom is an intelligent chat interface that provides contextual responses based on website content. Using Retrieval-Augmented Generation (RAG) and Redis for efficient data storage and retrieval, it delivers accurate and context-aware responses to user queries.

## 🚀 Features

- **Contextual AI Chat**: Intelligent responses based on your website's content
- **Redis-Powered Caching**: Fast and efficient data retrieval using Upstash Redis
- **RAG Implementation**: Enhanced response accuracy through document retrieval
- **Modern Tech Stack**: Built with Next.js 14 and TypeScript
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Real-time Processing**: Quick response times with optimized data handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: Upstash Redis
- **AI/ML**: RAG (Retrieval Augmented Generation)
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/web-wisdom.git
cd web-wisdom
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```env
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
OPENAI_API_KEY=your_openai_key
```

4. Run the development server:

```bash
npm run dev
```

## 🔧 Configuration

### Redis Setup

1. Create an account on [Upstash](https://upstash.com/)
2. Create a new Redis database
3. Copy the REST URL and REST Token
4. Add them to your environment variables

### RAG Implementation

The project uses RAG for enhanced response generation:

- Document indexing in Redis
- Vector similarity search
- Context-aware response generation

## 🌟 Usage

1. **Initialize the Chat**:

```typescript
import { WebWisdomChat } from '@/components/Chat';

<WebWisdomChat
  websiteUrl="your-website-url"
  apiKey="your-api-key"
/>
```

2. **Custom Configuration**:

```typescript
// Configure Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Upstash](https://upstash.com/) for Redis infrastructure
- [Next.js](https://nextjs.org/) team
- [OpenAI](https://openai.com/) for API support
- RAG implementation community
