const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => {
    console.log(err);
});

// student model
const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    standard: {
        type: String,
        required: true
    }
});

const Student = mongoose.model('Student', StudentSchema);

// Create a new Student
app.post('/students', async (req, res) => {
    const { name, email, age,standard } = req.body;

    try {
        const newStudent = new Student({ name, email, age ,standard});
        await newStudent.save();
        res.send({message:'Student created successfully',statusCode:201,data:newStudent});
    } catch (error) {
        res.send({ message: error.message,statusCode:500 });
    }
});

// Get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a Student by ID
app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a Student by ID
app.put('/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
        res.send({data:updatedStudent,statusCode:200});
    } catch (error) {
        res.send({ message: error.message,statusCode:500 });
    }
});

// Delete a Student by ID
app.delete('/students/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
        res.send({ message: 'Student deleted successfully',statusCode:200 });
    } catch (error) {
        res.send({ message: error.message,statusCode:500 });
    }
});

// Start the server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
