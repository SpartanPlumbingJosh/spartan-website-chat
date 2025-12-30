import express from 'express';
import cors from 'cors';
import path from 'path';
import webchatRouter from './webchat/handler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (widget JS, test page)
app.use('/widget', express.static(path.join(__dirname, '../public')));

// Webchat API routes
app.use('/webchat', webchatRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'spartan-website-chat',
    timestamp: new Date().toISOString()
  });
});

// Root redirect to test page
app.get('/', (req, res) => {
  res.redirect('/widget/chat-test.html');
});

app.listen(PORT, () => {
  console.log(`🚀 Spartan Website Chat running on port ${PORT}`);
  console.log(`📱 Widget: http://localhost:${PORT}/widget/spartan-chat.js`);
  console.log(`🧪 Test page: http://localhost:${PORT}/widget/chat-test.html`);
  console.log(`💬 API: http://localhost:${PORT}/webchat/message`);
});
