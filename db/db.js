var mongo = require('mongodb');
	
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/artoo';


function createDb(url){
	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		console.log("Database created!");
  		db.close();
	});
}

createDb(url);

/*

function insertObject(id){
	var myobj = { name: "Company Inc", address: "Highway 37" };

}

function deleteObject(id){


}

function updateObject(id){


}

function getObject(collection,id, callback){
	var query = {_id: id};
	dbo.collection(collection).find(query).toArray(function(err, result) {
    db.close();
    callback(err, result);
  });


}

*/
