const express = require('express');
const bodyParser = require('body-parser');

// Create the Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST method route
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid input'
        });
    }

    const user_id = 'john_doe_17091999';
    const email = 'john@xyz.com';
    const roll_number = 'ABCD123';

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());

    const highest_lowercase_alphabet = lowercaseAlphabets.length > 0
        ? [lowercaseAlphabets.sort().pop()]
        : [];

    res.json({
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highest_lowercase_alphabet
    });
});

// GET method route
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

