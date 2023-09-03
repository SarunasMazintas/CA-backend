const express = require('express')
const router = express.Router();

const usersController = require('../controllers/usersController');
const animalController = require('../controllers/animalController');

// users:
router.get('/getUsers', usersController.getUsers);
router.get('/getUser/:id', usersController.getUser);
router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.patch('/updateUser', usersController.updateUser);

// animals:
router.get('/getAnimalsList', animalController.getAnimalsList)
router.post('/addAnimal', animalController.addAnimal);


module.exports = router