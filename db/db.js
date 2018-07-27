const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/';
const doorsCollectionName = 'doors';
const cardsCollectionName = 'cards';


const DB{ 

	function connection  (callback) {
		return MongoClient.connect(dbUrl, function(err, db){
				if (err) throw err;
				let dbo = db.db("artoo");
				callback(dbo);
			});
	}
	insertObject(cardsCollectionName, {cardId : "1234"});
	insertObject(doorsCollectionName, {doorId : "1234"});



	function insertObject(collection, obj, ciao){
		connection(function(db){
			db.collection(collection).insertOne(obj, function (err, res) {
				if (err) throw err;
				console.log('Document '+JSON.stringify(obj) + ' inserted');
				console.log(JSON.stringify(res));
				ciao(err,res);
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

	function deleteObject(id,callback){}

	function updateObject(id,callback){}

	function getObject(collection,id,callback){
		let query = {_id: id};
		connection(function (db){
			db.collection(collection).find(query).toArray(function(err, result) {
				console.log(result);
				callback(err,res);
		  });
		});
	}

}

module.exports=DB;
