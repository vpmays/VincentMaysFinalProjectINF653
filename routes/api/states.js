const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const statesfunfactsController = require('../../controllers/statesfunfactsController');

router.route('/')
    .get(statesController.getAllStates);

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
    .get(statesfunfactsController.getFunFact)
    .post(statesfunfactsController.createNewFunFact)
    .patch(statesfunfactsController.patchFunFact)
    .delete(statesfunfactsController.deleteFunFact);

module.exports = router;