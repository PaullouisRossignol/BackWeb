import mongoAccess from './mongoAccess'


export class Metric {
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

    public getMetrics(callback: (err: Error | null, result?: Metric[] | null) => void){
      //connect to mongo
      const mg = this.mgAccess
      mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, function(err, client){
        if (err){
          console.log("Unable to connect to the server\nError log : "+err+"\n");
        }
        else
        {
          //retrieve all data in Metrics collection of Project db and return them
          const db = client.db("Project")
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
          const db = client.db("Project")
          const collection = db.collection("metrics")
          const ObjectId = require('mongodb').ObjectId;
          const o_id = new ObjectId(id)
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

    /*
    public delete(key: number, callback: (error: Error | null, result: any) => void){
        //message to display
        let message : string 
        message = "Unable to find your metric"
        
        //deliting a metric from the table
        this.db.del( key , function(err){
          if(err)	{
            console.log('Unable to find your metric')
            callback(err, message)
          }else
            console.log("no error")
        })
        //changing the message if delition was successfull
        message = "metric with id "+ key+ " is deleted"
        console.log("metric with id "+ key+ " is deleted")
        //returning the message to display
        callback(null, message)
    }
    public save(
        key: number,
        metrics: Metric[], 
        callback: (error: Error | null) => void) {

      const stream = WriteStream(this.db)
        stream.on('error', callback)
        stream.on('close', callback)
        metrics.forEach((m: Metric) => {
      stream.write({ key: `${key}:${m.timestamp}`, value: m.value })
      })
      stream.end()
    }
    */
}