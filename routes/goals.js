var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// 6k1@HlF#

const goalsInit = mongoose.model('goals', {nombre:String, descripcion:String, fecha:String}, 'goals');

/* GET users listing. */
router.get('/getGoals', function(req, res, next) {
    goalsInit.find({})
    .then((response) => 
        res.status(200).json(response))
    .catch((err)=>{
        res.status(500).json(err)})
});

router.post('/addGoals', function(req, res, next) {
    if(req.body && req.body.nombre && req.body.descripcion && req.body.fecha){
        const goal = new goalsInit(req.body);
        goal.save().then( 
            () => res.status(200).json({}))
        .catch((err) => res.status(500).json(err))
        
    } else {
        res.status(400).json({"error":"No se estan enviando los parámetros completos"});
    }
        
});

router.delete('/removeGoals/:id', function(req, res, next){
    if(req.params && req.params.id){
        let id = req.params.id;
        goalsInit.deleteOne({_id: new mongoose.Types.ObjectId(id)})
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
