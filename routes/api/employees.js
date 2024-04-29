const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmoloyee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmplolyee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;