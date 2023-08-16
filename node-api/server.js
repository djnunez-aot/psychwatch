const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3001;
const FINNHUB_API_KEY = "YOUR_FINNHUB_API_KEY"; // Replace with your Finnhub API key
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
const GOOGLE_NEWS_API_KEY = "GOOGLE_NEWS_KEY";
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});fff

// Sample API Endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.get("/psychedelic-news", async (req, res) => {
  try {
    const response = await axios.get(
      "https://google-news-api1.p.rapidapi.com/search",
      {
        params: {
          q: "psychedelic",
          lang: "en",
        },
        headers: {
          "X-RapidAPI-Host": "google-news-api1.p.rapidapi.com",
          "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Dynamic ticker route
app.get("/stock/:ticker", async (req, res) => {
  const { ticker } = req.params;
  try {
    const endpoint = `https://finnhub.io/api/v1/quote?symbol=${ticker.toUpperCase()}&token=${FINNHUB_API_KEY}`;
    const response = await axios.get(endpoint);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch stock data for ${ticker}` });
  }
});

app.post("/stock-analysis", async (req, res) => {
  const { ticker } = req.body;

  if (!ticker) {
    return res.status(400).json({ error: "Ticker is required." });
  }

  try {
    const prompt = `Provide an in-depth analysis of the stock with ticker symbol ${ticker}.`;

    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-completion",
      {
        prompt: prompt,
        max_tokens: 200, // Limit the response length. Adjust as needed.
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const gpt3Response = response.data.choices[0].text.trim();
    res.json({ analysis: gpt3Response });
  } catch (error) {
    res.status(500).json({ error: `Failed to get analysis for ${ticker}` });
  }
});
