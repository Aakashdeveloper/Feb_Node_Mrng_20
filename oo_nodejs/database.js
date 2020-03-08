import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
const url="mongodb://localhost:27017"
const dbname = "testMarch";


//Dummy call
const maincall = (col) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db(dbname);
        dbo.collection(col).find({}).toArrayy((err,data) => {
            return data
        })
    })
}


//GET
var output
maincall.prototype.getData = (colName) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db(dbname);
        dbo.collection(colName).find({}).toArray((err,data) => {
           if(err) throw errr;
           output = data
        })
    })

    return output
}

//POST
maincall.prototype.postData = (colName,dbObj) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db(dbname);
        dbo.collection(colName).insertOne(dbObj, (err,data) => {
           if(err) throw errr;
          db.close()
        })
    })

    let out  = `Data inserted in ${colName}`
    return out
}


export default maincall;