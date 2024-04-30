//set up data opbject
const State = require('../model/State');
const Statesfunfact = require('../model/Statesfunfact');

const getAllStates = async (req, res) => {
    let states = await State.find().lean();
    const funStates = await Statesfunfact.find();
    if (!states) return res.status(404).json({"message": "No states found."});
    for (state in states) {
        for (funState in funStates) {
            if (states[state].code === funStates[funState].code) {
                states[state]["funfacts"] = funStates[funState].funfacts;
            }
        } 
    }
    const nonContigStates = ["AK", "HI"]
    let newStates = [];
    if (req.query.contig == "true") {
        for (state in states) {
            if (!nonContigStates.includes(states[state].code)) {
                newStates.push(states[state]);
            }
        }
        return res.json(newStates);
    } else if (req.query.contig == "false") {
        for (state in states) {
            if (nonContigStates.includes(states[state].code)) {
                newStates.push(states[state]);
            } 
        }
        return res.json(newStates);
    } else {
        return res.json(states);
    }
}

const getState = async (req, res) => {
    const funStates = await Statesfunfact.find();
    let state = await State.findOne({code: req.params.code.toUpperCase()}).lean().exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }
    delete state._id;
    for (funState in funStates) {
        if (state.code === funStates[funState].code) {
            state["funfacts"] = funStates[funState].funfacts;
        }
    }

    res.json(state);
}

const getCapital = async (req, res) => {
    const state = await State.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }

    res.json({"state": state.state, "capital": state.capital_city});
}

const getNickname = async (req, res) => {
    const state = await State.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }

    res.json({"state": state.state, "nickname": state.nickname});
}

const getPopulation = async (req, res) => {
    const state = await State.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }

    res.json({"state": state.state, "population": state.population.toLocaleString("en-US")});
}

const getAdmission = async (req, res) => {
    const state = await State.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }

    res.json({"state": state.state, "admitted": state.admission_date});
}

const getFunfact = async (req, res) => {
    const state = await State.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }

    res.json({"state": state.state, "admitted": state.admission_date});
}


module.exports = {
    getAllStates,
    getState,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    getFunfact
}