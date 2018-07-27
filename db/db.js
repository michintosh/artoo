var mongo = require('mongodb');
	
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';


function createDb(name){
	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		console.log("Database created!");
  		db.close();
	});
}

createDb(url + 'artoo');
createCollection('doors');
createCollection('cards');
//insertObject('users',{name:'hello'});

function insertObject(collection,obj){
	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db("artoo");
	  	dbo.collection(collection).insertOne(obj, function(err, res) {
		    if (err) throw err;
		    console.log("1 document inserted");
		    console.log(JSON.stringify(res));
			dbo.collection("users").find({}).toArray(function(err, result) {
				if (err) throw err;
			    console.log(result);
			    db.close();	
  			});
		    
	  	});
	}); 

}

function createCollection(name){
	MongoClient.connect(url, function(err, db) {
	  	if (err) throw err;
	  	var dbo = db.db('artoo');
	  	dbo.createCollection(name, function(err, res) {
		    if (err) throw err;
		    console.log("Collection created!");
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


