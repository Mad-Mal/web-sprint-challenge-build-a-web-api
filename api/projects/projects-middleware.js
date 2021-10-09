const Projects = require('./projects-model.js');

function logger(req, res, next) {
    console.log(`${req.method}, ${req.path}, ${Date.now()}`);
    next();
};

function validateProjectId(req, res, next) {
    try{
      const {id} = req.params;
      const project = Projects.getById(id);
      if(!project){
         res.status(404).json({
           message: `Project ${project} not found`
          });
      } else {
        req.project = project;
        next();
      } 
    } catch(err){
      res.status(500).json({
        message: error.message
      });
    };
  };

module.exports = {
    logger,
    validateProjectId,
}
