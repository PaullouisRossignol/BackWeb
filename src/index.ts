//dependancies
import bodyparser = require('body-parser')
import session = require('express-session')
import path = require('path')
import express = require('express')
import user, {UserHandler} from './user'
import mongoAccess from './mongoAccess'
import { MetricsHandler, Metric } from './metrics'
import { cpus } from 'os'
import { request } from 'http'

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


app.get('/', (req: any, res: any)  =>{
  res.render('index', { name: 'Toto' })
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
app.post('/addUser/', (req: any, res: any)=>{
  const {email, password} = req.body
  if(email && password)
    {
      let checkUser =  new Promise(function (success: any, reject: any){
        UserHd.getUserByMail(email, (err, result) =>{
          if(err) reject(err)
          if(result)
            success(false)
          else
            success(true)
        })
      })
      checkUser.then((success)=>{
        if(success)
        {
        UserHd.addUser(email, password, (err) =>{
          if (err)
            res.status(520).send("Erreur inconnu,\nError: " + err)
          else
            res.status(200).send("User Created")
          })
        }
        //conflict http code
        else
          res.status(409).send("This email is already taken")
      })
  }
  else
    res.status(400).send("Specify an email and a password")
})
app.post('/addMetric/', (req: any, res: any)=>{
  const {user_id, debt_to, amount} = req.body
  if(user_id && debt_to && amount)
  {
    MetricHd.addMetric(user_id, debt_to, amount, (err) =>{
      if (err) throw err
      res.status(200).end()
    })
  }
  else
    res.status(400).send("Specify a user_id, debt_to and an amount")
})
app.post('/delUser/', (req: any, res: any)=>{
  const id = req.body.id
  if(id){
    let checkUser =  new Promise(function (success: any, reject: any){
      UserHd.getUserById(id, (err, result) =>{
        if(err) reject(err)
        if(result)
          success(true)
        else
          success(false)
      })
    })
    checkUser.then((success)=>{
      if(success)
      {
        UserHd.deleteUser(id, (err) =>{
          if (err) throw err
          res.status(200).end()
        })
      }
      //conflict http code
      else
        res.status(409).send("This email does not exist")
  
    })
  }
  else
    res.status(400).send("Specify an id")
})
app.post('/delMetric/', (req: any, res: any)=>{
  const id = req.body.id
  if(id)
  {
    MetricHd.deleteMetric(id, (err) =>{
      if (err) throw err
      res.status(200).end()
    })
  }
  else
    res.status(400).send("Specify an id")

})
app.post('/upUser/', (req: any, res: any)=>{
  const {id, email, password} = req.body
  if(id && email && password)
  {
    UserHd.updateUser(id, email, password, (err) =>{
      if (err) throw err
      res.status(200).end()
    })
  }
  else
    res.status(400).send("Specify a id, email and an password")
})
app.post('/upMetric/', (req: any, res: any)=>{
  const {id, user_id, debt_to, amount} = req.body
  if(id && user_id && debt_to && amount)
  {
    MetricHd.updateMetric(id, user_id, debt_to, amount, (err) =>{
      if (err) throw err
      res.status(200).end()
    })
  }
  else
    res.status(400).send("Specify an id, user_id, debt_to and an amount")
})
app.listen(port, (err: Error) => {
  if (err) throw err
  console.log(`Server is running on http://localhost:${port}`)
})

