// import express server
const express = require('express')
// import userController js file
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const multerConfig = require('../Middleware/multerMiddleware')
const jwtmiddleware = require('../Middleware/jwtmiddleware')
// create router for express app using Router()
const router = new express.Router()


// define different routes for server app
// register
router.post('/user/register',userController.register)


// login
router.post('/user/login',userController.login)

// Addproject
router.post('/projects/add', jwtmiddleware, multerConfig.single('projectImage'),projectController.addProject)

// get all user Project
router.get('/user/projects', jwtmiddleware, projectController.getAllUserProjects)

// get home projects
router.get('/home/projects',projectController.gethomeprojects)

// get all home projects (after login)
router.get('/projects/all',jwtmiddleware,projectController.getallhomeprojects)

// edit project
router.put('/project/edit/:id',jwtmiddleware,multerConfig.single('projectImage'),projectController.editproject)

// delete project
router.delete('/project/remove/:id',jwtmiddleware,projectController.deleteproject)

// update profile
router.put('/user/update',jwtmiddleware,multerConfig.single('userImage'),userController.updateProfile)

// export router
module.exports = router