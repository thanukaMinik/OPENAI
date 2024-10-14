import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSend = async () => {
    // Add user's message to the chat
    setMessages([...messages, { sender: 'user', text: userInput }]);

    // Send user input to the server (Node.js)
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    // Add the assistant's response to the chat
    setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'assistant', text: data.reply }]);
    setUserInput('');
  };

  return (
    <div className="App">
      <h1>Stock Assistant</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <b>{msg.sender === 'user' ? 'You' : 'Assistant'}: </b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
