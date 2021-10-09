const express = require('express');
const Actions = require('./actions-model.js');
const { logger } = require('./actions-middlware.js');

const router = express.Router();

router.get('/', logger, (req,res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
})

router.get('/:id', logger, (res,req) => {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
})

router.post('/', logger, (req,res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
})

router.put('/:id', logger, (req,res) => {
    const changes = req.body;
    Actions.update(req.params.id, changes)
        .then(action => {
            if(action){
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: error.message
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
})

router.delete('/:id', logger, (req,res) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: `This action has been deleted.`
            })
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
})

module.exports = router;