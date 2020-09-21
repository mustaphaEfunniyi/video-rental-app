const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, genre: "Action"},
    { id: 2, genre: "Romance"},
    { id: 3, genre: "Horror"}
];


router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(m => m.id === parseInt(req.params.id));

    if (!genre) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
        return;
    }

    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);

    if (error) {
        res.status(400)
            .send(error.details[0].message);
            return;
    }

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(m => m.id === parseInt(req.params.id));

    if (!genre) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
        return;
    }

    const { error } = validateGenre(req.body);

    if (error) {
        res.status(400)
            .send(error.details[0].message);
            return;
    }

    genre.genre = req.body.genre;
    res.send(genre);
})

router.delete('/:id', (req, res) => {
    const genre = genres.find(m => m.id === parseInt(req.params.id));

    if (!genre) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
        return;
    }

   const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

const validateGenre = function(genre) {
    const schema = Joi.object({
        genre: Joi.string()
            .min(3)
            .required()
    })

    return schema.validate(genre);
}

module.exports = router;