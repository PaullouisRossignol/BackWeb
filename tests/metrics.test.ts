import {expect} from 'chai'
import app = require("../src/server");
import chai = require("chai");
import chaiHttp = require("chai-http");

chai.use(chaiHttp);


describe('Insert Metrics unlogged', ()=>{
  it('should return an error because no token was passed',(done)=>{
    chai
      .request(app)
      .post("/addMetric")
      .send(
              {
                user_id: "5df3c16fb474217307ab6c4f",
                debt_to: "Poliakov",
                amount: "-20" 
              }
            )
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.text).to.equals("Access denied");
        done();
      })
  })
})
describe('Insert with an invalid token', ()=>{
  it('should return an error because token was invalid/expired',(done)=>{
    chai
      .request(app)
      .post("/addMetric")
      .send(
              {
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9."+
                "eyJpc3MiOiI1ZGYzYzE2zer0NzQyMTczMDdhYjZjNGYiLCJleHAiOjE1NzY0Mzg5NjgwMTZ9."+
                "QsbwUizJOEctsQUXTYxdxFBzX6h6ZU9lRi8VgLyBo20",
                user_id: "5df3c16fb474217307ab6c4f",
                debt_to: "Poliakov",
                amount: "-20" 
              }
            )
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.text).to.equals("Token authentification failed\nError: Signature verification failed");
        done();
      })
  })
})
describe('Reading metrics unlogged', ()=>{
  it('should return an error because no token was passed',(done)=>{
    chai
      .request(app)
      .post("/getUserMetrics")
      .send(
              {
                user: 
                  {
                    user: 
                      {
                        id: "5df3c16fb474217307ab6c4f",
                        password: "123",
                        email: "pl@123"
                      }
                    }
              }
            )
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.text).to.equals("Access denied");
        done();
      })
  })
})
describe('Insert a user with missing informations', ()=>{
  it('should return an error because no mail passed',(done)=>{
    chai
      .request(app)
      .post("/addUser")
      .send(
              {
                password: "123"
              }
            )
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equals("Specify an email and a password");
        done();
      })
  })
  it('should return an error because no password passed',(done)=>{
    chai
      .request(app)
      .post("/addUser")
      .send(
              {
                email: "pl@123"
              }
            )
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equals("Specify an email and a password");
        done();
      })
  })
})
describe('Insert a metric with missing informations', ()=>{  
  it('should return an error because no reminder passed',(done)=>{
    chai
      .request(app)
      .post("/addMetric")
      .send(
              {
                token: "ADMINTOKEN151220192020",
                amount: "123",
                user_id: "5df3c16fb474217307ab6c4f"
              }
            )
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equals("Specify a reminder and an amount");
        done();
      })
  })
  it('should return an error because no password passed',(done)=>{
    chai
      .request(app)
      .post("/addMetric")
      .send(
            {
              token: "ADMINTOKEN151220192020",
              debt_to: "toto",
              user_id: "5df3c16fb474217307ab6c4f"
            }
          )
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equals("Specify a reminder and an amount");
        done();
        stopTests()
      })
  })
})

function stopTests()
{
  process.exit(0)
}

