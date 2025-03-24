
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/storyApp")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const storySchema = new mongoose.Schema({
    content: String
});
const Story = mongoose.model("Story", storySchema);

app.get("/stories", async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stories" });
    }
});

app.post("/stories", async (req, res) => {
    try {
        const newStory = new Story({ content: req.body.content });
        await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        res.status(500).json({ error: "Failed to save story" });
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));