import mongodb = require('mongodb');

export default class mongoAccess {
    private MongoClient: any = mongodb.MongoClient;
    private url: String

    constructor(url: string){
        this.url = url;
      }
    public getClient(){
        return this.MongoClient;
    }
    public getUrl(){
        return this.url;
    }
}