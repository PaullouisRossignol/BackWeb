import {expect} from 'chai'
import {app, server} from "../src/server"
import chai = require("chai")
import chaiHttp = require("chai-http")
import request = require('request')
chai.use(chaiHttp)
var token: string
var user_id: string
var other_user_id: string



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
        expect(res).to.have.status(400)
        expect(res.text).to.equals("Access denied")
        done()
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
        expect(res).to.have.status(403)
        expect(res.text).to.equals("Error: Signature verification failed")
        done()
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
                id: "5df3c16fb474217307ab6c4f",
                email: "pl@123"
              }
            )
      .end((err, res) => {
        expect(res).to.have.status(403)
        expect(res.text).to.equals("Error: Access denied without a token")
        done()
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
        expect(res).to.have.status(400)
        expect(res.text).to.equals("Specify an email and a password")
        done()
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
        expect(res).to.have.status(400)
        expect(res.text).to.equals("Specify an email and a password")
        done()
      })
  })
})
describe('Insert a metric with missing informations', ()=>{  
  before((done)=>{
    request.post('http://localhost:8080/connectUser', {form:{email: "test@user",password: "123"}}, (err, res, body) => {
    if (err) { console.log(err + res); stopTests() }
      if(res){
        const result =  JSON.parse(res.body)
        token = result.token
        user_id = result.user.id
        done()
      }
      else return null 
    })
  })
  it('should return an error because no amount is passed',(done)=>{
    chai
      .request(app)
      .post("/addMetric")
      .send(
            {
              token: token ,
              debt_to: "toto",
              user_id: user_id
            }
          )
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.text).to.equals("Specify a reminder and an amount")
        done()
      })
  })

})
describe('login and try reading someone else s metrics', ()=>{
  before((done)=>{
    request.post('http://localhost:8080/connectUser', {form:{email: "pl@123",password: "123"}}, (err, res, body) => {
    if (err) { console.log(err + res); stopTests() }
      if(res){
        const result =  JSON.parse(res.body)
        other_user_id = result.user.id
        done()
      }
      else return null 
    })
  })
  it('should send an error saying: "Access denied, token does not correspond to this account"', (done)=>{
    chai
    .request(app)
    .post("/getUserMetrics")
    .send(
          {
            token: token,
            id: other_user_id
          }
        )
    .end((err, res) => {
      expect(res).to.have.status(403)
      expect(res.text).to.equals("Error: Access denied, token does not correspond to this account")
      done()
      stopTests()
    })
  })
})

function stopTests()
{
  server.close()
}

