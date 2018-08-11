
var mongo = require('mongodb').MongoClient;
var mongo_url = "mongodb+srv://admin:Pokebipe1@ferrisbot-kdphf.mongodb.net/test?retryWrites=true";



//INSERT
// mongo.connect(mongo_url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("ferris");
//     var myobj = { id: "183667960160845824", address: "Highway 37" };
//     dbo.collection("profiles").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("1 user inserted");
//         db.close();
//     });
// });

// //UPDATE
// mongo.connect(mongo_url, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("ferris");
//   var myquery = { id: "183667960160845824" };
//   var newvalues = { $set: {steam_id: "1818915198"} };
//   dbo.collection("profiles").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("1 user updated");
//     db.close();
//   });
// });

// //SELECT
// mongo.connect(mongo_url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("ferris");
//     dbo.collection("profiles").findOne({}, function(err, result) {
//       if (err) throw err;
//       console.log(result.name);
//       db.close();
//     });
//   });


  var Db  = function() {
    this.callbacks = {};
  }

  Db.prototype.insert = function(query) {
    mongo.connect(mongo_url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ferris");
        dbo.collection("profiles").insertOne(query, function(err, res) {
            if (err) throw err;
            console.log("1 user inserted");
            db.close();
        });
    });
  }
  // var myquery = { _id: user };

  Db.prototype.update = function(user, query) {
    mongo.connect(mongo_url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("ferris");
      let obj = {id : user}
      var newvalues = { $set: query };
      dbo.collection("profiles").updateOne(obj, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 user updated");
        db.close();
    });
  })
}

  Db.prototype.select = function(query, callback) {
    mongo.connect(mongo_url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("ferris");
      dbo.collection("profiles").find(query).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      callback(err, result)
    })
  })
}

module.exports = Db;
