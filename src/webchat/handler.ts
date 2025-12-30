import { Router, Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Store conversations by session ID
const conversations: Map<string, Array<{ role: 'user' | 'assistant'; content: string }>> = new Map();
const conversationTimestamps: Map<string, number> = new Map();

// Cleanup old conversations (30 min timeout)
const CONVERSATION_TIMEOUT = 30 * 60 * 1000;

function cleanupOldConversations() {
  const now = Date.now();
  for (const [sessionId, timestamp] of conversationTimestamps.entries()) {
    if (now - timestamp > CONVERSATION_TIMEOUT) {
      conversations.delete(sessionId);
      conversationTimestamps.delete(sessionId);
    }
  }
}

const SYSTEM_PROMPT = `You are Sarah, a friendly AI assistant for Spartan Plumbing & Drains in Dayton, Ohio. You're chatting with customers on the website.

Your personality:
- Warm, helpful, and professional
- Knowledgeable about plumbing but explain things simply
- Eager to help schedule service appointments
- Never pushy, always patient

Your capabilities:
1. Answer questions about plumbing services and pricing
2. Help customers schedule service appointments
3. Provide information about service areas and hours
4. Explain common plumbing issues
5. Collect customer information for callbacks

Services offered:
- Plumbing repairs (leaks, pipes, fixtures, toilets, faucets)
- Drain cleaning & sewer services
- Water heater repair & installation
- Sump pump services
- Water treatment & softeners
- 24/7 emergency service available

Service areas: Dayton, Centerville, Kettering, Beavercreek, Springboro, Miamisburg, and surrounding Miami Valley

Hours: Mon-Fri 7am-6pm, Sat 8am-2pm, 24/7 for emergencies

Pricing guidance (give ranges, not exact quotes):
- Service call / diagnostic: starts around $89
- Most repairs: $150-500 depending on complexity
- Drain cleaning: $150-350
- Water heater repair: $200-600
- Water heater replacement: $1,500-3,500 installed
- Always mention free estimates for larger jobs

Shield Membership ($99/year):
- 15% off all services
- Priority scheduling
- No trip/diagnostic fees
- Annual plumbing inspection

When collecting info for scheduling:
1. Get their name
2. Get their phone number
3. Get their address (street, city, zip)
4. Understand their plumbing issue
5. Ask about preferred timing

Keep responses concise - 1-3 sentences for simple questions, more detail only when needed.
Use occasional emojis sparingly (👍 ✅ 🔧) to be friendly but professional.

If it's a true emergency (gas leak, flooding, sewage backup), emphasize calling 911 if dangerous, otherwise assure them you can get help ASAP.`;

router.post('/message', async (req: Request, res: Response) => {
  try {
    const { sessionId, message } = req.body;
    
    if (!sessionId || !message) {
      return res.status(400).json({ error: 'Missing sessionId or message' });
    }

    cleanupOldConversations();

    // Get or create conversation
    let history = conversations.get(sessionId) || [];
    conversationTimestamps.set(sessionId, Date.now());

    // Add user message
    history.push({ role: 'user', content: message });

    // Keep last 20 messages
    if (history.length > 20) {
      history = history.slice(-20);
    }

    // Get AI response
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: history,
    });

    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : "I'm having trouble responding. Please call us at (937) 203-0339.";

    // Save to history
    history.push({ role: 'assistant', content: assistantMessage });
    conversations.set(sessionId, history);

    console.log(`[WebChat] Session ${sessionId.slice(0,8)}: "${message.slice(0,50)}..." -> "${assistantMessage.slice(0,50)}..."`);

    return res.json({ 
      response: assistantMessage,
      sessionId 
    });

  } catch (error: any) {
    console.error('[WebChat] Error:', error);
    return res.json({ 
      response: "I'm having a bit of trouble right now. Please call us at (937) 203-0339 for immediate assistance!",
      error: true 
    });
  }
});

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    activeConversations: conversations.size 
  });
});

export default router;

