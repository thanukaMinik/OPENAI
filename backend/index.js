const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Send user message to OpenAI API and get the response
  try {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a stock assistant.' }, { role: 'user', content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer sk-gB-CSRkah3lpO1y62w12LOwfsll42t1HQ_5iJhaJifT3BlbkFJD9y7xD0uEsxUCT`,
        },
      }
    );

    const assistantReply = openaiResponse.data.choices[0].message.content;
    res.json({ reply: assistantReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error communicating with OpenAI' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
