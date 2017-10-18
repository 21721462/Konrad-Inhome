/**
 * The main router for the CITS3200 Group D project
 */

var express = require('express');
var passport = require('passport');
var router = express.Router();
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname));
  }
});

var uploadFile = multer({ storage : storage});

var type = uploadFile.single('csvFile');

var coordinatorController = require('../controllers/coordinatorController');
var projectController = require('../controllers/projectController');
var studentController = require('../controllers/studentController');


/*
Coordinator Routes
*/
router.post('/coordinator/upload', type, coordinatorController.uploadcsv);

router.get('/CoordinatorLogin', coordinatorController.coordinatorLoginGet);

router.post('/CoordinatorLogin', coordinatorController.cooridnatorLoginPost);

router.get('/coordinator', coordinatorController.coordinatorLogin);

router.post('/coordinatordeleterowstudent', coordinatorController.deleteRowStudent);

router.post('/coordinatordeleterowproject', coordinatorController.deleteRowProject);

router.post('/coordinatorsaverowstudent', coordinatorController.editRowStudent);

router.post('/coordinatorsaverowproject', coordinatorController.editRowProject);

router.post('/allocateProjects', coordinatorController.allocateProjects);

/*
Student Routes
*/


// Get request for student form submission
router.get('/student', studentController.studentRegisterGet);
// Posts the form for students data to the DB
router.post('/student', studentController.studentRegisterPost);


router.get('/project', projectController.academicPageGet);
router.post('/project', projectController.academicPagePost);

module.exports = router;
