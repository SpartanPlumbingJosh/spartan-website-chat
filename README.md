# Spartan Website Chat

AI-powered website chat widget for Spartan Plumbing & Drains, powered by Sarah AI (Claude).

## Features

- 🤖 Claude-powered AI conversations
- 💬 Session-based chat with conversation history
- 🎨 Spartan branding (red & gold theme)
- 📱 Mobile responsive
- ⚡ Lightweight embeddable widget

## Deployment

This service is deployed on Railway and serves:
- `/webchat/message` - Chat API endpoint
- `/webchat/health` - Health check
- `/widget/spartan-chat.js` - Embeddable widget
- `/widget/chat-test.html` - Test page

## Embed on Your Website

Add this single line before the closing `</body>` tag:

```html
<script src="YOUR_RAILWAY_URL/widget/spartan-chat.js"></script>
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `ANTHROPIC_API_KEY` - Claude API key

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```
