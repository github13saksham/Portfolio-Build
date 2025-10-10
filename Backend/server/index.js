require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Backend is running");
});

app.post("/api/chat", async (req, res) => {
	const { message } = req.body;

	console.log("Using API Key:", process.env.OPENAI_API_KEY); // Debug line

	try {
		const response = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-3.5-turbo",
				messages: [{ role: "user", content: message }],
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY1}`,
					"Content-Type": "application/json",
				},
			}
		);

		const botResponse = response.data.choices[0].message.content;
		res.json({ response: botResponse });
	} catch (error) {
		console.error("OpenAI API error:", error.response?.data || error.message);
		res.status(500).json({ response: "Something went wrong." });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
	console.log(`Backend running at http://localhost:${PORT}`)
);
