//set up data opbject
const Statesfunfact = require('../model/Statesfunfact');
const State = require('../model/State');


const createNewFunFact = async (req, res) => {
    if (!req?.body?.funfacts) return res.status(400).json({'message':'State fun facts value required'});
    if (!Array.isArray(req.body.funfacts)) return res.status(400).json({"message": "State fun facts value must be an array"});
    const state = await State.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }
    const funStates = await Statesfunfact.find();
    if (req.body?.funfacts) {
        for (item in funStates) {
            if (state.code === funStates[item].code) {
                for (funFact in req.body.funfacts) {
                    funStates[item].funfacts.push(req.body.funfacts[funFact]);
                }
                const result = await funStates[item].save();
                return res.json(result);
            }
        }
        try {
            const result = await Statesfunfact.create({
                code: state.code,
                funfacts: req.body.funfacts,
    
            });
    
            return res.status(201).json(result);
        } catch (err) {
            console.error(err);
        }
    }
}

const patchFunFact = async (req, res) => {
    if (!req?.body?.index) return res.status(400).json({'message':'State fun fact index value required'});
    if (!req?.body?.funfact || (typeof req?.body?.funfact !== "string") || (req?.body?.funfact === "")) return res.status(400).json({"message": "State fun fact value required"});
    const state = await State.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }
    const funState = await Statesfunfact.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!funState) {
        return res.status(404).json({ "message": `No Fun Facts found for ${state.state}`});
    }
    if (funState.funfacts.length < req.body.index) return res.status(400).json({'message':`No Fun Fact found at that index for ${state.state}`});
    funState.funfacts[req.body.index - 1] = req.body.funfact
    const result = await funState.save();
    res.json(result);
}

const deleteFunFact = async (req, res) => {
    if (!req?.body?.index) return res.status(400).json({'message':'State fun fact index value required'});
    const state = await State.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }
    const funState = await Statesfunfact.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!funState) {
        return res.status(404).json({ "message": `No Fun Facts found for ${state.state}`});
    }
    if (funState.funfacts.length < req.body.index) return res.status(400).json({'message':`No Fun Fact found at that index for ${state.state}`});
    funState.funfacts.splice([req.body.index - 1], 1);
    const result = await funState.save();
    res.json(result);
}

const getFunFact = async (req, res) => {
    const state = await State.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }
    const stateWithFunFacts = await Statesfunfact.findOne({code: req.params.code.toUpperCase()}).exec();
    if (!stateWithFunFacts) {
        return res.status(404).json({ "message": `No Fun Facts found for ${state.state}`});
    }
    res.json({"funfact": stateWithFunFacts.funfacts[Math.floor(Math.random() * stateWithFunFacts.funfacts.length)]});
}


module.exports = {
     getFunFact,
    createNewFunFact,
    patchFunFact,
    deleteFunFact
}