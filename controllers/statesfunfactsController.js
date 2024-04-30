//set up data opbject
//const Employee = require('../model/Employee');
const Statesfunfact = require('../model/Statesfunfact');
const State = require('../model/State');

// const getAllEmployees = async (req, res) => {
//     const employees = await Employee.find();
//     if (!employees) return res.status(204).json({'message':'No employees found.'});
//     res.json(employees);
// }
// const getAllStates = async (req, res) => {
//     const states = await State.find();
//     if (!states) return res.status(204).json({"message": "No states found."});
//     res.json(states);
// }

// const createNewEmoloyee = async (req, res) => {
//     //make sure first and last name are sent
//     if (!req?.body?.firstname || !req?.body?.lastname) return res.status(400).json({'message':'First and last names are required.'});
    
//     try {
//         const result = await Employee.create({
//             firstname: req.body.firstname,
//             lastname: req.body.lastname,

//         });

//         res.status(201).json(result);
//     } catch (err) {
//         console.error(err);
//     }
    
// }

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

// const updateEmployee = async (req, res) => {
    
//     if (!req?.body?.id) {
//         return res.status(400).json({'message': 'An id parameter is required.'})
//     }

//     const employee = await Employee.findOne({_id: req.body.id}).exec();
//     if (!employee) {
//         return res.status(204).json({ 'message': `No emplpyee matches ID: ${req.body.id}.`});
//     }

//     if (req.body?.firstname) employee.firstname = req.body.firstname;
//     if (req.body?.lastname) employee.lastname = req.body.lasttname;
//     const result = await employee.save();
//     res.json(result);
// }

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

// const deleteEmplolyee = async (req, res) => {
//     if (!req?.body?.id) {
//         return res.status(400).json({'message': 'An employee id is required.'})
//     }
    
//     const employee = await Employee.findOne({_id: req.body.id}).exec();
//     if (!employee) {
//         return res.status(204).json({ 'message': `No emplpyee matches ID: ${req.body.id}.`});
//     }

//     const result = await employee.deleteOne({_id: req.body.id});
//     res.json(result);
// }

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
    // if (funState.funfacts.length === 0) {
    //     await funState.deleteOne({_id: funState._id});
    //     res.json({ "message": `${state.state} had no more fun facts, so it was removed`});
    // } else {
    const result = await funState.save();
    res.json(result);
    // }
}

// const getEmployee = async (req, res) => {
//     if (!req?.params?.id) {
//         return res.status(400).json({'message': 'An employee id is required.'})
//     }
//     const employee = await Employee.findOne({_id: req.params.id}).exec();
//     if (!employee) {
//         return res.status(204).json({ 'message': `No emplpyee matches ID: ${req.body.id}.`});
//     }

//     res.json(employee);
// }

// const getState = async (req, res) => {
//     // if (!req?.body?.code) {
//     //     return res.status(400).json({'message': 'A state code is required.'})
//     // }
//     const state = await State.findOne({code: req.params.code.toUpperCase()}).exec();
//     if (!state) {
//         return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
//     }

//     res.json(state);
// }

const getFunFact = async (req, res) => {
    // if (!req?.body?.code) {
    //     return res.status(400).json({'message': 'A state code is required.'})
    // }
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
    //getAllEmployees,
    // createNewEmoloyee,
    // updateEmployee,
    // deleteEmplolyee,
    // getEmployee,
    // getAllStates,
    // getState,
    // getCapital,
    // getNickname,
    // getPopulation,
    // getAdmission,
    getFunFact,
    createNewFunFact,
    patchFunFact,
    deleteFunFact
}