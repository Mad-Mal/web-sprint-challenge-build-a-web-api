const Projects = require('./projects-model.js');
const { logger, validateProjectId } = require('./projects-middleware.js');
const express = require('express');

const router = express.Router();

router.get('/', logger, (req,res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
});

router.get('/:id', logger, validateProjectId, (req,res) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if(project){
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    message: error.message
                });
            };
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
});

router.post('/', logger, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
});

router.put('/:id', logger, validateProjectId, (req, res) => {
    const changes = req.body;
    Projects.update(req.params.id, changes)
        .then(project => {
            if(project){
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    message: error.message
                });
            };
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
});

router.delete('/:id', logger, validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: `Project number ${id} has been deleted.`
            });
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
});

router.get('/:id/actions', logger, validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(projectActions => {
            res.status(200).json(projectActions);
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
});

module.exports = router