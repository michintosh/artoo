var mongo = require('mongodb');
	
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/artoo';


function createDb(){
	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		console.log("Database created!");
  		db.close();
	});
}

createDb(url);

function insertObject(collection,obj){
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  dbo.collection(collection).insertOne(obj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    console.log(JSON.stringify(res));
    db.close();
  });
}); 

}

function deleteObject(id){


}

function updateObject(id){


}

function getObject(collection,id){
	var query = {_id: id};
	dbo.collection(collection).find(query).toArray(function(err, result) {
    db.close();

  });


}

