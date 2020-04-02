
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://172.31.28.156:27017";



class GroceryService{
    
    constructor(req, res){
        this.req = req
        this.res = res
    }

    insert(groceryItem, db, callback){
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
            MongoClient.connect(url, function(err, client) {
                var db = client.db("groceryDb");
                assert.equal(null, err);
                self.insert(groceryItem, db, function(){
                    client.close()
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
            MongoClient.connect(url, function(err, client) {
                info.push({MongoClient: MongoClient});
                if(err) throw err;
                assert.equal(null, err);
                let groceryList = []

                var db = client.db("groceryDb");
                let cursor = db.collection('grocery').find();
                info.push("got cursor");
                if(!cursor) throw "no cursor";
                cursor.each(function(err, doc) {
                    info.push("cursor.each() callback func")
                    if(err) throw err;
                    assert.equal(err, null);
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
