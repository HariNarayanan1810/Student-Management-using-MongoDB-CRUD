const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/Student');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentdbB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', async (req, res) => {
    const students = await Student.find();
    res.render('index', { students });
});

app.post('/add', async (req, res) => {
    const { name, roll, category, address, mobile } = req.body;

    const studentData = {
        name,
        roll,
        category,
    };

    if (category === 'Dayscholar') {
        studentData.parentInfo = {
            address,
            mobile,
        };
    }

    await Student.create(studentData);
    res.redirect('/');
});

app.post('/update/:id', async (req, res) => {
    const { name, roll, category, address, mobile } = req.body;

    const updatedData = {
        name,
        roll,
        category,
    };

    if (category === 'Dayscholar') {
        updatedData.parentInfo = {
            address,
            mobile,
        };
    } else {
        updatedData.parentInfo = undefined; // remove nested data if changed to Hosteller
    }

    await Student.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
