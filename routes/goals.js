var express = require('express');
var router = express.Router();

let goals = [];

/* GET users listing. */
router.get('/getGoals', function(req, res, next) {
  res.json(goals);
});

router.post('/addGoals', function(req, res, next) {
    let timestamp = Date.now()+(Math.random());
    if(req.body && req.body.nombre && req.body.descripcion && req.body.fecha){
        req.body.id = timestamp.toString();
        goals.push(req.body);
        res.status(200).json(goals);
    } else {
        res.status(400).json({"error":"No se estan enviando los parámetros completos"});
    }
        
});

router.delete('/removeGoals/:id', function(req, res, next){
    if(req.params && req.params.id){
        let id = req.params.id;
        goals = goals.filter(goal => goal.id !== id)
        res.status(200).json(goals);
    } else {
        res.status(400).json({"error":"No se esta enviando el parámetro correcto"});
    }
})



module.exports = router;
