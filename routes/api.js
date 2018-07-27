const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/';
const doorsCollectionName = 'doors';
const cardsCollectionName = 'cards';

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

router.post('/addCard', function (req, res)){
	if(req.body.name){
		insertObject(cardsCollectionName, req.body, function(err){
			if(err)res.status(500).send({status: 'ERROR'});
			res.status(200).send({status: 'OK'});
		}
	}

}

function getCardById(id){
	return {
		id:'',
		doors:[
			'door_viacrispi',
			'door_interna'
		]
	};
}

function insertObject(collection, obj, ciao){
    connection(function(db){
        collection(collection).insertOne(obj, function (err, res) {
            if (err) throw err;
            console.log('Document '+JSON.stringify(obj) + ' inserted');
            console.log(JSON.stringify(res));
            ciao(err,res);
        });
    });
}

function connection  (callback) {
    return MongoClient.connect(dbUrl, function(err, db){
        if (err) throw err;
        var dbo = db.db("artoo");
        callback(dbo);
    });
}

function getObject(collection,id,callback){
    var query = {_id: id};
    connection(function (db){
        collection(collection).find(query).toArray(function(err, result) {
            console.log(result);
            callback(err,res);
        });
    });
}

function createCollection(name,callback){
    connection(function(db){
        createCollection(name, function (err, res){
            if (err) throw err;
            console.log("Collection created!");
            callback(err,res);
        });
    });
}

module.exports = router;