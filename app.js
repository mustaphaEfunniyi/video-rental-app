const Joi = require('joi');
const express = require('express');
const genresRouter = require('./routes/genres');
const home = require('./routes/home');

const app = express();

app.set('view engine', 'pug');
app.use(express.json());
app.use('/', home);
app.use('/api/genres', genresRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...!!!`);
});