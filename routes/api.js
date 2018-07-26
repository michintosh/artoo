const express = require('express');
const router = express.Router();

router.get('/checkCard', (req, res) => {
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

router.post('/addDoor', (req, res) => {
	console.log("post");
	console.log(JSON.stringify(req.body));
		if(req.body.name){

			if(createDoor(req.body.name)){
				res.status(200).send({status: 'OK'});
			}
			else {
				res.status(500).send({status: 'ERROR'});
			}

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


function createDoor(name){

	return false;


}

module.exports = router;