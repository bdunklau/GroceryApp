
// const MongoClient = require('mongodb').MongoClient({useUnifiedTopology: true});
const assert = require('assert');
// const url = 'mongodb://172.31.28.156:27017/groceryDb';
// const url = 'mongodb://172.31.28.156:27017';
// const client = new MongoClient(url, {useUnifiedTopology: true});


const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb+srv://admin:quickbrownfox@172.31.28.156:27017";
const url = "mongodb://admin:quickbrownfox@172.31.28.156:27017";
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });



class GroceryService{
    
    constructor(req, res){
        this.req = req
        this.res = res
    }

    insert(groceryItem, theDb, callback){
        var db = theDb.db('groceryDb');
        db.collection('grocery').insertOne({
                "item" : groceryItem
        }, function(){
            callback()      
        })
    }

    addGrocery(){
        let self = this;
        let groceryItem = this.req.body.groceryItem;
        try{
            // client.connect(url, function(err, db) {
            MongoClient.connect(url, function(err, theDb) {
            // client.connect(url, function(err, theDb) {
                var db = theDb.db('groceryDb');
                assert.equal(null, err);
                self.insert(groceryItem, db, function(){
                    db.close()
                    return self.res.status(200).json({
                        status: 'success'
                    })
                })
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getGrocery(){
        let self = this;
        let info = []
        info.push({MongoClient: MongoClient});
        try{
            // client.connect(url, function(err, db) {
            MongoClient.connect(url, function(err, theDb) {
            // client.connect(url, function(err, theDb) {
                info.push({MongoClient: MongoClient});
                if(err) throw err;
                //assert.equal(null, err);
                let groceryList = []

                var db = theDb.db('groceryDb');
                let cursor = db.collection('grocery').find();
                info.push("got cursor");
                if(!cursor) throw "no cursor";
                cursor.each(function(err, doc) {
                    info.push("cursor.each() callback func")
                    if(err) throw err;
                    //assert.equal(err, null);
                    if (doc != null) {
                        groceryList.push(doc)
                    } else {
                        return self.res.status(200).json({
                            status: 'success',
                            data: groceryList
                        })
                    }
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                info: info,
                error: error
            })
        }
    }

}
module.exports = GroceryService
