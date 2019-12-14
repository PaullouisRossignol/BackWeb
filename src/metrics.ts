import mongoAccess from './mongoAccess'


export default class Metric {
    private id: String
    private user_id: String
    private debt_to: String
    private amount: number
  
    constructor(id: String, user_id: String, debt_to: String, amount: number) {
      this.id = id
      this.user_id = user_id
      this.debt_to = debt_to
      this.amount = amount
    }
    static fromDb(id: String, user_id: String, debt_to: String, amount: number): Metric {
      return new Metric(id, user_id, debt_to, amount)
    }
    public getId(): String{
      return this.user_id
    }
    public getUserId(): String{
      return this.user_id
    }
    public getDebtTo(): String{
      return this.debt_to
    }
    public getAmount(): number{
      return this.amount
    }
  }
  
  export class MetricsHandler {
    private mgAccess: mongoAccess 
  
    constructor(mgAccess: mongoAccess){
      this.mgAccess = mgAccess;
    }

    public addMetric(user_id: String, debt_to: String, amount:number, callback: (err: Error | null ) => void){
      //connect to mongo
      const mg = this.mgAccess
      mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, (err, client) =>{
        if (err){
          console.log("Unable to connect to the server\nError log : "+err+"\n");
        }
        else
        {
          const db = client.db("project")
          const collection = db.collection("metrics")
          
            const newMetric = {user_id: user_id, debt_to: debt_to, amount: amount}
            collection.insertOne(newMetric, (err) => {
              if(err)
                callback(err);
              else
                callback(null)
            })
        }
        client.close()
      })
    }
    public getMetrics(callback: (err: Error | null, result?: Metric[] | null) => void){
      //connect to mongo
      const mg = this.mgAccess
      mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, function(err, client){
        if (err){
          console.log("Unable to connect to the server\nError log : "+err+"\n");
        }
        else
        {
          //retrieve all data in Metrics collection of project db and return them
          const db = client.db("project")
          const collection = db.collection("metrics")
          collection.find({}).toArray(function(err: Error, result: any){
            if(err){
              callback(err, null);
            }
            else if(result.length){
              let arrayMetrics: Metric[] = []
              result.forEach(elem => {
                 arrayMetrics.push(Metric.fromDb(elem._id, elem.user_id, elem.debt_to, elem.amount))     
              })
              callback(null, arrayMetrics)
            }
            else
              callback(null, null);
  
          });
          client.close();
        }
      })
    }
    public getUserMetrics(id: string, callback: (err: Error | null, result?: Metric[] | null) => void){
      //connect to mongo
      const mg = this.mgAccess
      mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, function(err, client){
        if (err){
          console.log("Unable to connect to the server\nError log : "+err+"\n");
        }
        else
        {
          //retrieve all data in Metrics collection that are user's metrics
          const db = client.db("project")
          const collection = db.collection("metrics")
          collection.find({}).toArray(function(err: Error, result: any){
            if(err){
              callback(err, null);
            }
            else if(result.length){
              let arrayMetrics: Metric[] = []
              result.forEach(elem => {
                if(elem.user_id == id)
                 arrayMetrics.push(Metric.fromDb(elem._id, elem.user_id, elem.debt_to, elem.amount))     
              })
              callback(null, arrayMetrics)
            }
            else
              callback(null, null);
  
          });
          client.close();
        }
      })
    }
    public getMetric(id: string, callback: (err: Error | null, result?: Metric | null) => void) {
      //connect to mongo
      const mg = this.mgAccess
      mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, function(err, client){
        if (err){
          console.log("Unable to connect to the server\nError log : "+err+"\n");
        }
        else
        {
          //find the Metric specified by its email in the db
          const db = client.db("project")
          const collection = db.collection("metrics")
          const ObjectId = require('mongodb').ObjectId;
          collection.findOne(ObjectId(id), function(err: Error, result: any){
            if(err){
              callback(err, null);
            }
            else if(result){
              if(result._id == id)
              {
                callback(null, Metric.fromDb(result._id, result.user_id, result.debt_to, result.amount))
              }
              else
                callback(null, null);
            }
            else
              callback(null, null);
  
          });
          client.close();
        }
      })
    }
    public updateMetric( id: String, user_id: String, debt_to: String, amount:number, callback: (err: Error | null) => void){
      //connect to mongo
      const mg = this.mgAccess
      mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, (err, client) =>{
        if (err){
          console.log("Unable to connect to the server\nError log : "+err+"\n");
        }
        else
        {
          const db = client.db("project")
          const collection = db.collection("metrics")
          const ObjectId = require('mongodb').ObjectId;
          const updateUser = {$set:{user_id: user_id, debt_to: debt_to, amount: amount}}
          collection.updateOne({_id : ObjectId(id)}, updateUser, (err) => {
              if(err){
                callback(err);
              }
              else
                callback(null);
            })
        }
        client.close()
      })
    }
    public deleteUserMetrics(id: String, callback: (err: Error | null) => void) {
      //connect to mongo
      const mg = this.mgAccess
      mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, function(err, client){
        if (err){
          console.log("Unable to connect to the server\nError log : "+err+"\n");
        }
        else
        {
          //find the user specified by its email in the db
          const db = client.db("project")
          const collection = db.collection("metrics")
          collection.deleteMany({user_id : id}, function(err) {
            if (err) 
             callback(err)
            else
             callback(null)
            client.close();
          });
        }
     })
    }
    public deleteMetric(id: String, callback: (err: Error | null) => void) {
      //connect to mongo
      const mg = this.mgAccess
      mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, function(err, client){
        if (err){
          console.log("Unable to connect to the server\nError log : "+err+"\n");
        }
        else
        {
          //find the user specified by its email in the db
          const db = client.db("project")
          const collection = db.collection("metrics")
          const ObjectId = require('mongodb').ObjectId;
          collection.deleteOne({_id : ObjectId(id)}, function(err) {
            if (err) 
             callback(err)
            else
             callback(null)
            client.close();
          });
        }
     })
    }


}