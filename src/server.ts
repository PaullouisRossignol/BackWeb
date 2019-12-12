//dependancies
import bodyparser = require('body-parser')
import session = require('express-session')
import path = require('path')
import express = require('express')
import {UserHandler} from './user'
import mongoAccess from './mongoAccess'
import { MetricsHandler } from './metrics'
import jwt from 'jwt-simple'
import moment from 'moment'

const app = express();
const port: string = process.env.PORT || '8080'
const mgAccess: mongoAccess = new mongoAccess("mongodb://localhost:27017/")
const UserHd:UserHandler = new UserHandler(mgAccess)
const MetricHd: MetricsHandler = new MetricsHandler(mgAccess)
//public path for img, js and css
app.use(express.static(path.join(__dirname, '/../public')))
//use bodyparser to parse requests
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
//views path for response rendering
app.set('views', __dirname + "/../views")
app.set('view engine', 'ejs')
//set the secret string for user authentification
app.set('jwtTokenSecret', 'Kremlevka');

//displayed pages
app.get('/', (req: any, res: any)  =>{
  res.render('index', { name: 'Toto' })
})
app.get('/user', (req: any, res: any)  =>{
  res.render('user', { name: 'Toto' })
})

//serverSide requests
app.post('/connectUser', (req: any, res: any)=>{
  const {email, password} = req.body
  if(email && password)
  {
    //check if the user is in the db and if his password correct
      UserHd.getUserByMail(email, (err, result) =>{
        if(err) 
          res.status(520).send("Erreur,\nError: " + err)
        if(!result)
          res.status(404).send("This email does not exist")
        else if(result.getPassword() !== password)
          res.status(409).send("Wrong Password")
        else if (result && result.getPassword() === password)
        {
          var expires = moment().add(1, 'h').valueOf();
          var token = jwt.encode({
            iss: result.id,
            exp: expires
          }, app.get('jwtTokenSecret'));
          res.json({
            token : token,
            expires: expires,
            user: result
          });
        }
      })
   
  }
  else
    res.status(400).send("Specify an email and a password")
})
app.get('/getUsers', (req: any, res: any)  =>{
    UserHd.getUsers((err: Error | null, result: any) => {
    if (err) throw err
    res.json(result)
    //to give the response
    res.end()
   })
 })
app.get('/getUserByMail/:email', (req: any, res: any)  =>{
  if(req.params.email)
  {
    UserHd.getUserByMail(req.params.email, (err: Error | null, result: any) => {
      if (err) throw err
      res.json(result)
      //to give the response
      res.end()
     })
  }
  else
    res.status(400).send("Specify an email")
  
})
app.get('/getUserById/:id', (req: any, res: any)  =>{
  if(req.params.id)
  {
    UserHd.getUserById(req.params.id, (err: Error | null, result: any) => {
    if (err) throw err
    res.json(result)
    //to give the response
    res.end()
    })
  }
  else
    res.status(400).send("Specify an id")
})
app.get('/getMetric/:id', (req: any, res: any)  =>{
  if(req.params.id)
  {
    MetricHd.getMetric(req.params.id, (err: Error | null, result: any) => {
    if (err) throw err
    res.json(result)
    //to give the response
    res.end()
    })
  }
  else
    res.status(400).send("Specify an id")
})
app.get('/getMetrics', (req: any, res: any)  =>{
  MetricHd.getMetrics((err: Error | null, result: any) => {
    if (err) throw err
    res.json(result)
    //to give the response
    res.end()
   })
 })
app.get('/getUserMetrics/:id', (req: any, res: any)  =>{
  if(req.params.id)
  {
    MetricHd.getUserMetrics(req.params.id, (err: Error | null, result: any) => {
      if (err) throw err
      res.json(result)
      //to give the response
      res.end()
     })
  }
 })
