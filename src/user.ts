import mongoAccess from './mongoAccess'

export default class User {
  public id: String
  public email: String
  private password: String 

  constructor( id: String, email: String, password: String, passwordHashed: boolean = false) {
    this.email = email
    this.id = id

    if (!passwordHashed) {
      this.password = ""
      this.setPassword(password)
    } else this.password = password
  }
  static fromDb(id: String, email: String, password: any): User {
    
    return new User(id, email, password)
  }

  public setPassword(toSet: String): void {
    // Hash and set password
    this.password = toSet
  }

  public getPassword(): String {
    return this.password
  }

  public validatePassword(toValidate: String): boolean {
    // return comparison with hashed password
    if (this.getPassword() == toValidate) return true
    else return false
  }
}

export class UserHandler {
  private mgAccess: mongoAccess 
  
  constructor(mgAccess: mongoAccess){
    this.mgAccess = mgAccess;
  }
  public addUser(email: String, password: String, callback: (err: Error | null, result?: User ) => void){
    //connect to mongo
    const mg = this.mgAccess
    let checkUser =  new Promise(function (success: any, reject: any){
      mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, (err, client) =>{
        if (err){
          console.log("Unable to connect to the server\nError log : "+err+"\n");
        }
        else
        {
          const db = client.db("project")
          const collection = db.collection("users")
            const newUser = {email: email, password: password}
            collection.insertOne(newUser, (err) => {
              if(err){
                callback(err)
              }
              else
                success(true)
            })
        }
        client.close()
      })
    })
    checkUser.then(()=>{
      this.getUserByMail(email, (err, result)=>{
        if(err) throw err
        if(result)
          callback(null, result)
        else
          callback(new Error("Problem returning the new user"))
      })
    }).catch(error => {console.log(error)})
    
  }
  public getUsers(callback: (err: Error | null, result?: User[] | null) => void){
    //connect to mongo
    const mg = this.mgAccess
    mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, function(err, client){
      if (err){
        console.log("Unable to connect to the server\nError log : "+err+"\n");
      }
      else
      {
        //retrieve all data in users collection of project db and return them
        const db = client.db("project")
        const collection = db.collection("users")
        collection.find({}).toArray(function(err: Error, result: any){
          if(err){
            callback(err, null);
          }
          else if(result.length){
            let arrayUsers: User[] = []
            result.forEach(elem => {
               arrayUsers.push(User.fromDb(elem._id, elem.email, elem.password))     
            })
            callback(null, arrayUsers)
          }
          else
            callback(null, null);

        })
        client.close();
      }
    })
  }
  public getUserByMail(email: String, callback: (err: Error | null, result?: User | null) => void) {
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
        const collection = db.collection("users")
        const query = { email: email };
        collection.findOne(query, function(err: Error, result: any){
          if(err){
            callback(err, null);
          }
          else if(result){
            if(result.email === email)
            {
              callback(null, User.fromDb(result._id, result.email, result.password))
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
  public getUserById(id: String, callback: (err: Error | null, result?: User | null) => void) {
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
        const collection = db.collection("users")
        const ObjectId = require('mongodb').ObjectId;
        collection.findOne({_id: ObjectId(id)}, function(err: Error, result: any){
          if(err){
            callback(err, null);
          }
          else if(result){
            if(result._id == id)
            {
              callback(null, User.fromDb(result._id, result.email, result.password))
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
  public updateUser( user_id: String, email: String, password: String, callback: (err: Error | null) => void){
    //connect to mongo
    const mg = this.mgAccess
    mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, (err, client) =>{
      if (err){
        console.log("Unable to connect to the server\nError log : "+err+"\n");
      }
      else
      {
        const db = client.db("project")
        const collection = db.collection("users")
        const ObjectId = require('mongodb').ObjectId;
        const id = new ObjectId(user_id)
        const updateUser = {$set:{email: email, password: password}}
        collection.updateOne({_id : id}, updateUser, (err) => {
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
  public deleteUser(user_id: String, callback: (err: Error | null) => void) {
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
         const collection = db.collection("users")
         const ObjectId = require('mongodb').ObjectId;
         collection.deleteOne({_id : ObjectId(user_id)}, function(err) {
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