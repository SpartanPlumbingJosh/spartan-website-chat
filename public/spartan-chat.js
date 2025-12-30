/**
 * Spartan Plumbing Chat Widget v5
 * Powered by Sarah AI
 */
(function() {
  // Auto-detect API URL from script source
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  const scriptSrc = currentScript.src;
  const baseUrl = scriptSrc ? scriptSrc.replace('/widget/spartan-chat.js', '') : '';
  
  const CONFIG = {
    apiUrl: baseUrl + '/webchat/message',
    logo: 'data:image/jpeg;base64,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',
  };

  function generateSessionId() {
    return 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  let sessionId = localStorage.getItem('spartan_chat_session') || generateSessionId();
  localStorage.setItem('spartan_chat_session', sessionId);

  const styles = `
    #spartan-chat-widget {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
    }
    #spartan-chat-widget * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    #spartan-chat-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #B22222;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 12px rgba(0,0,0,0.15);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #spartan-chat-button:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
    #spartan-chat-button svg {
      width: 28px;
      height: 28px;
      fill: white;
    }
    #spartan-chat-window {
      display: none;
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 380px;
      height: 520px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 5px 40px rgba(0,0,0,0.16);
      flex-direction: column;
      overflow: hidden;
      z-index: 999998;
    }
    #spartan-chat-window.open {
      display: flex;
    }
    #spartan-chat-header {
      display: flex;
      align-items: center;
      padding: 16px;
      background: white;
      border-bottom: 1px solid #eee;
    }
    #spartan-chat-logo {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 12px;
    }
    #spartan-chat-title {
      flex: 1;
    }
    #spartan-chat-title h4 {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 2px;
    }
    #spartan-chat-title span {
      font-size: 13px;
      color: #666;
    }
    #spartan-chat-close {
      background: none;
      border: none;
      font-size: 24px;
      color: #999;
      cursor: pointer;
      padding: 4px 8px;
      line-height: 1;
    }
    #spartan-chat-close:hover {
      color: #666;
    }
    #spartan-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f7f7f7;
    }
    .spartan-msg {
      margin-bottom: 12px;
      display: flex;
    }
    .spartan-msg.user {
      justify-content: flex-end;
    }
    .spartan-msg.assistant {
      justify-content: flex-start;
    }
    .spartan-msg-content {
      max-width: 80%;
      padding: 12px 16px;
      border-radius: 18px;
      font-size: 14px;
      line-height: 1.4;
    }
    .spartan-msg.user .spartan-msg-content {
      background: #B22222;
      color: white;
      border-bottom-right-radius: 4px;
    }
    .spartan-msg.assistant .spartan-msg-content {
      background: white;
      color: #1a1a1a;
      border: 1px solid #e5e5e5;
      border-bottom-left-radius: 4px;
    }
    .spartan-typing {
      display: flex;
      gap: 4px;
      padding: 12px 16px;
      background: white;
      border: 1px solid #e5e5e5;
      border-radius: 18px;
      border-bottom-left-radius: 4px;
      width: fit-content;
    }
    .spartan-typing span {
      width: 8px;
      height: 8px;
      background: #B22222;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out;
    }
    .spartan-typing span:nth-child(1) { animation-delay: -0.32s; }
    .spartan-typing span:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }
    #spartan-chat-input-wrap {
      display: flex;
      padding: 12px 16px;
      background: white;
      border-top: 1px solid #eee;
      gap: 8px;
    }
    #spartan-chat-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #ddd;
      border-radius: 24px;
      font-size: 14px;
      outline: none;
    }
    #spartan-chat-input:focus {
      border-color: #B22222;
    }
    #spartan-chat-send {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #B22222;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #spartan-chat-send:hover {
      background: #9a1c1c;
    }
    #spartan-chat-send:disabled {
      background: #ccc;
    }
    #spartan-chat-send svg {
      width: 18px;
      height: 18px;
      fill: white;
      margin-left: 2px;
    }
    #spartan-chat-footer {
      padding: 10px;
      text-align: center;
      font-size: 11px;
      color: #999;
      background: #fafafa;
      border-top: 1px solid #eee;
    }
    @media (max-width: 420px) {
      #spartan-chat-window {
        width: calc(100% - 24px);
        height: 70vh;
        right: 12px;
        bottom: 80px;
      }
    }
  `;

  const sheet = document.createElement('style');
  sheet.textContent = styles;
  document.head.appendChild(sheet);

  const html = `
    <div id="spartan-chat-widget">
      <div id="spartan-chat-window">
        <div id="spartan-chat-header">
          <img id="spartan-chat-logo" src="${CONFIG.logo}" alt="Spartan">
          <div id="spartan-chat-title">
            <h4>Spartan Plumbing</h4>
            <span>Typically replies instantly</span>
          </div>
          <button id="spartan-chat-close">&times;</button>
        </div>
        <div id="spartan-chat-messages"></div>
        <div id="spartan-chat-input-wrap">
          <input id="spartan-chat-input" type="text" placeholder="Type your message...">
          <button id="spartan-chat-send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
        </div>
        <div id="spartan-chat-footer">Powered by Sarah AI</div>
      </div>
      <button id="spartan-chat-button">
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
      </button>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  const btn = document.getElementById('spartan-chat-button');
  const win = document.getElementById('spartan-chat-window');
  const close = document.getElementById('spartan-chat-close');
  const msgs = document.getElementById('spartan-chat-messages');
  const input = document.getElementById('spartan-chat-input');
  const send = document.getElementById('spartan-chat-send');

  let open = false, greeted = false;

  function toggle() {
    open = !open;
    win.classList.toggle('open', open);
    if (open && !greeted) {
      greeted = true;
      addMsg('assistant', 'How can I help you today?');
    }
    if (open) input.focus();
  }

  function addMsg(role, text) {
    const div = document.createElement('div');
    div.className = 'spartan-msg ' + role;
    div.innerHTML = '<div class="spartan-msg-content">' + text.replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'spartan-msg assistant';
    div.id = 'typing';
    div.innerHTML = '<div class="spartan-typing"><span></span><span></span><span></span></div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('typing');
    if (t) t.remove();
  }

  async function sendMsg() {
    const text = input.value.trim();
    if (!text) return;
    addMsg('user', text);
    input.value = '';
    send.disabled = true;
    showTyping();
    try {
      const res = await fetch(CONFIG.apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sessionId, message: text})
      });
      const data = await res.json();
      hideTyping();
      addMsg('assistant', data.response || 'Sorry, please call (937) 203-0339.');
    } catch(e) {
      hideTyping();
      addMsg('assistant', 'Connection issue. Please call (937) 203-0339.');
    }
    send.disabled = false;
    input.focus();
  }

  btn.onclick = toggle;
  close.onclick = toggle;
  send.onclick = sendMsg;
  input.onkeypress = e => { if (e.key === 'Enter') sendMsg(); };
})();