app.post('/addUser/', (req: any, res: any)=>{
  const {email, password} = req.body
  if(email && password)
    {
      //check in this mail is not already associated to another account
      let checkUser =  new Promise(function (success: any, reject: any){
        UserHd.getUserByMail(email, (err, result) =>{
          if(err) reject(err)
          if(result)
            res.status(409).send("This email is already taken")
          else
            success(true)
        })
      })
      checkUser.then(()=>{
        UserHd.addUser(email, password, (err, result) =>{
          if (err)
            res.status(520).send("Erreur,\nError: " + err)
          else
          {
            if(result)
            {
              var expires = moment().add(1, 'h').valueOf();
              var token = jwt.encode({
                iss: result.id,
                exp: expires
              }, app.get('jwtTokenSecret'));
              res.json({
                token : token,
                expires: expires,
                user: result
              });
            }
          }
        })
      }).catch(error => {console.log(error)})
  }
  else
    res.status(400).send("Specify an email and a password")
})
app.post('/addMetric/', (req: any, res: any)=>{
  const {user_id, debt_to, amount} = req.body
  if(user_id && debt_to && amount)
  {
    MetricHd.addMetric(user_id, debt_to, amount, (err) =>{
      if (err) 
        res.status(520).send("Erreur ,\n " + err)
      else
        res.status(200).end()
    })
  }
  else
    res.status(400).send("Specify a user_id, debt_to and an amount")
})
app.post('/delUser/', (req: any, res: any)=>{
  const id = req.body.id
  if(id){
        //check if the user exist
    let checkUser =  new Promise(function (success: any, reject: any){
      UserHd.getUserById(id, (err, result) =>{
        if(err) reject(err)
        if(result)
          success(true)
        else
          res.status(409).send("This User does not exist")
      })
    })//delete in db
    checkUser.then(()=>{
        UserHd.deleteUser(id, (err) =>{
          if (err)
            res.status(520).send("Error: " + err)
          else
            res.status(200).end()
        })
    }).catch(error => {console.log(error)})
  }
  else
    res.status(400).send("Specify an id")
})
app.post('/delMetric/', (req: any, res: any)=>{
  const id = req.body.id
  if(id)
  {
        //check if the Metric exist
    let checkMetric =  new Promise(function (success: any, reject: any){
      MetricHd.getMetric(id, (err, result) =>{
        if(err) reject(err)
        if(result)
          success(true)
        else
          res.status(409).send("This Metric does not exist")
      })
    })//Delete in db
    checkMetric.then(()=>{
        MetricHd.deleteMetric(id, (err) =>{
          if (err) 
            res.status(520).send("Error: " + err)
          else
            res.status(200).end()
        })
    }).catch(error => {console.log(error)})
  }
  else
    res.status(400).send("Specify an id")

})
app.post('/upUser/', (req: any, res: any)=>{
  const {id, email, password} = req.body
  if(id && email && password)
  {
    //check if the user exist
    let checkUser =  new Promise(function (success: any, reject: any){
    UserHd.getUserById(id, (err, result) =>{
      if(err) reject(err)
      if(result)
        success(true)
      else
        res.status(409).send("This user does not exist")
      })
    })//check if the email we wan't to change is not already used
    checkUser.then(():any =>{
        UserHd.getUserByMail(email, (err, result) =>{
          if(err)
            res.status(520).send("Error: " + err)
          if(result && result.id != id)
          {
            res.status(409).send("This mail already exists")
          }
          else
          {
            return checkUser
          }
        })//finally update the user
    }).then(() => {
        UserHd.updateUser(id, email, password, (err) =>{
          if (err) 
            res.status(520).send("Error: " + err)
          else
            res.status(200).end()
        })
    }).catch(error => {console.log(error)})
  }
  else
    res.status(400).send("Specify a id, email and an password")
})
app.post('/upMetric/', (req: any, res: any)=>{
  const {id, user_id, debt_to, amount} = req.body
  if(id && user_id && debt_to && amount)
  {
    //check if the user exist
    let checkUser =  new Promise(function (success: any, reject: any){
      MetricHd.getMetric(id, (err, result) =>{
        if(err) reject(err)
        if(result)
          success(true)
        else
          res.status(409).send("This Metric does not exist")
        })
    })//update in the db
    checkUser.then(() => {
      MetricHd.updateMetric(id, user_id, debt_to, amount, (err) =>{
        if (err)
          res.status(520).send("Error: " + err)
        else
          res.status(200).end()
      })
    }).catch(error => {console.log(error)})
  }
  else
    res.status(400).send("Specify an id, user_id, debt_to and an amount")
})
app.listen(port, (err: Error) => {
  if (err) throw err
  console.log(`Server is running on http://localhost:${port}`)
})

