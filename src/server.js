const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const { connectDatabase } = require('./utils/database');

dotenv.config();

connectDatabase();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const books = require('./routes/books');
const user = require('./routes/user');

app.use('/auth', user);
app.use('/', books);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));
