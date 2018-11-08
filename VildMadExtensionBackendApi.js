const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const config = require('./config');

// Setup mongoose & MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl, { useNewUrlParser: true });

const app = express();

// Setup Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

// Routes
const users = require('./routes/users');
const ingredients = require('./routes/ingredients');
const findings = require('./routes/findings');

app.use('/api/users', users);
app.use('/api/ingredients', ingredients);
app.use('/api/findings', findings);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Handler function 
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    res.status(status).json({
        error: {
            message: error.message
        }
    });

    console.error(err);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server listening on port ${port}`); });