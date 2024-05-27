var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')


const tasksInit = mongoose.model('tasks', {nombre:String, descripcion:String, fecha:String}, 'tasks');


/* GET users listing. */
router.get('/getTasks', function(req, res, next) {
    tasksInit.find({})
    .then((response) => 
        res.status(200).json(response))
    .catch((err)=>{
        res.status(500).json(err)})
});

router.post('/addTasks', function(req, res, next) {
    if(req.body && req.body.nombre && req.body.descripcion && req.body.fecha){
        const task = new tasksInit(req.body);
        task.save().then( 
            () => res.status(200).json({}))
        .catch((err) => res.status(500).json(err))
        
    } else {
        res.status(400).json({"error":"No se estan enviando los parámetros completos"});
    }
        
});

router.delete('/removeTasks/:id', function(req, res, next){
    if(req.params && req.params.id){
        let id = req.params.id;
        tasksInit.deleteOne({_id: new mongoose.Types.ObjectId(id)})
        .then((response)=> {
            res.status(200).json(200);
    }).catch((err) => {
            res.status(500).json(err);
    })
    } else {
        res.status(400).json({});
    }
})



module.exports = router;
