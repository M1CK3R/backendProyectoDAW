var express = require('express');
var router = express.Router();

let tasks = [];

/* GET users listing. */
router.get('/getTasks', function(req, res, next) {
  res.json(tasks);
});

router.post('/addTasks', function(req, res, next) {
    let timestamp = Date.now()+(Math.random());
    if(req.body && req.body.nombre && req.body.descripcion && req.body.fecha){
        req.body.id = timestamp.toString();
        tasks.push(req.body);
        res.status(200).json(tasks);
    } else {
        res.status(400).json({"error":"No se estan enviando los parámetros completos"});
    }
});

router.delete('/removeTasks/:id', function(req, res, next){
    if(req.params && req.params.id){
        let id = req.params.id;
        tasks = tasks.filter(task => task.id !== id)
        res.status(200).json(tasks);
    } else {
        res.status(400).json({"error":"No se esta enviando el parámetro correcto"});
    }
})



module.exports = router;
