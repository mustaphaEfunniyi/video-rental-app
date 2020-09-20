const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

const movies = [
    { id: 1, genre: "Action"},
    { id: 2, genre: "Romance"},
    { id: 3, genre: "Horror"}
];

app.get('/', (req, res) => {
    res.send("Hello world!!!!");
});

app.get('/api/movies', (req, res) => {
    res.send(movies);
});

app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));

    if (!movie) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
        return;
    }

    res.send(movie);
});

app.post('/api/movies', (req, res) => {
    const { error } = validateMovie(req.body);

    if (error) {
        res.status(400)
            .send(error.details[0].message);
            return;
    }

    const movie = {
        id: movies.length + 1,
        genre: req.body.genre
    }
    movies.push(movie);
    res.send(movie);
});

app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));

    if (!movie) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
        return;
    }

    const { error } = validateMovie(req.body);

    if (error) {
        res.status(400)
            .send(error.details[0].message);
            return;
    }

    movie.genre = req.body.genre;
    res.send(movie);
})

app.delete('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));

    if (!movie) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
        return;
    }

   const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movie);
});

const validateMovie = function(movie) {
    const schema = Joi.object({
        genre: Joi.string()
            .min(3)
            .required()
    })

    return schema.validate(movie);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...!!!`);
});