const express = require('express')
const router = express.Router();

const usersController = require('../controllers/usersController');
const animalController = require('../controllers/animalController');
const commentsController = require('../controllers/commentsController');
const typesController = require('../controllers/typesController');

// users:
router.get('/getUsers', usersController.getUsers);
router.get('/getUser/:id', usersController.getUser);
router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.patch('/updateUser/:id', usersController.updateUser);

// animals:
router.get('/getAnimalsList', animalController.getAnimalsList)
router.post('/addAnimal', animalController.addAnimal);
router.patch('/updateAnimal/:id', animalController.updateAnimal);
router.delete('/removeAnimal/:id', animalController.removeAnimal);

// comments:
router.get('/getAllComments', commentsController.getAllComments)
router.get('/getCommentsByAnimalId/:id', commentsController.getCommentsByAnimalId)
router.post('/createComment', commentsController.createComment)

// animal types:
router.get('/getTypes', typesController.getTypes);
router.post('/addType', typesController.addType);
router.delete('/deleteType/:id', typesController.deleteType);

module.exports = router