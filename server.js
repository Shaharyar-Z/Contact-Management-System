const express = require('express');
const connectDb = require('./config/db');
const path = require('path');

const app = express();

// Connect to MonogoDB
connectDb();

// Init middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


// Server static files on production server
if(process.env.NODE_ENV === 'production'){
    // Set Static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT =process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starting on PORT ${PORT}`));