const express = require('express');
const fs = require('fs');
const path = require('path'); // Підключення модулю path
const cors = require('cors'); // Підключення пакету cors

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Дозвіл CORS для всіх джерел

app.get('/api/data', (req, res) => {
    // Формування шляху до файлу
    const filePath = path.join(__dirname, 'api', 'data', 'cocktail.json');
    console.log('File Path:', filePath);

    try {
        // Зчитування даних з файлу
        const data = fs.readFileSync(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data from file' });
    }
});

app.post('/api/data', (req, res) => {
    // Формування шляху до файлу
    const filePath = path.join(__dirname, 'api', 'data', 'cocktail.json');

    try {
        // Зчитування поточного вмісту файлу
        const rawData = fs.readFileSync(filePath, 'utf8');
        const existingData = JSON.parse(rawData);

        // Додавання нового об'єкта до масиву
        const newData = req.body;
        existingData.push(newData);

        // Запис нового вмісту назад до файлу
        fs.writeFileSync(filePath, JSON.stringify(existingData));

        res.json({ message: 'Data added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add data to file' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
