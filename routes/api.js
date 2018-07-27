const express = require('express');
const router = express.Router();

router.get('/checkCard',function (req, res) {
	console.log(JSON.stringify(req.query));
	if (req.query.cardId && req.query.doorId){
		console.log("Success");
		var card = getCardById(req.query.cardId);
		if(card){
			for(var i=0; i<card.doors.length;i++ ){
				if(card.doors[i] === req.query.doorId){
					res.send('OK');
					return;
				}
			}
			res.send('NO');
		}
	}
});

router.post('/addDoor', function (req, res){
	if(req.body.name){
		insertObject(doorsCollectionName, {name:req.body.name}, function(err){
			if(err)res.status(500).send({status: 'ERROR'});
			res.status(200).send({status: 'OK'});
		});
	}
});

function getCardById(id){
	return {
		id:'',
		doors:[
			'door_viacrispi',
			'door_interna'
		]
	};
}

module.exports = router;
