const express = require('express');
const router = express.Router();
//const employeesController = require('../../controllers/employeesController');
const statesController = require('../../controllers/statesController');

router.route('/')
    // .get(employeesController.getAllEmployees)
    // .post(employeesController.createNewEmoloyee)
    // .put(employeesController.updateEmployee)
    // .delete(employeesController.deleteEmplolyee);
    .get(statesController.getAllStates);

// router.route('/:id')
//     .get(employeesController.getEmployee);
router.route('/:code')
    .get(statesController.getState);

router.route('/:code/capital')
    .get(statesController.getCapital);

router.route('/:code/nickname')
    .get(statesController.getNickname);

router.route('/:code/population')
    .get(statesController.getPopulation);

router.route('/:code/admission')
    .get(statesController.getAdmission);

router.route('/:code/funfact')
    .get(statesController.getFunfact);

module.exports = router;