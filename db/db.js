const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/';
const doorsCollection = createCollection('doors');
const cardsCollection = createCollection('cards');

const connection = (callback) => {
	return MongoClient.connect(url, (err, db) =>{
			if (err) throw err;
			let dbo = db.db("artoo");
			callback(dbo);
		});
}

createDb(dbUrl + 'artoo');
insertObject(cardsCollection, {cardId : "1234"});
insertObject(doorsCollection, {doorId : "1234"});



function insertObject(collection,obj){
	connection((db)=>{
		db.collection(collection).insertOne(obj, (err, res) => {
			if (err) throw err;
			console.log('Document '+JSON.stringify(obj) + ' inserted');
			console.log(JSON.stringify(res));
		});
	});
}

function createCollection(name){
	connection((db)=>{
		db.createCollection(name, (err, res) =>{
			if (err) throw err;
			console.log("Collection created!");
		});
	});
}

function deleteObject(id){}

function updateObject(id){}

function getObject(collection,id){
	let query = {_id: id};
	connection((db)=>{
		db.collection(collection).find(query).toArray(function(err, result) {
			console.log(result);
	  });
	});
}
