
const express = require('express');
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: 'Rahul', age: 20, department: 'CSE' },
    { id: 2, name: 'Priya', age: 21, department: 'CSE' }
];

// GET: Display all students
app.get('/students', (req, res) => {
    res.json(students);
});

// POST: Add a student
app.post('/students', (req, res) => {
    const id = Math.max(0, ...students.map(s => s.id)) + 1;
    const student = { id, ...req.body };
    students.push(student);
    res.status(201).json(student);
});

// PUT: Update a student
app.put('/students/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Not found' });
    }

    students[index] = { id, ...req.body };
    res.json(students[index]);
});

// PATCH: Update selected fields
app.patch('/students/:id', (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: 'Not found' });
    }

    Object.assign(student, req.body);
    res.json(student);
});

// DELETE: Remove a student
app.delete('/students/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Not found' });
    }

    students.splice(index, 1);
    res.json({ message: 'Deleted successfully' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
