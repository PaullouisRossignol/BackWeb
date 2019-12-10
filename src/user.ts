import mongoAccess from './mongoAccess'

export default class User {
  public email: string
  private password: string = ""

  constructor( email: string, password: string, passwordHashed: boolean = false) {
    this.email = email

    if (!passwordHashed) {
      this.setPassword(password)
    } else this.password = password
  }
  static fromDb(email: string, pwd: any): User {
    
    return new User(email, pwd)
  }

  public setPassword(toSet: string): void {
    // Hash and set password
    this.password = toSet
  }

  public getPassword(): string {
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
  public addUser(email: String, pwd: String, callback: (err: Error | null, result?: User[] | null) => void){

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
        //retrieve all data in users collection of Project db and return them
        const db = client.db("Project")
        const collection = db.collection("users")
        /*
        db.listCollections().toArray(function(err: Error, callback){
          console.log(callback);
        })
        */
        collection.find({}).toArray(function(err: Error, result: any){
          if(err){
            callback(err, null);
          }
          else if(result.length){
            let arrayUsers: User[] = []
            result.forEach(elem => {
               arrayUsers.push(User.fromDb(elem.email, elem.pwd))     
            })
            callback(null, arrayUsers)
          }
          else
            callback(null, null);

        });
        client.close();
      }
    })
  }
  
  public getUser(email: string, callback: (err: Error | null, result?: User | null) => void) {


    //connect to mongo
    const mg = this.mgAccess
    mg.getClient().connect(mg.getUrl(), {useUnifiedTopology: true}, function(err, client){
      if (err){
        console.log("Unable to connect to the server\nError log : "+err+"\n");
      }
      else
      {
        //find the user specified by its email in the db
        const db = client.db("Project")
        const collection = db.collection("users")
        const query = { email: email };
        collection.findOne(query, function(err: Error, result: any){
          if(err){
            callback(err, null);
          }
          else if(result){
            if(result.email === email)
            {
              callback(null, User.fromDb(result.email, result.pwd))
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
  public save(user: User, callback: (err: Error | null) => void) {
    this.db.put(`email:${user.email}`, `pwd:${user.getPassword}`, (err: Error | null) => {
      callback(err)
    })
  }
*/
  public delete(username: string, callback: (err: Error | null) => void) {
    // TODO
  }

}