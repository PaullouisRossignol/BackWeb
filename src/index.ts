//dependancies
import bodyparser = require('body-parser')
import session = require('express-session')
import path = require('path')
import express = require('express')
import user, {UserHandler} from './user'
import mongoAccess from './mongoAccess'
import { MetricsHandler, Metric } from './metrics'

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
 app.get('/getUser/:email', (req: any, res: any)  =>{
  UserHd.getUser(req.params.email, (err: Error | null, result: any) => {
  if (err) throw err
  res.json(result)
  //to give the response
  res.end()
 })
})
 app.get('/getMetric/:id', (req: any, res: any)  =>{
  MetricHd.getMetric(req.params.id, (err: Error | null, result: any) => {
  if (err) throw err
  res.json(result)
  //to give the response
  res.end()
 })
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
  const email = req.body.email
  const pwd = req.body.pwd
  UserHd.addUser(email, pwd, (err, result) =>{
    if (err) throw err
    if(!result && !err)
    {
      //conflict http code
      res.status(409).send("This email is already taken")
    }
    else if (!result)
      res.status(520).send("Erreur inconnu")
    
    res.end()
  })
 })
 app.post('/addMetric/', (req: any, res: any)=>{
  const user_id = req.body.user_id
  const debt_to = req.body.debt_to
  const amount = req.body.amount
  MetricHd.addMetric(user_id, debt_to, amount, (err) =>{
    if (err) throw err
    res.status(200).end()
  })
 })
 app.post('/delUser/', (req: any, res: any)=>{
  const id = req.body.id
  UserHd.deleteUser(id, (err) =>{
    if (err) throw err
    res.status(200).end()
  })
 })
 app.post('/delMetric/', (req: any, res: any)=>{
  const id = req.body.id
  MetricHd.deleteMetric(id, (err) =>{
    if (err) throw err
    res.status(200).end()
  })
 })
 app.post('/upUser/', (req: any, res: any)=>{
  const id = req.body.id
  const email = req.body.email
  const pwd = req.body.pwd
  UserHd.updateUser(id, email, pwd, (err) =>{
    if (err) throw err
    res.status(200).end()
  })
 })
 app.post('/upMetric/', (req: any, res: any)=>{
  const id = req.body.id
  const user_id = req.body.user_id
  const debt_to = req.body.debt_to
  const amount = req.body.amount
  MetricHd.updateMetric(id, user_id, debt_to, amount, (err) =>{
    if (err) throw err
    res.status(200).end()
  })
 })
app.listen(port, (err: Error) => {
  if (err) throw err
  console.log(`Server is running on http://localhost:${port}`)
})

