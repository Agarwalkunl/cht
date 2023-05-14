const exp = require("express");
require("dotenv").config();
const app = exp();
const cors = require("cors");
app.use(exp.json());

app.use(cors());
const axios = require("axios");

const Port = process.env.port || 1000;

app.post("/text", async (req, resp) => {
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-002",
      prompt: req.body.k,
      max_tokens: 1000,

      temperature: 0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"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"}`,
      },
    }
  );

  resp.json({ data: response.data.choices[0].text });
});
app.post("/image", async (req, resp) => {
  const response = await axios.post(
    "https://api.openai.com/v1/images/generations",
    {
      model: "image-alpha-001",
      prompt: req.body.k,
      size: "1024x1024",
      response_format: "url",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"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"}`,
      },
    }
  );

  resp.json({ data: response.data.data[0].url });
});

app.listen(Port, (req, resp) => {
  console.log("server is running on 1000");
});
