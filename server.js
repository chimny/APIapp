import express from 'express';
import { handleDroneInstructions } from './gpt.js';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/drone', async (req, res) => {
    try {
        const { instruction } = req.body;
        const response = await handleDroneInstructions(instruction);
        res.json(JSON.parse(response.choices[0].message.content));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
