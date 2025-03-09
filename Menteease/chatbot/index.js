
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors to handle CORS issues

const app = express();

// Enable CORS
app.use(cors());

// Use body parser for JSON requests
app.use(express.json());
app.use(bodyParser.json());

// Test route to check if the server is working
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyCJcxHtl27OAqK4t5hVoEXnpduDZdV4UVU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate content using the model
const generate = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    } catch (err) {
        console.log(err);
        throw new Error("Error generating content");
    }
};

// Endpoint to handle user input and return AI response
app.post('/api/content', async (req, res) => {
    try {
        const data = req.body.question; // Extract the question from the request body
        if (!data) {
            return res.status(400).send({ error: 'Question is required' });
        }
        const result = await generate(data);
        res.send({
            "result": result
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred while processing your request' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});
