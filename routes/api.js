const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbName = 'artoo';
const dbUrl = 'mongodb://localhost:27017/';
const doorsCollectionName = 'doors';
const cardsCollectionName = 'cards';
const ObjectId = require('mongodb').ObjectID;
const md5 = require('md5');

router.get('/checkCard',function (req, res) {
	console.log(JSON.stringify(req.query));
	if (req.query.cardId && req.query.doorId){
		getObject(cardsCollectionName, req.query.cardId, function(err, result){
			if(err) {
				res.status(500).send({status: 'ERROR'});
                throw err;
			} else {
				console.log("result: " + JSON.stringify(result[0]));
				if(result){
					console.log("result2: " + JSON.stringify(result[0].doors));
					for(var i=0; i<result[0].doors.length;i++ ){
						
						console.log(result[0].doors[i] + ' '+ req.query.doorId);

						if(result[0].doors[i] === req.query.doorId){
							res.status(200).send({status: 'OK'});
							return;
						}
					}
				}
				res.status(200).send({status: 'NO'});
				console.log("Card checked");
			}
		});
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

router.post('/authDoor', function (req, res){
	if(req.body.cardId && req.body.doorId){
		connection(function(db){
			db.collection(cardsCollectionName).updateOne({_id:ObjectId(req.body.cardId)}, {$push:{doors:{id:req.body.doorId}}}, function(err, result){
				if(err) {
					res.status(500).send({status: 'ERROR'});
                    throw err;
				} else {
					res.status(200).send({status: 'OK'});
					console.log("Door authorized");
				}
			});
		});
	}
});
router.post('/addCard', function (req, res){
	if(req.body){
		req.body.password = md5(req.body.password);
		insertObject(cardsCollectionName, req.body, function(err){
			if(err)res.status(500).send({status: 'ERROR'});
			res.status(200).send({status: 'OK'});
		});
	}

});

function insertObject(collection, obj, callback){
    connection(function(db){
        db.collection(collection).insertOne(obj, function (err, res) {
            if (!err){
            	console.log('Document '+JSON.stringify(obj) + ' inserted');
            	console.log(JSON.stringify(res));
            }
            callback(err,res);
        });
    });
}

function connection  (callback) {
    return MongoClient.connect(dbUrl, function(err, db){
        if (err) throw err;
        callback(db.db(dbName));
    });
}

function getObject(collection,id,callback){
    var query = {_id: ObjectId(id)};

	console.log(id);
	console.log(JSON.stringify(query));

    connection(function (db){
        db.collection(collection).find(query).toArray(function(err, result) {
            console.log(result);
            callback(err,result);
        });
    });
}

function createCollection(name,callback){
    connection(function(db){
        db.createCollection(name, function (err, res){
            if (err) throw err;
            console.log("Collection created!");
            callback(err,res);
        });
    });
}

module.exports = router;